import AmountItem from "../components/b-level/Amount-item";
import ExpenseBarChart from "../components/a-level/BarChart/Bar-Chart";
import { CONTENT_HEIGHT } from "../utils/constants";
import { useDialogStore } from "../Store/DialogStore";
import useBalance from "../components/b-level/Balance/useBalance";
import useIncome from "../components/b-level/Income/useIncome";
import useDebt from "../components/b-level/Debt/useDebt";
import useReceivable from "../components/b-level/Receivable/useReceivable";
import useChartData from "../components/a-level/BarChart/useChartData";
import TransactionContainer from "../components/a-level/Transaction/Transaction-container";

export default function Dashboard() {
  const { openDialog } = useDialogStore();
  const { balanceData } = useBalance();
  const { incomeData } = useIncome();
  const { debtData } = useDebt();
  const { receivableData } = useReceivable();
  const { chartData, isLoading: chartLoading, monthlyExpense } = useChartData();
  
  return (
    <div
      className="p-6 flex flex-col gap-6 bg-gray-50"
      style={{ height: CONTENT_HEIGHT }}
    >
      {/* Main Layout: Left Content and Right Transaction Section */}
      <div className="grid grid-cols-[1fr_350px] gap-6 min-h-0 h-full overflow-hidden">
        {/* Left Column - Amount Items + Chart */}
        <div className="flex flex-col gap-4 min-h-0 h-full">
          {/* Row 1: 4 Amount Items in a row */}
          <div className="grid grid-cols-4 gap-4 flex-shrink-0">
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
              amount={monthlyExpense ?? 0}
              icon="💳"
              trend="down"
              trendPercentage={5.2}
            />
            <AmountItem
              heading="Total Debt"
              amount={debtData ?? 0}
              icon="💸"
              trend="up"
              trendPercentage={10.0}
            />
          </div>

          {/* Row 2: 2 stacked Amount Items on left + Chart on right */}
          <div className="grid grid-cols-4 gap-4 flex-1 min-h-0">
            {/* Left column - 2 Amount items stacked (1 column width to match top items) */}
            <div className="flex flex-col gap-4 col-span-1">
              <AmountItem
                heading="Receivables"
                amount={receivableData ?? 0}
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

            {/* Right - Bar Chart taking 3 columns */}
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col min-h-0 border border-career-lightGray/20 col-span-3">
              <h2 className="text-xl font-semibold text-career-darkGreen mb-2">
                Last week Expense
              </h2>
              <div className="flex-1 min-h-0">
                <ExpenseBarChart data={chartData} isLoading={chartLoading} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Transaction Section */}
        <div className="bg-white rounded-xl shadow-md flex flex-col min-h-0 h-full border border-career-lightGray/20">
          <div className="flex items-center justify-between flex-shrink-0 px-4 pt-4">
            <h2 className="text-xl font-semibold text-career-darkGreen">
              Recent Transactions
            </h2>
            <button className="text-xs text-career-darkGreen hover:underline flex-shrink-0">
              View All
            </button>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto space-y-3">
            <TransactionContainer showHeader={false} showActions={false} />
          </div>
        </div>
      </div>
    </div>
  );
}