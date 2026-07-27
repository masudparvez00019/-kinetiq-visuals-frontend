import { apiClient } from "@/lib/axios";
import type {
  ContactMessage,
  PaginatedMessages,
  UpdateMessagePayload,
} from "@/types/message";

export interface ListMessagesParams {
  page?: number;
  limit?: number;
  q?: string;
  isRead?: boolean;
}

export const messagesService = {
  /** Admin: list contact messages (paginated). */
  async list(params: ListMessagesParams = {}): Promise<PaginatedMessages> {
    const { data } = await apiClient.get<PaginatedMessages>("/admin/messages", {
      params,
    });
    return data;
  },

  /** Admin: count of unread messages (for the sidebar bell badge). */
  async unreadCount(): Promise<number> {
    const { data } = await apiClient.get<{ unread: number }>(
      "/admin/messages/unread-count",
    );
    return data.unread;
  },

  /** Admin: fetch a single message. */
  async getOne(id: string): Promise<ContactMessage> {
    const { data } = await apiClient.get<ContactMessage>(
      `/admin/messages/${id}`,
    );
    return data;
  },

  /** Admin: mark a message read or unread. */
  async setReadState(id: string, isRead: boolean): Promise<ContactMessage> {
    const { data } = await apiClient.patch<ContactMessage>(
      `/admin/messages/${id}`,
      { isRead } satisfies UpdateMessagePayload,
    );
    return data;
  },

  /** Admin: delete a message. */
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/admin/messages/${id}`);
  },
};