import { useState } from "react";
import { Users, UserPlus, Inbox } from "lucide-react";
import { CONTENT_HEIGHT } from "../utils/constants";
import FriendsTab from "../components/b-level/Friends/FriendsTab";
import FindUsersTab from "../components/b-level/Friends/FindUsersTab";
import RequestsTab from "../components/b-level/Friends/RequestsTab";
import useFriend from "../components/b-level/Friends/useFriend";

type TabType = "friends" | "findUsers" | "requests";

export default function Friends() {
  const [activeTab, setActiveTab] = useState<TabType>("friends");
  const { pendingRequestsData } = useFriend();
  const pendingCount = pendingRequestsData?.length || 0;

  const tabs = [
    {
      id: "friends" as TabType,
      label: "Your Friends",
      icon: Users,
      component: FriendsTab,
    },
    {
      id: "findUsers" as TabType,
      label: "Find Users",
      icon: UserPlus,
      component: FindUsersTab,
    },
    {
      id: "requests" as TabType,
      label: "Friend Requests",
      icon: Inbox,
      component: RequestsTab,
      badge: pendingCount,
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="p-6 bg-gray-50" style={{ height: CONTENT_HEIGHT }}>
      <div className="flex flex-col h-full gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-career-darkGreen">Friends</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your friends and connect with new users
          </p>
        </div>

        {/* Tabbed Interface */}
        <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-lg shadow-md">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? "text-career-darkGreen border-b-2 border-career-darkGreen bg-green-50"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}
