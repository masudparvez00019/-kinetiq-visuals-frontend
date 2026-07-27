import { apiClient } from "@/lib/axios";
import type {
  CreateProductPayload,
  PaginatedProducts,
  Product,
  ProductCategory,
  UpdateProductPayload,
} from "@/types/product";

export interface ListProductsParams {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  sortBy?: "createdAt" | "priceCents" | "title" | "sortOrder";
  sortOrder?: "asc" | "desc";
  includeUnpublished?: boolean;
}

export const productsService = {
  /** Admin: list all products (paginated). */
  async list(params: ListProductsParams = {}): Promise<PaginatedProducts> {
    const { data } = await apiClient.get<PaginatedProducts>(
      "/admin/products",
      { params },
    );
    return data;
  },

  /** Admin: fetch all categories (including inactive). */
  async listCategories(): Promise<ProductCategory[]> {
    const { data } = await apiClient.get<ProductCategory[]>(
      "/admin/product-categories",
    );
    return data;
  },

  /** Admin: create a product. */
  async create(payload: CreateProductPayload): Promise<Product> {
    const { data } = await apiClient.post<Product>("/admin/products", payload);
    return data;
  },

  /** Admin: update a product. */
  async update(id: string, payload: UpdateProductPayload): Promise<Product> {
    const { data } = await apiClient.patch<Product>(
      `/admin/products/${id}`,
      payload,
    );
    return data;
  },

  /** Admin: delete a product. */
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/admin/products/${id}`);
  },
};