"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  GraduationCap,
  RefreshCw,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { chaptersService } from "@/services/chapters.service";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import type {
  CourseChapter,
  CreateChapterPayload,
  UpdateChapterPayload,
} from "@/types/course";
import { useAdminTheme } from "@/context/admin-theme-context";

type FormState = {
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  isPublished: boolean;
};

const EMPTY_FORM: FormState = {
  number: "",
  title: "",
  subtitle: "",
  duration: "",
  isPublished: true,
};

const suggestNextNumber = (chapters: CourseChapter[]): string => {
  if (chapters.length === 0) return "01";
  const nums = chapters
    .map((c) => parseInt(c.number, 10))
    .filter((n) => !Number.isNaN(n));
  if (nums.length === 0) return String(chapters.length + 1).padStart(2, "0");
  const max = Math.max(...nums);
  return String(max + 1).padStart(2, "0");
};

export default function AdminCoursePage() {
  const router = useRouter();
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  // Data
  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [_reordering, setReordering] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const fetchChapters = useCallback(async () => {
    if (!authService.getStoredToken()) {
      router.replace("/login");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const list = await chaptersService.list();
      setChapters(list);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load course chapters.");
      setError(message);
      if (/unauthor|forbidden|session|invalid|authentication/i.test(message)) {
        authService.clearSession();
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  const openAddForm = () => {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      number: suggestNextNumber(chapters),
    });
    setError(null);
    setFormOpen(true);
  };

  const openEditForm = (c: CourseChapter) => {
    setEditingId(c.id);
    setForm({
      number: c.number,
      title: c.title,
      subtitle: c.subtitle,
      duration: c.duration,
      isPublished: c.isPublished,
    });
    setError(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    if (submitting) return;
    setFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Build the payload exactly as the backend DTO expects.
    if (editingId) {
      const payload: UpdateChapterPayload = {
        number: form.number.trim(),
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        duration: form.duration.trim(),
        isPublished: form.isPublished,
      };
      try {
        await chaptersService.update(editingId, payload);
        toast.success(`Chapter ${payload.number} updated`);
        setFormOpen(false);
        setEditingId(null);
        await fetchChapters();
      } catch (err) {
        const message = getErrorMessage(
          err,
          "Could not update the chapter.",
        );
        setError(message);
        toast.error(message);
      } finally {
        setSubmitting(false);
      }
    } else {
      const payload: CreateChapterPayload = {
        number: form.number.trim(),
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        duration: form.duration.trim(),
        isPublished: form.isPublished,
      };
      try {
        const created = await chaptersService.create(payload);
        toast.success(`Chapter ${created.number} created`);
        setFormOpen(false);
        await fetchChapters();
      } catch (err) {
        const message = getErrorMessage(
          err,
          "Could not create the chapter.",
        );
        setError(message);
        toast.error(message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleDelete = async (c: CourseChapter) => {
    if (
      !window.confirm(
        `Delete chapter ${c.number} — "${c.title}"? This cannot be undone.`,
      )
    ) {
      return;
    }
    setDeletingId(c.id);
    try {
      await chaptersService.remove(c.id);
      toast.success(`Chapter ${c.number} deleted`);
      setChapters((prev) => prev.filter((x) => x.id !== c.id));
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not delete the chapter."));
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublished = async (c: CourseChapter) => {
    const next = !c.isPublished;
    setChapters((prev) =>
      prev.map((x) => (x.id === c.id ? { ...x, isPublished: next } : x)),
    );
    try {
      await chaptersService.update(c.id, { isPublished: next });
      toast.success(
        next ? `Chapter ${c.number} published` : `Chapter ${c.number} hidden`,
      );
    } catch (err) {
      setChapters((prev) =>
        prev.map((x) => (x.id === c.id ? { ...x, isPublished: c.isPublished } : x)),
      );
      toast.error(getErrorMessage(err, "Could not update status."));
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= chapters.length) return;
    setReordering(true);
    const next = [...chapters];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    setChapters(next);
    try {
      await chaptersService.reorder(next.map((c) => c.id));
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save the new order."));
      await fetchChapters();
    } finally {
      setReordering(false);
    }
  };

  const totalCount = useMemo(() => chapters.length, [chapters]);
  const publishedCount = useMemo(
    () => chapters.filter((c) => c.isPublished).length,
    [chapters],
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className={`font-heading font-normal text-2xl md:text-3xl ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Manage Course
          </h1>
          <p className={`font-satoshi text-xs font-light ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}>
            Update, structure, and edit the chapters and curriculum of the
            Cinematic Video Editing Course.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchChapters}
            disabled={loading}
            className={`flex items-center gap-2 font-heading font-normal text-xs px-4 py-3 rounded-xl transition-all disabled:opacity-50 border ${
              isLight
                ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
            }`}
            aria-label="Refresh chapters"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center gap-2 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs px-5 py-3 rounded-xl transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Chapter
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex flex-wrap items-center gap-3">
        <div className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 ${
          isLight ? "bg-white border-slate-200/80 shadow-xs" : "bg-[#070914] border-white/5"
        }`}>
          <GraduationCap className="w-3.5 h-3.5 text-[#0080ff]" />
          <span className={`font-satoshi text-[11px] ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            <span className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>{totalCount}</span>{" "}
            chapter{totalCount === 1 ? "" : "s"}
          </span>
        </div>
        <div className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 ${
          isLight ? "bg-white border-slate-200/80 shadow-xs" : "bg-[#070914] border-white/5"
        }`}>
          <Eye className="w-3.5 h-3.5 text-emerald-500" />
          <span className={`font-satoshi text-[11px] ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            <span className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>{publishedCount}</span>{" "}
            published
          </span>
        </div>
        <div className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 ${
          isLight ? "bg-white border-slate-200/80 shadow-xs" : "bg-[#070914] border-white/5"
        }`}>
          <EyeOff className="w-3.5 h-3.5 text-slate-400" />
          <span className={`font-satoshi text-[11px] ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            <span className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
              {totalCount - publishedCount}
            </span>{" "}
            hidden
          </span>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span className="font-satoshi text-xs text-red-400 font-light">
            {error}
          </span>
        </div>
      )}

      {/* Chapters List Table */}
      <div className={`border rounded-2xl overflow-hidden ${
        isLight ? "bg-white border-slate-200/80 shadow-xs" : "bg-[#070914] border-white/5 shadow-lg"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b font-satoshi text-[10px] uppercase tracking-wider font-semibold ${
                isLight
                  ? "border-slate-200 bg-slate-50 text-slate-600"
                  : "border-white/5 bg-[#0a0d1a]/50 text-slate-400"
              }`}>
                <th className="px-6 py-4 w-16">No.</th>
                <th className="px-6 py-4">Chapter Title</th>
                <th className="px-6 py-4">Lessons / Info</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? "divide-slate-200/80" : "divide-white/5"}`}>
              {loading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={`skel-${i}`} className="animate-pulse">
                    <td className="px-6 py-4.5">
                      <div className="h-4 w-8 bg-white/5 rounded" />
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="h-3 w-40 bg-white/5 rounded mb-1.5" />
                      <div className="h-2 w-24 bg-white/5 rounded" />
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="h-3 w-32 bg-white/5 rounded" />
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="h-3 w-16 bg-white/5 rounded" />
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="h-5 w-16 bg-white/5 rounded-full" />
                    </td>
                    <td className="px-6 py-4.5" />
                  </tr>
                ))}

              {!loading &&
                chapters.map((c, idx) => (
                  <tr
                    key={c.id}
                    className={`hover:bg-white/[0.01] transition-colors font-satoshi text-xs ${
                      deletingId === c.id ? "opacity-40" : ""
                    }`}
                  >
                    {/* Number Badge + reorder handle */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-[#0080ff] text-sm">
                          {c.number}
                        </span>
                        <div className="flex flex-col -gap-1">
                          <button
                            type="button"
                            onClick={() => handleMove(idx, "up")}
                            disabled={idx === 0 || _reordering}
                            className="w-5 h-4 flex items-center justify-center text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move up"
                            aria-label={`Move chapter ${c.number} up`}
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(idx, "down")}
                            disabled={idx === chapters.length - 1 || _reordering}
                            className="w-5 h-4 flex items-center justify-center text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move down"
                            aria-label={`Move chapter ${c.number} down`}
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-6 py-4.5 font-semibold text-white text-sm">
                      {c.title}
                    </td>

                    {/* Lessons Info */}
                    <td className="px-6 py-4.5 text-slate-400">
                      {c.subtitle}
                    </td>

                    {/* Duration */}
                    <td className="px-6 py-4.5 text-slate-400">
                      {c.duration}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4.5">
                      <button
                        type="button"
                        onClick={() => handleTogglePublished(c)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all ${
                          c.isPublished
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/15"
                            : "bg-slate-500/10 border-slate-500/20 text-slate-400 hover:bg-slate-500/15"
                        }`}
                        title={
                          c.isPublished
                            ? "Click to hide from public site"
                            : "Click to publish"
                        }
                      >
                        {c.isPublished ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        {c.isPublished ? "Published" : "Hidden"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => openEditForm(c)}
                          disabled={deletingId === c.id}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0080ff]/15 hover:text-[#0080ff] text-slate-400 flex items-center justify-center border border-white/5 transition-all disabled:opacity-40"
                          title="Edit chapter"
                          aria-label={`Edit chapter ${c.number}`}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c)}
                          disabled={deletingId === c.id}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center justify-center border border-white/5 transition-all disabled:opacity-40"
                          title="Delete chapter"
                          aria-label={`Delete chapter ${c.number}`}
                        >
                          {deletingId === c.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && chapters.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500 font-satoshi text-xs"
                  >
                    No curriculum chapters yet. Click{" "}
                    <span className="text-white font-semibold">Add Chapter</span>{" "}
                    to create the first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Reorder hint footer */}
        {!loading && chapters.length > 1 && (
          <div className="flex items-center gap-2 px-6 py-3 border-t border-white/5 text-slate-500 font-satoshi text-[10px]">
            <GripVertical className="w-3 h-3" />
            Use the up/down arrows to reorder chapters. Changes are saved
            immediately.
          </div>
        )}
      </div>

      {/* ADD / EDIT DRAWER */}
      {formOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            onClick={closeForm}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md bg-[#070914] border-l border-white/5 h-full p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#0080ff]" />
                  {editingId ? "Edit Course Chapter" : "Add Course Chapter"}
                </h3>
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="text-slate-400 hover:text-white p-1 disabled:opacity-50"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form
                id="course-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5 col-span-1">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Chapter No.
                    </label>
                    <input
                      type="text"
                      required
                      pattern="^[0-9]{1,3}$"
                      title="1-3 digits, e.g. 01"
                      value={form.number}
                      onChange={(e) => setForm({ ...form, number: e.target.value })}
                      placeholder="e.g. 01"
                      maxLength={3}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 col-span-2">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Total Duration
                    </label>
                    <input
                      type="text"
                      required
                      minLength={1}
                      maxLength={40}
                      value={form.duration}
                      onChange={(e) =>
                        setForm({ ...form, duration: e.target.value })
                      }
                      placeholder="e.g. 1h 10m or 24 Min"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Chapter Title
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={160}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Editing Workflow"
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Lessons / Subtitle
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={160}
                    value={form.subtitle}
                    onChange={(e) =>
                      setForm({ ...form, subtitle: e.target.value })
                    }
                    placeholder="e.g. 6 Lessons • 1h 10m"
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) =>
                      setForm({ ...form, isPublished: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-white/10 bg-[#0a0d1a] accent-[#0080ff]"
                  />
                  <span className="font-satoshi text-xs text-slate-300">
                    Published (visible on the public course page)
                  </span>
                </label>
              </form>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-5 mt-6">
              <button
                type="button"
                onClick={closeForm}
                disabled={submitting}
                className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 font-heading font-normal text-xs py-3.5 rounded-xl transition-all border border-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="course-form"
                disabled={submitting}
                className="flex-1 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs py-3.5 rounded-xl transition-all shadow-[0_0_18px_rgba(0,128,255,0.25)] disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Create Chapter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}