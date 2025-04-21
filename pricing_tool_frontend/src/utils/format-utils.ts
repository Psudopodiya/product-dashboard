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

export const getPaginationText = (
  currentPage: number,
  pageSize: number,
  count: number
) => {
  // Handle the special case for the last page
  if (pageSize == 0) {
    return `Showing 0 to 0 out of ${count}`;
  }

  if (currentPage * 10 > count && pageSize < 10) {
    const startIndex = count - pageSize + 1;
    return `Showing ${startIndex} to ${count} out of ${count}`;
  }

  // Normal case
  const startIndex = (currentPage - 1) * 10 + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, count);

  return `Showing ${startIndex} to ${endIndex} out of ${count}`;
};
