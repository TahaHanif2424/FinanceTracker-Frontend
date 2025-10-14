import { useDialogStore } from "../../Store/DialogStore";
import AddTransactionDialog from "../b-level/dialog/transaction/Add-Transaction";
import TransactionDetail from "../b-level/dialog/transaction/Transaction-Detail";
import AddBalanceDialog from "../b-level/dialog/balance/Add-Balance";
import AddIncomeDialog from "../b-level/dialog/income/Add-Income";
import ConfirmDialog from "../b-level/dialog/ConfirmDialog";

export default function Dialog() {
  const dialog = useDialogStore();

  if (!dialog.isOpen) return null;

  switch (dialog.dialogName) {
    case "add_transaction":
      return <AddTransactionDialog />;
    case "transaction_detail":
      return <TransactionDetail transaction={dialog.dialogData} />;
    case "add_balance":
      return <AddBalanceDialog />;
    case "add_income":
      return <AddIncomeDialog />;
    case "confirm_delete":
      return (
        <ConfirmDialog
          title={dialog.dialogData?.title || "Confirm Delete"}
          message={
            dialog.dialogData?.message ||
            "Are you sure you want to delete this item?"
          }
          onConfirm={dialog.dialogData?.onConfirm || (() => {})}
          onCancel={dialog.closeDialog}
          confirmText="Delete"
          cancelText="Cancel"
        />
      );
    default:
      return null;
  }
}
