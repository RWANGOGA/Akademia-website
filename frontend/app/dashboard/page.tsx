"use client";

import React, { useState } from "react";
import EditableText from "@/components/EditableText";
import { Shield, UserCheck } from "lucide-react";

export default function DashboardPage() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      {/* Top Admin Controls Bar */}
      <div className="max-w-4xl mx-auto mb-8 bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${isAdmin ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-800 text-gray-400"}`}>
            {isAdmin ? <Shield className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-sm font-bold">Admin CMS Toolbar</h2>
            <p className="text-xs text-gray-400">
              {isAdmin ? "Admin mode active: Hover over text to edit." : "Standard user view mode."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            isAdmin 
              ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" 
              : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20"
          }`}
        >
          {isAdmin ? "Disable Admin Mode" : "Enable Admin Mode"}
        </button>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gray-900/50 border border-gray-800/80 p-8 rounded-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            <EditableText 
              contentKey="dashboard.welcome_heading" 
              defaultText="Welcome back to your dashboard" 
              isAdmin={isAdmin} 
            />
          </h1>
          <p className="text-gray-400 text-sm">
            <EditableText 
              contentKey="dashboard.welcome_subtitle" 
              defaultText="Manage your AI agents, workspace reports, and system content seamlessly." 
              isAdmin={isAdmin} 
            />
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <span className="text-xs text-gray-400 font-medium">Active Neural Cores</span>
            <h3 className="text-2xl font-bold mt-1 text-indigo-400">7 Connected</h3>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <span className="text-xs text-gray-400 font-medium">Database State</span>
            <h3 className="text-2xl font-bold mt-1 text-emerald-400">PostgreSQL Live</h3>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
            <span className="text-xs text-gray-400 font-medium">CMS Status</span>
            <h3 className="text-2xl font-bold mt-1 text-blue-400">Key-Value Active</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
