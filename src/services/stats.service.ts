import { apiClient } from "@/lib/axios";
import type { DashboardStats } from "@/types/stats";

export const statsService = {
  /** Dashboard overview counters (admin / editor only). */
  async getDashboard(): Promise<DashboardStats> {
    const { data } = await apiClient.get<DashboardStats>("/admin/stats");
    return data;
  },
};
