import { CONTENT_HEIGHT } from "../utils/constants";
import UserList from "../components/b-level/UserList";
import FriendsList from "../components/b-level/FriendsList";

export default function Friends() {
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

        {/* 2-Column Grid Layout */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-2 gap-6 h-full">
            {/* Left Column: All Users with Search */}
            <UserList />

            {/* Right Column: Your Friends */}
            <FriendsList />
          </div>
        </div>
      </div>
    </div>
  );
}
