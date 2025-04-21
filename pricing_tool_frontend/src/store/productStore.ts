import { productsApi } from "@/api/productsApi";
import { Product } from "@/types/types";
import { create } from "zustand";

interface PaginationData {
  count: number;
  next: string | null;
  previous: string | null;
  currentPage: number;
  pageSize: number;
}
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationData;
  filters: {
    searchQuery: string;
    category: string;
  };
  // New action to update filters
  setFilters: (searchQuery: string, category: string) => void;
  fetchProducts: (
    name: string,
    category: string,
    page?: number
  ) => Promise<void>;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    pageSize: 10,
  },

  // Initialize filters
  filters: {
    searchQuery: "",
    category: "all",
  },

  // Action to update filters
  setFilters: (searchQuery?, category?) => {
    if (!searchQuery && !category) return;
    // Update filters in the state
    if (searchQuery) {
      set((state) => ({
        filters: { ...state.filters, searchQuery },
      }));
    }
    if (category) {
      set((state) => ({
        filters: { ...state.filters, category },
      }));
    }
  },

  fetchProducts: async (name, category, page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await productsApi.getAllProducts(name, category, page);
      set({
        products: response.results,
        pagination: {
          count: response.count,
          next: response.next,
          previous: response.previous,
          currentPage: page,
          pageSize: response.results.length,
        },
        loading: false,
      });
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
