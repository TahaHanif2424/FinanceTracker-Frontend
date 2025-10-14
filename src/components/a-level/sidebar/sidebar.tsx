import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebar_item } from "../../../utils/constants";
import Tooltip from "../../c-level/Tooltip";
import { useDataStore } from "../../../Store/DataStore";
import {
  Menu,
  X,
  LayoutDashboard,
  Receipt,
  DollarSign,
  Users,
  FileBarChart,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { resetUserData } = useDataStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "dashboard":
        return <LayoutDashboard className="w-5 h-5" />;
      case "transactions":
        return <Receipt className="w-5 h-5" />;
      case "expenses":
        return <DollarSign className="w-5 h-5" />;
      case "groups":
        return <Users className="w-5 h-5" />;
      case "reports":
        return <FileBarChart className="w-5 h-5" />;
      case "settings":
        return <Settings className="w-5 h-5" />;
      case "logout":
        return <LogOut className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const topItems = sidebar_item.filter((item) => item.placement === "top");
  const bottomItems = sidebar_item.filter(
    (item) => item.placement === "bottom",
  );

  const handleLogout = () => {
    resetUserData();
    navigate("/auth?mode=login");
  };

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div
            className={`flex items-center ${isOpen ? "gap-4" : "justify-center"} p-4 border-b border-career-lightGray`}
          >
            {/* Hamburger/Close Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-career-lightGray transition-all duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-career-darkGreen" />
              ) : (
                <Menu className="w-6 h-6 text-career-darkGreen" />
              )}
            </button>
            {/* Title - only show when open */}
            {isOpen && (
              <h2 className="text-xl font-bold text-career-darkGreen">
                Finance Tracker
              </h2>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col justify-between p-2">
            {/* Top Items */}
            <div className="space-y-2">
              {topItems.map((item) => {
                const linkElement = (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center ${isOpen ? "gap-3 px-4" : "justify-center px-2"} py-3 rounded-lg transition-all duration-200 ${
                      location.pathname === item.link
                        ? "bg-career-darkGreen text-white"
                        : "text-career-darkGreen hover:bg-career-lightGray"
                    }`}
                  >
                    {getIcon(item.name)}
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </Link>
                );

                return !isOpen ? (
                  <Tooltip
                    key={item.name}
                    text={item.name}
                    position="right"
                    delay={100}
                  >
                    {linkElement}
                  </Tooltip>
                ) : (
                  linkElement
                );
              })}
            </div>

            {/* Bottom Items */}
            <div className="space-y-2 border-t border-career-lightGray pt-4">
              {bottomItems.map((item) => {
                const element =
                  item.name === "Logout" ? (
                    <button
                      key={item.name}
                      onClick={handleLogout}
                      className={`flex items-center ${isOpen ? "gap-3 px-4" : "justify-center px-2"} py-3 rounded-lg transition-all duration-200 text-career-darkGreen hover:bg-career-lightGray w-full`}
                    >
                      {getIcon(item.name)}
                      {isOpen && (
                        <span className="font-medium">{item.name}</span>
                      )}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center ${isOpen ? "gap-3 px-4" : "justify-center px-2"} py-3 rounded-lg transition-all duration-200 ${
                        location.pathname === item.link
                          ? "bg-career-darkGreen text-white"
                          : "text-career-darkGreen hover:bg-career-lightGray"
                      }`}
                    >
                      {getIcon(item.name)}
                      {isOpen && (
                        <span className="font-medium">{item.name}</span>
                      )}
                    </Link>
                  );

                return !isOpen ? (
                  <Tooltip
                    key={item.name}
                    text={item.name}
                    position="right"
                    delay={100}
                  >
                    {element}
                  </Tooltip>
                ) : (
                  element
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
