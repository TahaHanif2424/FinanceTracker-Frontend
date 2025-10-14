export const sidebar_item = [
  { name: "Dashboard", link: "/dashboard", placement: "top" },
  { name: "Expenses", link: "/expenses", placement: "top" },
  { name: "Transactions", link: "/transactions", placement: "top" },
  { name: "Groups", link: "/groups", placement: "top" },
  { name: "Reports", link: "/reports", placement: "top" },
  { name: "Settings", link: "/settings", placement: "bottom" },
  { name: "Logout", link: "/logout", placement: "bottom" },
];

// Header height calculation: py-1 (0.25rem * 2 = 0.5rem = 8px) + h-20 logo (5rem = 80px) + border (1px) = 89px
export const HEADER_HEIGHT = 89; // in pixels
// Dashboard padding: p-6 (1.5rem * 2 = 3rem = 48px)
export const CONTENT_HEIGHT = `calc(100vh - ${HEADER_HEIGHT}px)`;
