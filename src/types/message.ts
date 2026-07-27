export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  readAt: string | null;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface PaginatedMessages {
  data: ContactMessage[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UpdateMessagePayload {
  isRead: boolean;
}