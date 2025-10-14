import TransactionContainer from "../components/a-level/Transaction/Transaction-container";
import { CONTENT_HEIGHT } from "../utils/constants";

export default function Transactions() {
  return (
    <div className="p-6 bg-gray-50" style={{ height: CONTENT_HEIGHT }}>
      <TransactionContainer className="h-[calc(100%-120px)]" />
    </div>
  );
}
