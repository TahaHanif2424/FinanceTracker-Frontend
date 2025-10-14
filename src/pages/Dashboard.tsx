import React from "react";
import AmountItem from "../components/b-level/Amount-item";
import ExpenseBarChart from "../components/a-level/BarChart/Bar-Chart";
import ExpenseLineChart from "../components/a-level/LineChart/Line-Chart";
import ExpensePieChart from "../components/a-level/PieChart/Pie-Chart";
import TransactionItem from "../components/b-level/Transaction-item";
import DebtContainer from "../components/a-level/Debt-container";
import GroupContainer from "../components/a-level/Group-container";
import { CONTENT_HEIGHT } from "../utils/constants";
import { useDialogStore } from "../Store/DialogStore";
import useBalance from "../components/b-level/Balance/useBalance";
import useIncome from "../components/b-level/Income/useIncome";

// Sample transaction data for dashboard
const recentTransactions = [
  {
    id: "1",
    name: "Grocery Store",
    date: "2024-03-15",
    time: "10:30 AM",
    amount: 125.5,
    type: "EXPENSE" as const,
    icon: "🛒",
  },
  {
    id: "2",
    name: "Salary Deposit",
    date: "2024-03-14",
    time: "09:00 AM",
    amount: 3500.0,
    type: "INCOME" as const,
    icon: "💵",
  },
  {
    id: "3",
    name: "Coffee Shop",
    date: "2024-03-14",
    time: "03:45 PM",
    amount: 4.5,
    type: "EXPENSE" as const,
    icon: "☕",
  },
  {
    id: "4",
    name: "Electric Bill",
    date: "2024-03-13",
    time: "02:15 PM",
    amount: 89.99,
    type: "EXPENSE" as const,
    icon: "⚡",
  },
  {
    id: "5",
    name: "Electric Bill",
    date: "2024-03-13",
    time: "02:15 PM",
    amount: 89.99,
    type: "EXPENSE" as const,
    icon: "⚡",
  },
  {
    id: "6",
    name: "Electric Bill",
    date: "2024-03-13",
    time: "02:15 PM",
    amount: 89.99,
    type: "EXPENSE" as const,
    icon: "⚡",
  },
  {
    id: "7",
    name: "Electric Bill",
    date: "2024-03-13",
    time: "02:15 PM",
    amount: 89.99,
    type: "EXPENSE" as const,
    icon: "⚡",
  },
  {
    id: "8",
    name: "Electric Bill",
    date: "2024-03-13",
    time: "02:15 PM",
    amount: 89.99,
    type: "EXPENSE" as const,
    icon: "⚡",
  },
];

// Sample debts and receivables data
const debtsAndReceivables = [
  {
    id: "1",
    userName: "John Smith",
    amount: 500.0,
    date: "2024-03-20",
    type: "receivable" as const,
  },
  {
    id: "2",
    userName: "Sarah Johnson",
    amount: 250.0,
    date: "2024-03-18",
    type: "payable" as const,
  },
  {
    id: "3",
    userName: "Mike Wilson",
    amount: 150.0,
    date: "2024-03-15",
    type: "receivable" as const,
  },
  {
    id: "4",
    userName: "Emily Davis",
    amount: 300.0,
    date: "2024-03-12",
    type: "payable" as const,
  },
  {
    id: "5",
    userName: "Emily Davis",
    amount: 300.0,
    date: "2024-03-12",
    type: "payable" as const,
  },
  {
    id: "6",
    userName: "Emily Davis",
    amount: 300.0,
    date: "2024-03-12",
    type: "payable" as const,
  },
];

// Sample group settlements data
const groupSettlements = [
  {
    id: "1",
    groupName: "Weekend Trip",
    amount: 450.0,
    date: "2024-03-18",
    type: "receivable" as const,
    groupIcon: "✈️",
  },
  {
    id: "2",
    groupName: "Office Lunch",
    amount: 75.0,
    date: "2024-03-16",
    type: "payable" as const,
    groupIcon: "🍔",
  },
  {
    id: "3",
    groupName: "Birthday Party",
    amount: 200.0,
    date: "2024-03-14",
    type: "receivable" as const,
    groupIcon: "🎉",
  },
  {
    id: "4",
    groupName: "Gym Membership",
    amount: 120.0,
    date: "2024-03-10",
    type: "payable" as const,
    groupIcon: "💪",
  },
];

export default function Dashboard() {
  const { openDialog } = useDialogStore();
  const { balanceData } = useBalance();
  const { incomeData } = useIncome();
  return (
    <div
      className="p-6 flex flex-col gap-6 bg-gray-50"
      style={{ height: CONTENT_HEIGHT }}
    >
      {/* First Row */}
      <div className="grid grid-cols-[auto_1fr] gap-6 min-h-0 h-full shrink-0 overflow-hidden pb-2">
        {/* Amount Items Column */}
        <div className="grid grid-rows-3 gap-6 min-h-0 h-full">
          <AmountItem
            heading="Total Balance"
            amount={balanceData}
            icon="💰"
            trend="up"
            trendPercentage={12.5}
            onClick={() => openDialog("add_balance")}
          />

          <AmountItem
            heading="Monthly Income"
            amount={incomeData}
            icon="💵"
            trend="up"
            trendPercentage={8.3}
            onClick={() => openDialog("add_income")}
          />

          <AmountItem
            heading="Monthly Expenses"
            amount={3420}
            icon="💳"
            trend="down"
            trendPercentage={5.2}
          />
        </div>

        {/* Right Column - Split into Charts (60%) and Transactions (40%) */}
        <div className="grid grid-cols-[3fr_2fr] gap-6 min-h-0 h-full min-w-0">
          {/* Charts Column */}
          <div className="grid grid-rows-2 gap-6 min-h-0 h-full min-w-0">
            {/* Line Chart */}
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col min-h-0 border border-career-lightGray/20">
              <h2 className="text-xl font-semibold text-career-darkGreen mb-1">
                Range of expense
              </h2>
              <div className="flex-1 min-h-0">
                <ExpenseLineChart />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col min-h-0 border border-career-lightGray/20">
              <h2 className="text-xl font-semibold text-career-darkGreen mb-1">
                Last week Expense
              </h2>
              <div className="flex-1 min-h-0">
                <ExpenseBarChart />
              </div>
            </div>
          </div>

          {/* Transaction Section */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col min-h-0 min-w-0 h-full border border-career-lightGray/20 mr-1">
            <div className="mb-3 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-semibold text-career-darkGreen">
                Recent Transactions
              </h2>
              <button className="text-xs text-career-darkGreen hover:underline flex-shrink-0">
                View All
              </button>
            </div>
            <div className="flex-1 min-h-0 min-w-0 overflow-y-auto space-y-3">
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  id={transaction.id}
                  key={transaction.id}
                  amount={transaction.amount}
                  date={transaction.date}
                  icon={transaction.icon}
                  name={transaction.name}
                  time={transaction.time}
                  type={transaction.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-[auto_1fr] gap-6 min-h-0 h-full shrink-0 overflow-hidden pb-4">
        {/* Additional Amount Items Column */}
        <div className="grid grid-rows-2 gap-6 min-h-0 h-full">
          <AmountItem
            heading="Total Debt"
            amount={15000}
            icon="💸"
            trend="up"
            trendPercentage={10.0}
          />

          <AmountItem
            heading="Receivables"
            amount={1000}
            icon="💹"
            trend="up"
            trendPercentage={10.0}
          />

          <AmountItem
            heading="Saving Goal"
            amount={25000}
            icon="🎯"
            trend="up"
            trendPercentage={15.2}
          />
        </div>

        {/* Right Column - Split into two columns */}
        <div className="grid grid-cols-2 gap-6 min-h-0 h-full min-w-0">
          {/* Left Column: Pie Chart and Group Settlements (stacked vertically) */}
          <div className="grid grid-rows-2 gap-6 min-h-0 h-full">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-3 flex flex-col min-h-0 border border-career-lightGray/20">
              <h2 className="text-xl font-semibold text-career-darkGreen mb-1">
                Expense Categories
              </h2>
              <div className="flex-1 min-h-0">
                <ExpensePieChart />
              </div>
            </div>

            {/* Group Settlements */}
            <GroupContainer
              className="min-h-0 h-full"
              groups={groupSettlements}
            />
          </div>

          {/* Right Column: Debts & Receivables (full height) */}
          <DebtContainer
            className="min-h-0 h-full"
            debts={debtsAndReceivables}
          />
        </div>
      </div>
    </div>
  );
}
