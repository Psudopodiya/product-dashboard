import { productsApi } from "@/api/productsApi";
import { Product } from "@/types/types";
import { create } from "zustand";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (name:string, category:string) => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,


  fetchProducts: async (name, category) => {
    set({ loading: true, error: null });
    try {
      const data = await productsApi.getAllProducts(name, category);
      set({ products: data });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || "Failed to fetch products",
      });
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await productsApi.addProduct(product);
      set({ products: [...get().products, newProduct] });
    } catch (error: any) {
      set({ error: error.response?.data?.detail || "Failed to add product" });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id, product) => {
    set({ loading: true, error: null });
    try {
      const updatedProduct = await productsApi.updateProduct(id, product);
      set({
        products: get().products.map((p) => (p.id === id ? updatedProduct : p)),
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || "Failed to update product",
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await productsApi.deleteProduct(id);
      set({ products: get().products.filter((p) => p.id !== id) });
    } catch (error: any) {
      set({
        error: error.response?.data?.detail || "Failed to delete product",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
