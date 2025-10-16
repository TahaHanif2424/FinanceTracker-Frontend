import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

// Sample users data
const sampleUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    isFriend: false,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    isFriend: true,
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    isFriend: false,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    isFriend: true,
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex.brown@example.com",
    isFriend: false,
  },
  {
    id: "6",
    name: "Jessica White",
    email: "jessica.w@example.com",
    isFriend: false,
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    isFriend: true,
  },
  {
    id: "8",
    name: "Rachel Green",
    email: "rachel.green@example.com",
    isFriend: false,
  },
  {
    id: "9",
    name: "Tom Hardy",
    email: "tom.hardy@example.com",
    isFriend: false,
  },
  {
    id: "10",
    name: "Lisa Simpson",
    email: "lisa.simpson@example.com",
    isFriend: false,
  },
];

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(sampleUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddFriend = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFriend: true } : user,
      ),
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-career-darkGreen focus:border-transparent"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-scroll p-4">
        <div className="space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-career-darkGreen rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  {/* User Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Add Friend Button */}
                {user.isFriend ? (
                  <span className="text-sm text-green-600 font-medium">
                    Friends
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddFriend(user.id)}
                    className="p-2 bg-career-darkGreen text-white rounded-lg hover:bg-career-darkGreen/90 transition-all duration-200"
                    title="Add Friend"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
