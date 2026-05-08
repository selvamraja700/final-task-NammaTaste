import React from 'react';
import { motion } from 'framer-motion';

export const Label = ({ htmlFor, children, required }) => (
  <label 
    htmlFor={htmlFor} 
    className="block text-sm font-bold text-slate-700 mb-2 tracking-tight"
  >
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export const Input = ({ id, type = 'text', placeholder, value, onChange, error, ...props }) => (
  <div className="w-full">
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full px-5 py-4 rounded-2xl bg-slate-50 border transition-all duration-300
        text-slate-900 placeholder:text-slate-400 text-base
        focus:outline-none focus:bg-white focus:ring-4
        ${error 
          ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
          : 'border-slate-200 focus:ring-amber-400/10 focus:border-amber-400'}
      `}
      {...props}
    />
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-red-500 text-xs font-bold mt-2 ml-1"
      >
        {error}
      </motion.p>
    )}
  </div>
);

export const TextArea = ({ id, placeholder, value, onChange, error, rows = 4, ...props }) => (
  <div className="w-full">
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`
        w-full px-5 py-4 rounded-2xl bg-slate-50 border transition-all duration-300
        text-slate-900 placeholder:text-slate-400 text-base resize-none
        focus:outline-none focus:bg-white focus:ring-4
        ${error 
          ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
          : 'border-slate-200 focus:ring-amber-400/10 focus:border-amber-400'}
      `}
      {...props}
    />
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-red-500 text-xs font-bold mt-2 ml-1"
      >
        {error}
      </motion.p>
    )}
  </div>
);

export const Select = ({ id, value, onChange, error, children, ...props }) => (
  <div className="w-full relative">
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`
        w-full px-5 py-4 rounded-2xl bg-slate-50 border transition-all duration-300
        text-slate-900 text-base appearance-none cursor-pointer
        focus:outline-none focus:bg-white focus:ring-4
        ${error 
          ? 'border-red-300 focus:ring-red-500/10 focus:border-red-500' 
          : 'border-slate-200 focus:ring-amber-400/10 focus:border-amber-400'}
      `}
      {...props}
    >
      {children}
    </select>
    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    {error && (
      <motion.p 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-red-500 text-xs font-bold mt-2 ml-1"
      >
        {error}
      </motion.p>
    )}
  </div>
);
