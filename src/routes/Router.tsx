import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AuthenticatedLayout from "../layout/authenticatedLayout";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Groups from "../pages/Groups";
import Friends from "../pages/Friends";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "/auth", element: <AuthPage /> },
  {
    path: "/",
    element: <AuthenticatedLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "transactions", element: <Transactions /> },
      { path: "friends", element: <Friends /> },
      { path: "groups", element: <Groups /> },
      { path: "reports", element: <div>Reports Page</div> },
      { path: "settings", element: <div>Settings Page</div> },
    ],
  },
]);
export default router;
