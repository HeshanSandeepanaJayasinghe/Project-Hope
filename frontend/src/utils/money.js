// Amounts arrive from the API as JSON numbers with up to 2 decimal places (LKR).
export const formatLKR = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
