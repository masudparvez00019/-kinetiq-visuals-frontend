"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Inbox,
  Eye,
  Trash2,
  X,
  CheckCheck,
  Search,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

import { messagesService, type ListMessagesParams } from "@/services/messages.service";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import type {
  ContactMessage,
  PaginatedMessages,
} from "@/types/message";
import { useAdminTheme } from "@/context/admin-theme-context";

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

type ReadFilter = "all" | "unread" | "read";

export default function AdminMessagesPage() {
  const router = useRouter();
  const { theme } = useAdminTheme();
  const isLight = theme === "light";

  // Data
  const [paginated, setPaginated] = useState<PaginatedMessages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters / pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // UI state
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [updatingRead, setUpdatingRead] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Reset page when read filter changes
  useEffect(() => {
    setPage(1);
  }, [readFilter]);

  const fetchMessages = useCallback(async () => {
    if (!authService.getStoredToken()) {
      router.replace("/login");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params: ListMessagesParams = { 
        page, 
        limit: pageSize,
        q: debouncedSearch || undefined,
        isRead: readFilter === "unread" ? false : readFilter === "read" ? true : undefined,
      };
      const data = await messagesService.list(params);
      setPaginated(data);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load messages.");
      setError(message);
      if (/unauthor|forbidden|session|invalid|authentication/i.test(message)) {
        authService.clearSession();
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, readFilter, router]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const messages = paginated?.data ?? [];
  const totalPages = paginated?.totalPages ?? 1;

  const handleOpenMessage = async (m: ContactMessage) => {
    setSelectedMessage(m);
    if (!m.isRead) {
      setUpdatingRead(true);
      try {
        const updated = await messagesService.setReadState(m.id, true);
        setSelectedMessage(updated);
        setPaginated((prev) =>
          prev
            ? {
                ...prev,
                data: prev.data.map((x) => (x.id === m.id ? updated : x)),
              }
            : prev,
        );
      } catch (err) {
        console.warn("Could not mark message read:", getErrorMessage(err));
      } finally {
        setUpdatingRead(false);
      }
    }
  };

  const closeMessage = () => setSelectedMessage(null);

  const handleToggleRead = async (m: ContactMessage, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextState = !m.isRead;
    setUpdatingRead(true);
    try {
      const updated = await messagesService.setReadState(m.id, nextState);
      if (selectedMessage?.id === m.id) {
        setSelectedMessage(updated);
      }
      setPaginated((prev) =>
        prev
          ? {
              ...prev,
              data: prev.data.map((x) => (x.id === m.id ? updated : x)),
            }
          : prev,
      );
    } catch (err) {
      setError(getErrorMessage(err, "Could not update message."));
    } finally {
      setUpdatingRead(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await messagesService.remove(id);
      if (selectedMessage?.id === id) setSelectedMessage(null);
      if (messages.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await fetchMessages();
      }
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete the message."));
    } finally {
      setDeletingId(null);
    }
  };

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.isRead).length,
    [messages],
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className={`font-heading font-normal text-2xl md:text-3xl ${isLight ? "text-slate-900" : "text-white"}`}>
            Inbox Messages
          </h1>
          <p className={`font-satoshi text-xs font-light ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Review, read, and manage client inquiries submitted via the Contact Us form.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchMessages}
          disabled={loading}
          className={`flex items-center gap-2 font-heading font-normal text-xs px-4 py-3 rounded-xl transition-all disabled:opacity-50 border ${
            isLight
              ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs"
              : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
          }`}
          aria-label="Refresh messages"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
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
      <div className={`flex flex-col sm:flex-row border rounded-xl p-3 items-stretch sm:items-center gap-3 ${
        isLight ? "bg-white border-slate-200/80 shadow-xs" : "bg-[#070914] border-white/5"
      }`}>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full border rounded-lg pl-10 pr-4 py-2 font-satoshi text-xs focus:outline-none focus:border-blue-500/40 ${
              isLight
                ? "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                : "bg-[#0a0d1a] border-white/5 text-white placeholder:text-slate-600"
            }`}
          />
        </div>

        <div className={`flex items-center gap-1 border rounded-lg p-1 ${
          isLight ? "bg-slate-100 border-slate-200" : "bg-[#0a0d1a] border-white/5"
        }`}>
          {(["all", "unread", "read"] as ReadFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setReadFilter(f)}
              className={`px-3 py-1.5 rounded-md font-satoshi text-[11px] font-semibold uppercase tracking-wider transition-all ${
                readFilter === f
                  ? "bg-[#0080ff] text-white shadow-xs"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {f}
              {f === "unread" && paginated && readFilter !== "unread" && (
                <span className="ml-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-blue-500/20 text-[#0080ff] text-[9px] font-bold">
                  {messages.filter((m) => !m.isRead).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {paginated && (
          <span className="font-satoshi text-[11px] text-slate-500 hidden sm:inline">
            {paginated.total} total · {unreadCount} unread on this page
          </span>
        )}
      </div>

      {/* Messages Table */}
      <div className="bg-[#070914] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#0a0d1a]/50 text-slate-400 font-satoshi text-[10px] uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-12">Status</th>
                <th className="px-6 py-4">Sender Info</th>
                <th className="px-6 py-4">Inquiry Excerpt</th>
                <th className="px-6 py-4">Submitted Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`skel-${i}`} className="animate-pulse">
                    <td className="px-6 py-4.5">
                      <div className="w-2.5 h-2.5 mx-auto rounded-full bg-white/10" />
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="flex flex-col gap-1.5">
                        <div className="h-3 w-32 bg-white/5 rounded" />
                        <div className="h-2 w-24 bg-white/5 rounded" />
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="h-2 w-48 bg-white/5 rounded" />
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="h-2 w-20 bg-white/5 rounded" />
                    </td>
                    <td className="px-6 py-4.5" />
                  </tr>
                ))}

              {!loading &&
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-white/[0.01] transition-colors font-satoshi text-xs ${
                      !msg.isRead ? "bg-[#0b122b]/30" : ""
                    }`}
                  >
                    {/* Status */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center justify-center">
                        {!msg.isRead ? (
                          <div
                            className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"
                            title="Unread"
                          />
                        ) : (
                          <div title="Read">
                            <CheckCheck className="w-4 h-4 text-slate-500" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Sender */}
                    <td className="px-6 py-4.5">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className={`font-semibold text-sm truncate ${
                            !msg.isRead ? "text-white" : "text-slate-300"
                          }`}
                        >
                          {msg.firstName} {msg.lastName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-light truncate">
                          {msg.email}
                        </span>
                      </div>
                    </td>

                    {/* Message Excerpt */}
                    <td className="px-6 py-4.5 text-slate-400 max-w-xs truncate">
                      {msg.message}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4.5 text-slate-500 whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleOpenMessage(msg)}
                          disabled={deletingId === msg.id}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0080ff]/15 hover:text-[#0080ff] text-slate-400 flex items-center justify-center border border-white/5 transition-all disabled:opacity-40"
                          title="Read message"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(msg.id)}
                          disabled={deletingId === msg.id}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center justify-center border border-white/5 transition-all disabled:opacity-40"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && messages.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-500 font-satoshi text-xs"
                  >
                    {debouncedSearch
                      ? `No messages matching "${debouncedSearch}".`
                      : readFilter === "unread"
                        ? "No unread messages."
                        : readFilter === "read"
                          ? "No read messages."
                          : "No messages in inbox yet."}
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

      {/* MESSAGE VIEW MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
          <div
            onClick={closeMessage}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg bg-[#070914] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl z-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#0080ff]" />
                Client Message
              </h3>
              <button
                type="button"
                onClick={closeMessage}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Info */}
            <div className="grid grid-cols-2 gap-4 bg-[#0a0d1a] border border-white/5 rounded-xl p-4 font-satoshi text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold flex items-center gap-1">
                  <Inbox className="w-3 h-3" />
                  From
                </span>
                <span className="font-bold text-white text-sm">
                  {selectedMessage.firstName} {selectedMessage.lastName}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Received
                </span>
                <span className="text-slate-300">
                  {formatDateTime(selectedMessage.createdAt)}
                </span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email
                </span>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-[#0080ff] hover:underline truncate"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone
                </span>
                <span className="text-slate-300">
                  {selectedMessage.phone || "N/A"}
                </span>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-2">
              <span className="font-satoshi text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                Message Body
              </span>
              <p className="font-satoshi text-sm text-slate-300 font-light leading-relaxed bg-[#0a0d1a] border border-white/5 rounded-xl p-5 whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedMessage.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-2">
              <button
                type="button"
                onClick={() => handleToggleRead(selectedMessage)}
                disabled={updatingRead}
                className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-heading font-normal text-xs py-3.5 rounded-xl transition-all border border-white/5 disabled:opacity-50"
              >
                {selectedMessage.isRead ? "Mark Unread" : "Mark Read"}
              </button>
              <button
                type="button"
                onClick={closeMessage}
                className="flex-1 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs py-3.5 rounded-xl transition-all shadow-[0_0_18px_rgba(0,128,255,0.25)]"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}