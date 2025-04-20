// src/api/product.ts
import { Product } from "@/types/types";
import axiosClient from "./axiosClient";
import { StandardResponse, extractResponseData } from "@/utils/apiUtils";

export const productsApi = {
  getAllProducts: async (name:string, category:string): Promise<Product[]> => {
    const response = await axiosClient.get<StandardResponse<Product[]>>("/products/", {
      params: {
        name: name,
        category: category
      }
    });
    return response.data.data || [];
  },

  addProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    const response = await axiosClient.post<StandardResponse<Product>>("/products/", product);
    return extractResponseData(response);
  },

  updateProduct: async (
    id: number,
    product: Partial<Product>
  ): Promise<Product> => {
    const response = await axiosClient.patch<StandardResponse<Product>>(
      `/products/${id}/`,
      product
    );
    return extractResponseData(response);
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axiosClient.delete(`/products/${id}/`);
  },
};
