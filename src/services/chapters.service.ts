import { apiClient } from "@/lib/axios";
import type {
  CourseChapter,
  CreateChapterPayload,
  UpdateChapterPayload,
} from "@/types/course";

export const chaptersService = {
  /** Admin: list every chapter (including unpublished) ordered as on the backend. */
  async list(): Promise<CourseChapter[]> {
    const { data } = await apiClient.get<CourseChapter[]>("/admin/course/chapters");
    return data;
  },

  /** Admin: create a new chapter. */
  async create(payload: CreateChapterPayload): Promise<CourseChapter> {
    const { data } = await apiClient.post<CourseChapter>(
      "/admin/course/chapters",
      payload,
    );
    return data;
  },

  /** Admin: partial-update a chapter. */
  async update(id: string, payload: UpdateChapterPayload): Promise<CourseChapter> {
    const { data } = await apiClient.patch<CourseChapter>(
      `/admin/course/chapters/${id}`,
      payload,
    );
    return data;
  },

  /** Admin: delete a chapter. */
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/admin/course/chapters/${id}`);
  },

  /** Admin: persist a new chapter display order in one transaction. */
  async reorder(ids: string[]): Promise<CourseChapter[]> {
    const { data } = await apiClient.patch<CourseChapter[]>(
      "/admin/course/chapters/reorder",
      { ids },
    );
    return data;
  },
};
