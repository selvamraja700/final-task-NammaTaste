// src/components/admin/ProtectedRoute.jsx
// Wraps any admin route — redirects to /admin/login if not authenticated or not admin.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase">Authenticating…</p>
        </div>
      </div>
    );
  }

  // Must be logged in AND have the correct admin UID
  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
