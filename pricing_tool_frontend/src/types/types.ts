interface Product {
  id: number;
  name: string;
  category: string;
  cost_price: string;
  selling_price: string;
  description: string;
  stock_available: number;
  units_sold: number;
  customer_rating: number;
  demand_forecast: number | null;
  optimized_price: string;
}

export interface CreateProduct {
  name: string;
  category: string;
  cost_price: string;
  selling_price: string;
  description: string;
  stock_available: number;
  units_sold: number;
  customer_rating: number;
  demand_forecast: number;
  optimized_price: string;
}

export interface UpdateProduct {
  name?: string;
  category?: string;
  cost_price?: string;
  selling_price?: string;
  description?: string;
  stock_available?: number;
  units_sold?: number;
  customer_rating?: number;
  demand_forecast?: number;
  optimized_price?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export type { LoginCredentials, Product };
