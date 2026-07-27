export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  tag: string;
  priceCents: number;
  originalPriceCents: number | null;
  currency: string;
  priceLabel: string | null;
  originalPriceLabel: string | null;
  imageUrl: string;
  previewVideoUrl: string | null;
  downloadsCount: number;
  downloadsLabel: string;
  ratingAverage: number | null;
  ratingCount: number;
  isPublished: boolean;
  sortOrder: number;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CreateProductPayload {
  title: string;
  slug?: string;
  description: string;
  tag: string;
  priceCents: number;
  originalPriceCents?: number;
  currency?: string;
  imageUrl: string;
  previewVideoUrl?: string;
  categoryId: string;
  downloadsCount?: number;
  isPublished?: boolean;
  sortOrder?: number;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;