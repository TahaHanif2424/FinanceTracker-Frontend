export const categoryIconMap: Record<string, string> = {
  // Expense categories
  Groceries: "🛒",
  "Food & Drinks": "☕",
  Utilities: "⚡",
  Transport: "🚗",
  Entertainment: "🎮",
  Healthcare: "🏥",
  Education: "📚",
  Shopping: "🛍️",
  Rent: "🏠",

  // Income categories
  Salary: "💵",
  Investment: "💰",
  Gift: "🎁",
  Bonus: "📈",
  Refund: "💳",

  // Default
  Other: "💼",
};

export const getCategoryIcon = (category: string): string => {
  return categoryIconMap[category] || "💼";
};
