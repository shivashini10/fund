export const formatCurrency = (amount) => {
  return `₹${Number(amount).toLocaleString()}`;
};

export const calculateProgress = (raised, goal) => {
  if (!goal) return 0;
  return Math.min((raised / goal) * 100, 100);
};

export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};