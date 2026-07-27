export interface DashboardRecentMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  products: {
    total: number;
    published: number;
    categories: number;
  };
  course: {
    chapters: number;
    publishedChapters: number;
  };
  messages: {
    total: number;
    unread: number;
    recent: DashboardRecentMessage[];
  };
  staff: number;
  downloads: number;
  revenue: number | null;
}
