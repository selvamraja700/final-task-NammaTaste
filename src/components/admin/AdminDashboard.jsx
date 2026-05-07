// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  collection, query, orderBy, limit, getDocs,
  where, Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuth } from '../../contexts/AuthContext';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(ts) {
  if (!ts?.toDate) return '—';
  return ts.toDate().toLocaleString('en-IN', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  });
}
function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  });
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-amber-500/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">{label}</span>
        <span className={`text-2xl ${color}`}>{icon}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value ?? '—'}</p>
      {sub && <p className="text-white/30 text-xs">{sub}</p>}
    </motion.div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white shadow-xl">
      <p className="font-bold mb-1 text-amber-400">{label}</p>
      {payload.map(p => (
        <p key={p.name}>{p.name}: <span className="font-semibold">{p.value}</span></p>
      ))}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const [metrics, setMetrics]         = useState(null);
  const [recentEvents, setRecent]     = useState([]);
  const [chartData, setChartData]     = useState([]);
  const [eventBreakdown, setBreakdown]= useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  // ── Fetch all metrics from Firestore ────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const col = collection(db, 'metrics');
      const thirtyDaysAgo = Timestamp.fromDate(new Date(Date.now() - 30 * 86400000));
      const thirtyMinAgo  = Timestamp.fromDate(new Date(Date.now() - 30 * 60000));

      // ── All events in last 30 days
      const q30 = query(col, where('timestamp', '>=', thirtyDaysAgo), orderBy('timestamp', 'desc'));
      const snap30 = await getDocs(q30);
      const all30 = snap30.docs.map(d => ({ id: d.id, ...d.data() }));

      // ── Active sessions (last 30 min, session_start events)
      const qSession = query(col,
        where('event', '==', 'session_start'),
        where('timestamp', '>=', thirtyMinAgo)
      );
      const snapSession = await getDocs(qSession);

      // ── Recent 50 events for table
      const qRecent = query(col, orderBy('timestamp', 'desc'), limit(50));
      const snapRecent = await getDocs(qRecent);
      setRecent(snapRecent.docs.map(d => ({ id: d.id, ...d.data() })));

      // ── Aggregate stats
      const pageViews   = all30.filter(e => e.event === 'page_view').length;
      const sessions    = all30.filter(e => e.event === 'session_start').length;
      const inquiries   = all30.filter(e => e.event === 'inquiry_submitted').length;
      const contacts    = all30.filter(e => e.event === 'contact_submitted').length;
      const activeSess  = snapSession.size;

      setMetrics({ pageViews, sessions, inquiries, contacts, activeSess, total: all30.length });

      // ── Line chart: page_view counts per day (last 7 days)
      const days = getLast7Days();
      const dayCounts = days.map(day => {
        const count = all30.filter(e => {
          if (!e.timestamp?.toDate) return false;
          const d = e.timestamp.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
          return d === day && e.event === 'page_view';
        }).length;
        return { day, 'Page Views': count };
      });
      setChartData(dayCounts);

      // ── Bar chart: event type breakdown
      const eventMap = {};
      all30.forEach(e => { eventMap[e.event] = (eventMap[e.event] || 0) + 1; });
      const breakdown = Object.entries(eventMap)
        .map(([name, count]) => ({ name: name.replace(/_/g, ' '), count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
      setBreakdown(breakdown);

      setLastRefresh(new Date());
    } catch (err) {
      console.error(err);
      setError('Failed to load metrics. Check Firestore rules and connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { fetchData(); }, [fetchData]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(fetchData, 60000);
    return () => clearInterval(id);
  }, [autoRefresh, fetchData]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  // ── Referrer aggregation for traffic sources
  const trafficSources = React.useMemo(() => {
    const map = {};
    recentEvents.forEach(e => {
      const src = e.referrer === 'direct' || !e.referrer ? 'Direct' : (() => {
        try { return new URL(e.referrer).hostname; } catch { return e.referrer; }
      })();
      map[src] = (map[src] || 0) + 1;
    });
    return Object.entries(map)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [recentEvents]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              <span className="text-amber-400">Namma Taste</span>{' '}
              <span className="text-white/70 font-normal">· Admin Dashboard</span>
            </h1>
            <p className="text-white/30 text-sm mt-1">
              Signed in as <span className="text-white/50">{currentUser?.email}</span>
              {lastRefresh && (
                <> · Last updated {lastRefresh.toLocaleTimeString('en-IN')}</>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Auto-refresh toggle */}
            <button
              id="auto-refresh-toggle"
              onClick={() => setAutoRefresh(p => !p)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all
                ${autoRefresh
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-amber-400 animate-pulse' : 'bg-white/20'}`} />
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </button>

            {/* Manual refresh */}
            <button
              id="manual-refresh-btn"
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/10
                         hover:border-amber-500/30 hover:text-amber-300 disabled:opacity-40 transition-all"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>

            {/* Logout */}
            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/10 border border-red-500/20
                         text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* ── Error Banner ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-4 text-red-400 text-sm flex items-center gap-3"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stat Cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard label="Page Views" value={metrics?.pageViews} icon="👁" color="text-blue-400"   sub="Last 30 days" />
          <StatCard label="Sessions"   value={metrics?.sessions}  icon="📊" color="text-purple-400" sub="Last 30 days" />
          <StatCard label="Active Now" value={metrics?.activeSess} icon="🟢" color="text-green-400" sub="Last 30 minutes" />
          <StatCard label="Inquiries"  value={metrics?.inquiries}  icon="📅" color="text-amber-400"  sub="Booking forms" />
          <StatCard label="Messages"   value={metrics?.contacts}   icon="✉️" color="text-orange-400" sub="Contact forms" />
        </div>

        {/* ── Charts Row ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Line chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">
              Page Views — Last 7 Days
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="Page Views" stroke="#f59e0b" strokeWidth={2.5}
                  dot={{ fill: '#f59e0b', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#fbbf24' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">
              Events by Type
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={eventBreakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Bottom Row: Traffic Sources + Recent Events ─────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Traffic Sources */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">
              Traffic Sources
            </h2>
            {loading
              ? <div className="space-y-3">{[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 bg-white/5 rounded-lg animate-pulse" />
                ))}</div>
              : trafficSources.length === 0
                ? <p className="text-white/20 text-sm">No data yet.</p>
                : <div className="space-y-3">
                    {trafficSources.map(({ source, count }) => {
                      const total = trafficSources.reduce((s, x) => s + x.count, 0);
                      const pct = total ? Math.round((count / total) * 100) : 0;
                      return (
                        <div key={source}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/60 truncate max-w-[140px]">{source}</span>
                            <span className="text-amber-400 font-semibold">{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
            }
          </div>

          {/* Recent Events Table */}
          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">
              Recent Events
            </h2>
            <div className="overflow-x-auto">
              {loading
                ? <div className="space-y-2">{[...Array(6)].map((_, i) => (
                    <div key={i} className="h-9 bg-white/5 rounded-lg animate-pulse" />
                  ))}</div>
                : recentEvents.length === 0
                  ? <p className="text-white/20 text-sm">No events recorded yet. Visit the main site to generate data.</p>
                  : <table className="w-full text-xs">
                      <thead>
                        <tr className="text-white/30 uppercase tracking-widest border-b border-white/5">
                          <th className="text-left py-2 pr-4 font-semibold">Event</th>
                          <th className="text-left py-2 pr-4 font-semibold">Page</th>
                          <th className="text-left py-2 pr-4 font-semibold hidden sm:table-cell">Source</th>
                          <th className="text-left py-2 font-semibold">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentEvents.slice(0, 12).map(evt => (
                          <tr key={evt.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-2.5 pr-4">
                              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 font-medium">
                                {evt.event}
                              </span>
                            </td>
                            <td className="py-2.5 pr-4 text-white/50 max-w-[100px] truncate">{evt.page || evt.url || '/'}</td>
                            <td className="py-2.5 pr-4 text-white/40 hidden sm:table-cell max-w-[120px] truncate">
                              {evt.referrer === 'direct' || !evt.referrer ? 'Direct' : (() => {
                                try { return new URL(evt.referrer).hostname; } catch { return evt.referrer; }
                              })()}
                            </td>
                            <td className="py-2.5 text-white/40 whitespace-nowrap">{formatTime(evt.timestamp)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
              }
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <p className="text-center text-white/15 text-xs mt-10">
          Namma Taste Admin · Data from Firestore · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
