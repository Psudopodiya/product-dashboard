export const formatNumber = (num: number) => num.toLocaleString();

export const formatPrice = (price: string | number) => {
  const numericPrice =
    typeof price === "string" ? Number.parseFloat(price) : price;
  return `$${numericPrice.toFixed(2)}`;
};

export const getFilteredHeaders = (
  headers: string[],
  isDemandColumnVisible: boolean
) => {
  return headers.filter(
    (h) => isDemandColumnVisible || h !== "Calculated Demand"
  );
};
