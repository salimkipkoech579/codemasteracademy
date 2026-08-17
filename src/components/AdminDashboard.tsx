import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  DollarSign, 
  Tag, 
  Activity, 
  Lock, 
  CheckCircle2, 
  Search,
  Plus
} from 'lucide-react';
import { MOCK_COUPONS } from '../data/coursesData';
import { MOCK_AUDIT_LOGS } from '../data/mockUserData';
import { Coupon, AuditLog } from '../types';

interface AdminDashboardProps {
  darkMode: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ darkMode }) => {
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('20');
  const [logs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    const created: Coupon = {
      id: `c-${Date.now()}`,
      code: newCode.toUpperCase(),
      discountPercent: Number(newDiscount),
      validUntil: '2026-12-31',
      usedCount: 0,
      maxUses: 100,
      isActive: true,
    };

    setCoupons((prev) => [created, ...prev]);
    setNewCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-red-500">Super Admin Command Center</span>
        <h1 className="text-3xl font-extrabold tracking-tight">Platform Governance & Security Audit</h1>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between text-slate-400 text-xs font-semibold">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">$248,920</div>
          <div className="text-[10px] text-slate-400 mt-1">+18.4% from last month</div>
        </div>

        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between text-slate-400 text-xs font-semibold">
            <span>Active Students</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400 mt-2">120,450</div>
          <div className="text-[10px] text-slate-400 mt-1">across 142 countries</div>
        </div>

        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between text-slate-400 text-xs font-semibold">
            <span>Coupons Claimed</span>
            <Tag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 mt-2">230</div>
          <div className="text-[10px] text-slate-400 mt-1">CODEMASTER50 active</div>
        </div>

        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between text-slate-400 text-xs font-semibold">
            <span>Security Health</span>
            <Lock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400 mt-2">99.98%</div>
          <div className="text-[10px] text-slate-400 mt-1">2FA & OAuth active</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Coupon Manager */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-base font-bold flex items-center space-x-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Coupon & Discount Manager</span>
            </h2>

            <form onSubmit={handleAddCoupon} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="CODE (e.g. SUMMER30)"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="flex-1 p-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
                <input
                  type="number"
                  min={5}
                  max={90}
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="w-16 p-2 text-xs text-center rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </form>

            <div className="space-y-2 pt-2">
              {coupons.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <div>
                    <span className="font-mono font-bold text-amber-400">{c.code}</span>
                    <span className="text-[10px] text-slate-400 ml-2">({c.discountPercent}% OFF)</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{c.usedCount}/{c.maxUses} used</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Audit Logs */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`p-6 rounded-3xl border space-y-4 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-base font-bold flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              <span>Real-Time Security Audit Logs</span>
            </h2>

            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-200">{log.action}</div>
                    <div className="text-[10px] text-slate-400">{log.userEmail} • IP: {log.ipAddress}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
