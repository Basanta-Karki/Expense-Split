import React from "react";
import Sidebar from "./Layout/Sidebar";
import HeaderTop from "./layout/HeaderTop";

const Analytics = () => {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <HeaderTop title="Analytics" />
        <div className="p-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h1 className="text-2xl font-bold mb-2">Analytics</h1>
            <p className="text-slate-400 text-sm">
              This page is wired up. Add charts/insights here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;

