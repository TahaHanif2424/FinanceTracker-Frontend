import { Plus } from "lucide-react";
import GroupCard from "../components/b-level/Group-card";
import { CONTENT_HEIGHT } from "../utils/constants";
import { useDialogStore } from "../Store/DialogStore";

// Sample groups data
const sampleGroups = [
  {
    id: "1",
    groupName: "Weekend Trip",
    groupIcon: "✈️",
    totalMembers: 5,
    memberNames: [
      "John Smith",
      "Sarah Johnson",
      "Mike Wilson",
      "Emily Davis",
      "Alex Brown",
    ],
    totalAmount: 2500.0,
  },
  {
    id: "2",
    groupName: "Office Lunch",
    groupIcon: "🍔",
    totalMembers: 8,
    memberNames: [
      "Alice Cooper",
      "Bob Martin",
      "Charlie Lee",
      "Diana Ross",
      "Emma Watson",
      "Frank Miller",
      "Grace Kelly",
      "Henry Ford",
    ],
    totalAmount: 450.0,
  },
  {
    id: "3",
    groupName: "Birthday Party",
    groupIcon: "🎉",
    totalMembers: 12,
    memberNames: [
      "Tom Hardy",
      "Lisa Simpson",
      "Mark Johnson",
      "Nancy Drew",
      "Oscar Wilde",
      "Paula Dean",
      "Quinn Taylor",
      "Rachel Green",
      "Sam Smith",
      "Tina Turner",
      "Uma Thurman",
      "Victor Hugo",
    ],
    totalAmount: 1800.0,
  },
  {
    id: "4",
    groupName: "Gym Membership",
    groupIcon: "💪",
    totalMembers: 4,
    memberNames: [
      "Chris Evans",
      "Dave Bautista",
      "Eliza Doolittle",
      "Fred Flintstone",
    ],
    totalAmount: 600.0,
  },
  {
    id: "5",
    groupName: "Book Club",
    groupIcon: "📚",
    totalMembers: 6,
    memberNames: [
      "George Orwell",
      "Harper Lee",
      "Isaac Asimov",
      "Jane Austen",
      "Kurt Vonnegut",
      "Leo Tolstoy",
    ],
    totalAmount: 300.0,
  },
  {
    id: "6",
    groupName: "Movie Night",
    groupIcon: "🎬",
    totalMembers: 7,
    memberNames: [
      "Martin Scorsese",
      "Nancy Meyers",
      "Oliver Stone",
      "Patty Jenkins",
      "Quentin Tarantino",
      "Ridley Scott",
      "Steven Spielberg",
    ],
    totalAmount: 520.0,
  },
];

export default function Groups() {
  const { openDialog } = useDialogStore();

  const handleAddGroup = () => {
    // Open dialog to add a new group
    openDialog("add_group");
  };

  const handleGroupClick = (groupId: string) => {
    // Handle group card click - navigate to group details
    console.log("Group clicked:", groupId);
  };

  return (
    <div className="p-6 bg-gray-50" style={{ height: CONTENT_HEIGHT }}>
      <div className="flex flex-col h-full gap-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-career-darkGreen">Groups</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your group expenses and settlements
            </p>
          </div>
          <button
            onClick={handleAddGroup}
            className="
              flex items-center gap-2
              bg-career-darkGreen
              hover:bg-career-darkGreen/90
              text-white
              px-6 py-3
              rounded-lg
              font-semibold
              transition-all
              duration-200
              shadow-md
              hover:shadow-lg
              hover:-translate-y-0.5
            "
          >
            <Plus className="w-5 h-5" />
            Add Group
          </button>
        </div>

        {/* Groups Grid */}
        <div className="flex-1 overflow-y-auto">
          {sampleGroups.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 pb-4">
              {sampleGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  groupName={group.groupName}
                  groupIcon={group.groupIcon}
                  totalMembers={group.totalMembers}
                  memberNames={group.memberNames}
                  totalAmount={group.totalAmount}
                  onClick={() => handleGroupClick(group.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No groups yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first group to start tracking shared expenses
                </p>
                <button
                  onClick={handleAddGroup}
                  className="
                    inline-flex items-center gap-2
                    bg-career-darkGreen
                    hover:bg-career-darkGreen/90
                    text-white
                    px-6 py-3
                    rounded-lg
                    font-semibold
                    transition-all
                    duration-200
                  "
                >
                  <Plus className="w-5 h-5" />
                  Create Group
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
