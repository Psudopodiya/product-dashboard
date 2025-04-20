import { useProductStore } from "@/store/productStore";
import { Product } from "@/types/types";
import { toast } from "sonner";

export function useProduct() {
  const {
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    loading,
    products,
    error,
  } = useProductStore();

  const add = async (product: Omit<Product, "id">) => {
    try {
      await addProduct(product);
      toast.success("Product added successfully");
      return true;
    } catch {
      toast.error("Failed to add product");
      return false;
    }
  };

  const update = async (id: number, product: Partial<Product>) => {
    try {
      await updateProduct(id, product);
      toast.success("Product updated successfully");
      return true;
    } catch {
      toast.error("Failed to update product");
      return false;
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      return true;
    } catch {
      toast.error("Failed to delete product");
      return false;
    }
  };

  return {
    products,
    loading,
    error,
    addProduct: add,
    updateProduct: update,
    deleteProduct: remove,
    fetchProducts,
  };
}
