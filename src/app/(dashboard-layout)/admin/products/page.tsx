"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Sparkles,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { productsService, type ListProductsParams } from "@/services/products.service";
import { mediaService } from "@/services/media.service";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import type {
  PaginatedProducts,
  Product,
  ProductCategory,
} from "@/types/product";
import {
  ACCEPTED_IMAGE_EXTENSIONS,
  ACCEPTED_IMAGE_TYPES,
  MAX_UPLOAD_BYTES,
  formatBytes,
} from "@/types/media";
import { useAdminTheme } from "@/context/admin-theme-context";

type FormState = {
  title: string;
  description: string;
  tag: string;
  priceDollars: string; // UI uses dollars; converted to cents on submit
  originalPriceDollars: string;
  categoryId: string;
  imageUrl: string;
  downloadsCount: string;
  isPublished: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  tag: "",
  priceDollars: "",
  originalPriceDollars: "",
  categoryId: "",
  imageUrl: "",
  downloadsCount: "0",
  isPublished: true,
};

const dollarsToCents = (s: string): number => {
  const num = parseFloat(s);
  if (Number.isNaN(num)) return 0;
  return Math.round(num * 100);
};

const centsToDollars = (cents: number | null | undefined): string => {
  if (cents == null) return "";
  return (cents / 100).toFixed(2);
};

export default function AdminProductsPage() {
  const router = useRouter();
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  // Data
  const [paginated, setPaginated] = useState<PaginatedProducts | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Debounce search input so we don't hammer the API on every keystroke
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const fetchProducts = useCallback(async () => {
    if (!authService.getStoredToken()) {
      router.replace("/login");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params: ListProductsParams = {
        page,
        limit: pageSize,
        sortBy: "createdAt",
        sortOrder: "desc",
        includeUnpublished: true,
      };
      if (debouncedSearch) params.q = debouncedSearch;
      const data = await productsService.list(params);
      setPaginated(data);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load products.");
      setError(message);
      if (/unauthor|forbidden|session|invalid|authentication/i.test(message)) {
        authService.clearSession();
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, router]);

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await productsService.listCategories();
      setCategories(cats);
    } catch {
      // Non-fatal: the form will just show no category options.
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const products = paginated?.data ?? [];
  const totalPages = paginated?.totalPages ?? 1;

  const openAddForm = () => {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      categoryId: categories[0]?.id ?? "",
    });
    setUploadError(null);
    setUploadProgress(null);
    setFormOpen(true);
  };

  const openEditForm = (p: Product) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description,
      tag: p.tag,
      priceDollars: centsToDollars(p.priceCents),
      originalPriceDollars: centsToDollars(p.originalPriceCents),
      categoryId: p.category.id,
      imageUrl: p.imageUrl,
      downloadsCount: String(p.downloadsCount ?? 0),
      isPublished: p.isPublished,
    });
    setUploadError(null);
    setUploadProgress(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    if (submitting || uploading) return;
    setFormOpen(false);
    setEditingId(null);
    setUploadError(null);
    setUploadProgress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const priceCents = dollarsToCents(form.priceDollars);
    const originalPriceCents = form.originalPriceDollars
      ? dollarsToCents(form.originalPriceDollars)
      : undefined;

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tag: form.tag.trim(),
      priceCents,
      originalPriceCents,
      imageUrl: form.imageUrl.trim(),
      categoryId: form.categoryId,
      downloadsCount: parseInt(form.downloadsCount, 10) || 0,
      isPublished: form.isPublished,
    };

    try {
      if (editingId) {
        await productsService.update(editingId, payload);
      } else {
        await productsService.create(payload);
      }
      setFormOpen(false);
      setEditingId(null);
      await fetchProducts();
    } catch (err) {
      setError(getErrorMessage(err, "Could not save the product."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await productsService.remove(id);
      // If we just removed the last item on the page, step back one page.
      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await fetchProducts();
      }
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete the product."));
    } finally {
      setDeletingId(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Always reset the input so re-selecting the same file re-triggers onChange.
    e.target.value = "";
    if (!file) return;

    // Pre-flight validation mirrors the backend's accepted types/sizes.
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])) {
      setUploadError(
        `Unsupported file type: ${file.type || "unknown"}. Use PNG, JPEG, WebP, GIF, or AVIF.`,
      );
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setUploadError(
        `File is too large (${formatBytes(file.size)}). Max is ${formatBytes(MAX_UPLOAD_BYTES)}.`,
      );
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadProgress(`Uploading ${file.name}…`);

    try {
      const asset = await mediaService.upload(file);
      setForm((prev) => ({ ...prev, imageUrl: asset.url }));
      setUploadProgress(`Uploaded • ${file.name} (${formatBytes(asset.size)})`);
    } catch (err) {
      setUploadError(getErrorMessage(err, "Upload failed."));
      setUploadProgress(null);
    } finally {
      setUploading(false);
    }
  };

  const categoryName = useMemo(() => {
    const map = new Map(categories.map((c) => [c.id, c.name]));
    return (id: string) => map.get(id) ?? "—";
  }, [categories]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className={`font-heading font-normal text-2xl md:text-3xl ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Manage Products
          </h1>
          <p className={`font-satoshi text-xs font-light ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}>
            Create, update, and manage your Creative Asset packs catalog.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className={`flex items-center gap-2 font-heading font-normal text-xs px-4 py-3 rounded-xl transition-all disabled:opacity-50 border ${
              isLight
                ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm"
                : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
            }`}
            aria-label="Refresh products"
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
            Create Pack
          </button>
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

      {/* Filter Row */}
      <div className={`flex border rounded-xl p-3 items-center ${
        isLight ? "bg-white border-slate-200/80 shadow-sm" : "bg-[#070914] border-white/5"
      }`}>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products by title or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full border rounded-lg pl-10 pr-4 py-2 font-satoshi text-xs focus:outline-none focus:border-blue-500/40 ${
              isLight
                ? "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                : "bg-[#0a0d1a] border-white/5 text-white placeholder:text-slate-600"
            }`}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className={`border rounded-2xl overflow-hidden ${
        isLight ? "bg-white border-slate-200/80 shadow-sm" : "bg-[#070914] border-white/5 shadow-lg"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b font-satoshi text-[10px] uppercase tracking-wider font-semibold ${
                isLight
                  ? "border-slate-200 bg-slate-50 text-slate-600"
                  : "border-white/5 bg-[#0a0d1a]/50 text-slate-400"
              }`}>
                <th className="px-6 py-4">Pack Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? "divide-slate-200/80" : "divide-white/5"}`}>
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`skel-${i}`} className="animate-pulse">
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-lg bg-white/5" />
                        <div className="flex flex-col gap-1.5">
                          <div className="h-3 w-32 bg-white/5 rounded" />
                          <div className="h-2 w-20 bg-white/5 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="h-5 w-20 bg-white/5 rounded-full" />
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
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-white/[0.01] transition-colors font-satoshi text-xs"
                  >
                    {/* Info */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/5 shrink-0 bg-black flex items-center justify-center">
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="font-semibold text-white text-sm truncate max-w-[220px]">
                            {p.title}
                          </span>
                          <span className="text-[10px] text-slate-500 font-light truncate">
                            {p.tag}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4.5">
                      <span className="bg-blue-500/10 border border-blue-500/15 text-[#0080ff] px-2.5 py-1 rounded-full text-[10px] font-semibold">
                        {p.category.name}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4.5 font-semibold text-white">
                      {p.priceLabel ?? `$${(p.priceCents / 100).toFixed(2)}`}
                      {p.originalPriceCents != null &&
                        p.originalPriceCents !== p.priceCents && (
                          <span className="text-[10px] text-slate-600 line-through ml-2">
                            {p.originalPriceLabel ??
                              `$${(p.originalPriceCents / 100).toFixed(2)}`}
                          </span>
                        )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          p.isPublished
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-slate-500/10 border-slate-500/20 text-slate-400"
                        }`}
                      >
                        {p.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => openEditForm(p)}
                          disabled={deletingId === p.id}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0080ff]/15 hover:text-[#0080ff] text-slate-400 flex items-center justify-center border border-white/5 transition-all disabled:opacity-40"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center justify-center border border-white/5 transition-all disabled:opacity-40"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && products.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500 font-satoshi text-xs"
                  >
                    {debouncedSearch
                      ? `No products matching "${debouncedSearch}".`
                      : "No products yet. Click Create Pack to add one."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        {!loading && paginated && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/5">
            <span className="font-satoshi text-[11px] text-slate-500">
              Showing {(page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, paginated.total)} of {paginated.total}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 flex items-center justify-center border border-white/5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-satoshi text-xs text-slate-400 px-2">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 flex items-center justify-center border border-white/5 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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

          <div className="relative w-full max-w-lg bg-[#070914] border-l border-white/5 h-full p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0080ff]" />
                  {editingId ? "Edit Asset Pack" : "Create Asset Pack"}
                </h3>
                <button
                  type="button"
                  onClick={closeForm}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form
                id="drawer-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Pack Title
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={160}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Nebula Cosmic SFX"
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Sale Price (USD)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      step="0.01"
                      value={form.priceDollars}
                      onChange={(e) =>
                        setForm({ ...form, priceDollars: e.target.value })
                      }
                      placeholder="e.g. 32"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Original Price (optional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.originalPriceDollars}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          originalPriceDollars: e.target.value,
                        })
                      }
                      placeholder="e.g. 42"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Category
                    </label>
                    <select
                      required
                      value={form.categoryId}
                      onChange={(e) =>
                        setForm({ ...form, categoryId: e.target.value })
                      }
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Tag
                    </label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={80}
                      value={form.tag}
                      onChange={(e) => setForm({ ...form, tag: e.target.value })}
                      placeholder="e.g. After Effect Plugin"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Downloads Count
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.downloadsCount}
                    onChange={(e) =>
                      setForm({ ...form, downloadsCount: e.target.value })
                    }
                    placeholder="e.g. 150"
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                {/* Pack Image — full-width drop-zone */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                    <span>Pack Image</span>
                    <span className="font-satoshi normal-case tracking-normal text-[10px] text-slate-500 font-light">
                      PNG, JPEG, WebP, GIF or AVIF · max 5 MB
                    </span>
                  </label>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (!uploading) e.currentTarget.classList.add("!border-blue-500/60", "!bg-blue-500/5");
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove("!border-blue-500/60", "!bg-blue-500/5");
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("!border-blue-500/60", "!bg-blue-500/5");
                      if (uploading) return;
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        // Reuse the upload handler by faking a change event
                        const fakeEvent = {
                          target: { files: [file], value: "" },
                        } as unknown as React.ChangeEvent<HTMLInputElement>;
                        handleImageUpload(fakeEvent);
                      }
                    }}
                    className={`relative w-full rounded-xl border-2 border-dashed transition-colors overflow-hidden ${
                      uploading
                        ? "border-white/10 bg-[#0a0d1a]"
                        : "border-white/10 bg-[#0a0d1a]/60 hover:border-blue-500/40"
                    }`}
                  >
                    {/* Preview or empty state */}
                    {form.imageUrl ? (
                      <div className="relative w-full aspect-[16/9] bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={form.imageUrl}
                          alt="Pack preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.opacity = "0.2";
                          }}
                        />
                        {/* Hover overlay with Replace/Remove */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <label
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                              uploading
                                ? "bg-white/10 text-slate-300 cursor-not-allowed"
                                : "bg-[#0080ff] hover:bg-[#0070e6] text-white"
                            }`}
                          >
                            <ImagePlus className="w-3.5 h-3.5" />
                            Replace
                            <input
                              type="file"
                              accept={ACCEPTED_IMAGE_EXTENSIONS}
                              onChange={handleImageUpload}
                              disabled={uploading}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setForm({ ...form, imageUrl: "" });
                              setUploadProgress(null);
                              setUploadError(null);
                            }}
                            disabled={uploading}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-red-500/15 text-slate-300 hover:text-red-400 border border-white/10 transition-all disabled:opacity-40"
                          >
                            <X className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        className={`flex flex-col items-center justify-center gap-3 py-10 px-6 cursor-pointer text-center ${
                          uploading ? "cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          <ImagePlus className="w-5 h-5 text-[#0080ff]" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-heading font-semibold text-sm text-white">
                            {uploading ? "Uploading…" : "Drop an image or click to browse"}
                          </span>
                          <span className="font-satoshi text-[11px] text-slate-500">
                            Recommended 16:9 ratio
                          </span>
                        </div>
                        <input
                          type="file"
                          accept={ACCEPTED_IMAGE_EXTENSIONS}
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                    )}

                    {/* Uploading overlay */}
                    {uploading && form.imageUrl && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                          <Loader2 className="w-4 h-4 text-[#0080ff] animate-spin" />
                          <span className="font-satoshi text-xs text-white">
                            Uploading…
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload feedback */}
                  {uploadError && (
                    <div className="flex items-start gap-1.5 text-[11px] text-red-400 font-satoshi">
                      <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                  {!uploadError && uploadProgress && form.imageUrl && (
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-satoshi">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>{uploadProgress}</span>
                    </div>
                  )}

                  {/* Hidden field so the form value flows through on submit */}
                  <input
                    type="hidden"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Description
                  </label>
                  <textarea
                    required
                    minLength={10}
                    maxLength={4000}
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Provide a description of what is included in this pack..."
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50 resize-none"
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
                    Published (visible on the public site)
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
                form="drawer-form"
                disabled={submitting}
                className="flex-1 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs py-3.5 rounded-xl transition-all shadow-[0_0_18px_rgba(0,128,255,0.25)] disabled:opacity-50"
              >
                {submitting
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Publish Pack"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}