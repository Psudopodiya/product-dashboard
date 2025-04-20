import { useProductStore } from "@/store/productStore";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

interface TableProps {
  tableHeader: string;
  variant: "product" | "pricing";
}

function Table({ tableHeader, variant }: TableProps) {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isDemandColumnVisible, setIsDemandColumnVisible] = useState(false);
  const handleProductSelect = (product: Product, isSelected: boolean) => {
    if (isSelected) {
      // Only add if not already in the array
      if (!selectedProducts.some((p) => p.id === product.id)) {
        setSelectedProducts((prev) => [...prev, product]);
      }
    } else {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts(products);
    } else {
      setSelectedProducts([]);
    }
  };

  useEffect(() => {
    // component mount call
    console.log("Table mounted");
    fetchProducts("", "all");
    return () => {
      // component unmount call
      console.log("Table unmounted");
    }
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-2">
      <TableHeader
        title={tableHeader}
        variant={variant}
        selectedProducts={selectedProducts}
        onToggleDemandColumn={() => setIsDemandColumnVisible((prev) => !prev)}
        isDemandColumnVisible={isDemandColumnVisible}
      />
      <div className="flex-1 overflow-hidden px-4">
      {loading ? (
          <div>Loading products…</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) :(
        <TableBody
          variant={variant}
          data={products}
          // data={filteredData}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onProductSelect={handleProductSelect}
          onSelectAll={handleSelectAll}
          isDemandColumnVisible={isDemandColumnVisible}
        />
        )}
      </div>
    </div>
  );
}

export default Table;
