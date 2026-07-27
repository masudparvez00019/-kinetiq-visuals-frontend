/**
 * Shape of a CourseChapter as returned by the backend admin endpoints
 * (`/admin/course/chapters`).
 *
 * Note: this is intentionally distinct from the `CourseChapter` declared in
 * `src/context/store.tsx` which is a localStorage-backed model used by the
 * public course page. The admin panel reads/writes through this typed model
 * which mirrors the Prisma schema directly.
 */
export interface CourseChapter {
  id: string;
  /** Display number such as "01"; unique across the curriculum. */
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChapterPayload {
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  sortOrder?: number;
  isPublished?: boolean;
}

export type UpdateChapterPayload = Partial<CreateChapterPayload>;
