"use client";

import React, { useState } from "react";
import { useAppStore, Message } from "@/context/store";
import { Inbox, Eye, Trash2, X, CheckCheck } from "lucide-react";

export default function AdminMessagesPage() {
  const { messages, markMessageRead, deleteMessage } = useAppStore();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const openMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageRead(msg.id);
    }
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-heading font-normal text-2xl md:text-3xl text-white">
          Inbox Messages
        </h1>
        <p className="font-satoshi text-xs text-slate-500 font-light">
          Review, read, and manage client inquiries submitted via the Contact Us form.
        </p>
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
              {messages.map((msg) => (
                <tr
                  key={msg.id}
                  className={`hover:bg-white/[0.01] transition-colors font-satoshi text-xs ${
                    !msg.read ? "bg-[#0b122b]/30" : ""
                  }`}
                >
                  {/* Status Indicator */}
                  <td className="px-6 py-4.5">
                    <div className="flex items-center justify-center">
                      {!msg.read ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" title="Unread" />
                      ) : (
                        <div title="Read">
                          <CheckCheck className="w-4 h-4 text-slate-500" />
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Sender */}
                  <td className="px-6 py-4.5">
                    <div className="flex flex-col gap-0.5">
                      <span className={`font-semibold text-sm ${!msg.read ? "text-white" : "text-slate-300"}`}>
                        {msg.firstName} {msg.lastName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-light">{msg.email}</span>
                    </div>
                  </td>

                  {/* Message Excerpt */}
                  <td className="px-6 py-4.5 text-slate-400 max-w-xs truncate">
                    {msg.message}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4.5 text-slate-500">{msg.date}</td>

                  {/* Actions */}
                  <td className="px-6 py-4.5 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => openMessage(msg)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0080ff]/15 hover:text-[#0080ff] text-slate-400 flex items-center justify-center border border-white/5 transition-all"
                        title="Read message"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center justify-center border border-white/5 transition-all"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-satoshi text-xs">
                    No messages in inbox yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT MESSAGE MODAL OVERLAY */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          {/* Backdrop */}
          <div
            onClick={closeMessage}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-lg bg-[#070914] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl z-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#0080ff]" />
                Client Message
              </h3>
              <button
                onClick={closeMessage}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Info Row */}
            <div className="grid grid-cols-2 gap-4 bg-[#0a0d1a] border border-white/5 rounded-xl p-4 font-satoshi text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold">From</span>
                <span className="font-bold text-white text-sm">
                  {selectedMessage.firstName} {selectedMessage.lastName}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold">Date Received</span>
                <span className="text-slate-300">{selectedMessage.date}</span>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold">Email</span>
                <a href={`mailto:${selectedMessage.email}`} className="text-[#0080ff] hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-slate-500 uppercase tracking-wider text-[9px] font-semibold">Phone</span>
                <span className="text-slate-300">{selectedMessage.phone || "N/A"}</span>
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

            {/* Actions Footer */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-2">
              <button
                onClick={closeMessage}
                className="w-full bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs py-3.5 rounded-xl transition-all shadow-[0_0_18px_rgba(0,128,255,0.25)]"
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
