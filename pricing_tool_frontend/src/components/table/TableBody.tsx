import { Button, Checkbox } from "@/components/ui";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/types";
import {
  formatNumber,
  formatPrice,
  getFilteredHeaders,
} from "@/utils/format-utils";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomPagination } from "./CustomPagination";

import {
  PRICING_TABLE_HEADERS,
  PRODUCT_TABLE_HEADERS,
} from "@/constants/productConstants";

interface ProductGridProps {
  data: Product[];
  variant: "product" | "pricing";
  selectedProducts: Product[];
  setSelectedProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
  onProductSelect: (product: Product, isSelected: boolean) => void;
  onSelectAll?: (isSelected: boolean) => void;
  isDemandColumnVisible: boolean;
}

export default function ProductGrid({
  variant,
  data = [],
  selectedProducts = [],
  onProductSelect,
  onSelectAll,
  isDemandColumnVisible,
}: ProductGridProps) {
  const [localProducts, setLocalProducts] = useState<Product[]>(data);
  const [deletedProductIds, setDeletedProductIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const { updateProduct, deleteProduct } = useProduct();

  useEffect(() => {
    setLocalProducts(data);
    setDeletedProductIds([]);
    setEditingId(null);
    setEditValue("");
  }, [data]);

  const toggleSelectAll = (isChecked: boolean) => {
    if (onSelectAll) {
      onSelectAll(isChecked);
    } else {
      if (isChecked) {
        const productsToAdd = data.filter(
          (product) => !selectedProducts.some((p) => p.id === product.id)
        );
        productsToAdd.forEach((product) => onProductSelect(product, true));
      } else {
        selectedProducts.forEach((product) => onProductSelect(product, false));
      }
    }
  };

  const handleEditStart = (product: Product) => {
    setEditingId(product.id);
    setEditValue(product.name);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleSave = async () => {
    // Process deletions first.
    for (const id of deletedProductIds) {
      await deleteProduct(id);
    }
    // Process updates by comparing local copy to original data.
    for (const updatedProduct of localProducts) {
      const original = data.find((p) => p.id === updatedProduct.id);
      if (original && updatedProduct.name !== original.name) {
        await updateProduct(updatedProduct.id, { name: updatedProduct.name });
      }
    }

    setEditingId(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setLocalProducts(data);
    setDeletedProductIds([]);
    setEditingId(null);
    setEditValue("");
  };

  const handleDelete = (product: Product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLocalProducts((prev) => prev.filter((p) => p.id !== product.id));
      setDeletedProductIds((prev) => [...prev, product.id]);
    }
  };

  const headers = getFilteredHeaders(
    variant === "pricing" ? PRICING_TABLE_HEADERS : PRODUCT_TABLE_HEADERS,
    isDemandColumnVisible
  );

  return (
    <div className="w-full md:text-xs h-full flex flex-col">
      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table
          className="w-full border-collapse"
          style={{ minWidth: "1300px" }}
        >
          <thead>
            <tr className="bg-zinc-900">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 font-medium ${
                    index === 0 || index === headers.length - 1
                      ? ""
                      : "border-x border-gray-400"
                  }`}
                >
                  {header === "Checkbox" ? (
                    <div className="text-center">
                      <Checkbox
                        checked={
                          data.length > 0 &&
                          data.every((product) =>
                            selectedProducts.some((p) => p.id === product.id)
                          )
                        }
                        onCheckedChange={toggleSelectAll}
                        className="mx-auto border-gray-400"
                      />
                    </div>
                  ) : (
                    <div className="text-left">{header}</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Map through localProducts */}
            {localProducts.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-3 text-center">
                  No products found
                </td>
              </tr>
            ) : (
              localProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`text-black ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {variant !== "pricing" && (
                    <td className="px-4 py-3">
                      <div className="text-center">
                        <Checkbox
                          checked={selectedProducts.some(
                            (p) => p.id === product.id
                          )}
                          onCheckedChange={(checked) =>
                            onProductSelect(product, !!checked)
                          }
                          className="mx-auto"
                        />
                      </div>
                    </td>
                  )}
                  <td className="px-4 py-3 border-x border-gray-400">
                    <div className="text-left">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => {
                            const newName = e.target.value;
                            setEditValue(newName);
                            setLocalProducts((prev) =>
                              prev.map((product) =>
                                product.id === editingId
                                  ? { ...product, name: newName }
                                  : product
                              )
                            );
                          }}
                          className="border border-gray-400 rounded p-1 text-xs"
                        />
                      ) : (
                        product.name
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-x border-gray-400">
                    <div className="text-left">{product.category}</div>
                  </td>
                  <td className="px-4 py-3 border-x border-gray-400">
                    <div className="text-left whitespace-normal break-words max-w-[300px]">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-x border-gray-400">
                    <div className="text-left">
                      {formatPrice(product.cost_price)}
                    </div>
                  </td>
                  <td className="px-4 py-3 border-x border-gray-400">
                    <div className="text-left">
                      {formatPrice(product.selling_price)}
                    </div>
                  </td>
                  {variant === "pricing" ? (
                    <>
                      <td className="px-4 py-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">
                            {formatPrice(product.cost_price)}
                          </span>
                          <span className="text-teal-500">
                            {formatPrice(product.optimized_price)}
                          </span>
                        </div>
                      </td>
                      {isDemandColumnVisible && (
                        <td className="px-4 py-3 border-x border-gray-400">
                          <div className="text-left text-teal-500">
                            {product.demand_forecast}
                          </div>
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 border-x border-gray-400">
                        <div className="text-left">
                          {formatNumber(product.stock_available)}
                        </div>
                      </td>
                      <td className="px-4 py-3 border-x border-gray-400">
                        <div className="text-left">
                          {formatNumber(product.units_sold)}
                        </div>
                      </td>
                      {isDemandColumnVisible && (
                        <td className="px-4 py-3 border-x border-gray-400">
                          <div className="text-left text-teal-500">
                            {product.demand_forecast}
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-around gap-2">
                          <button
                            onClick={() => console.log("View", product.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Eye size={12} />
                          </button>
                          {editingId === product.id ? (
                            <button
                              onClick={handleEditCancel}
                              className="text-red-500 hover:text-red-700"
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditStart(product)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Pencil size={12} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(product)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Buttons for global Save and Cancel */}
      <div className="flex gap-4 mt-2 justify-end">
        <CustomPagination />
        <Button
          onClick={handleCancel}
          variant="outline"
          size="sm"
          className="h-9 border-[#01e0b4] text-xs"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="outline"
          size="sm"
          className="h-9 bg-[#01e0b4] border-none text-xs px-4 text-black"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
