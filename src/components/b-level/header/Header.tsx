import React from "react";
import { useLocation } from "react-router-dom";
import { User, ChevronDown } from "lucide-react";
import { useDataStore } from "../../../Store/DataStore";

export default function Header() {
  const location = useLocation();
  const { name, email } = useDataStore();

  const getPageName = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/") {
      return "Dashboard";
    }
    if (path === "/transactions") {
      return "Transactions";
    }
    if (path === "/groups") {
      return "Groups";
    }
    if (path === "/reports") {
      return "Reports";
    }
    if (path === "/settings") {
      return "Settings";
    }
    return "Dashboard";
  };

  return (
    <header className="bg-white border-b border-career-lightGray/30 px-6 py-1 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/logo-bg.png"
            alt="Finance Tracker Logo"
            className="h-20 w-20 object-contain"
          />

          <div className="flex items-baseline gap-2 text-career-darkGreen">
            <span className="text-3xl font-bold leading-none">
              Finance Tracker
            </span>
            <span className="text-3xl font-bold leading-none">|</span>
            <span className="text-sm font-medium text-career-mediumGreen leading-none">
              {getPageName()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-career-lightGray/20 hover:bg-career-lightGray/30 transition-colors cursor-pointer">
            <div className="p-2 bg-career-darkGreen text-white rounded-full">
              <User className="w-5 h-5" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-career-darkGreen">
                {name || "User"}
              </p>
              <p className="text-xs text-gray-600">
                {email || "user@example.com"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-career-darkGreen" />
          </div>
        </div>
      </div>
    </header>
  );
}
