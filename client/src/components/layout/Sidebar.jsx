import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaWallet,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/UseAuth.js";

const DASHBOARD_PATH = "/expense-tracker/dashboard";

const NAV_LINKS = [
  { to: DASHBOARD_PATH, label: "Dashboard", Icon: FaHome },
  { to: "/expense-tracker/expenses", label: "Expenses", Icon: FaWallet },
  { to: "/expense-tracker/analytics", label: "Analytics", Icon: FaChartLine },
  { to: "/expense-tracker/settings", label: "Settings", Icon: FaCog },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
    isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
  }`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <NavLink
            to={DASHBOARD_PATH}
            className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <FaWallet className="text-white" />
          </NavLink>

          <div>
            <NavLink
              to={DASHBOARD_PATH}
              className="font-bold text-lg hover:text-blue-400 transition-colors"
            >
              ExpenseKit
            </NavLink>
            <p className="text-xs text-slate-400">Smart Expense Splitter</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_LINKS.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={navLinkClass} end={to === DASHBOARD_PATH}>
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors w-full text-left cursor-pointer"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
