"use client";

import React, { useState } from "react";
import { useAppStore, CourseChapter } from "@/context/store";
import { Plus, Edit2, Trash2, X, Sparkles, GraduationCap } from "lucide-react";

export default function AdminCoursePage() {
  const { chapters, addChapter, updateChapter, deleteChapter } = useAppStore();
  const [formOpen, setFormOpen] = useState(false);
  const [editingNum, setEditingNum] = useState<string | null>(null);

  // Form inputs
  const [num, setNum] = useState("");
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [duration, setDuration] = useState("");

  const openAddForm = () => {
    setEditingNum(null);
    setNum(String(chapters.length + 1).padStart(2, "0"));
    setTitle("");
    setSub("");
    setDuration("");
    setFormOpen(true);
  };

  const openEditForm = (c: CourseChapter) => {
    setEditingNum(c.num);
    setNum(c.num);
    setTitle(c.title);
    setSub(c.sub);
    setDuration(c.duration);
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      num,
      title,
      sub,
      duration,
    };

    if (editingNum) {
      updateChapter(editingNum, payload);
    } else {
      addChapter(payload);
    }
    setFormOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading font-normal text-2xl md:text-3xl text-white">
            Manage Course
          </h1>
          <p className="font-satoshi text-xs text-slate-500 font-light">
            Update, structure, and edit the chapters and curriculum of the Cinematic Video Editing Course.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs px-5 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,128,255,0.25)] self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Chapter
        </button>
      </div>

      {/* Chapters List Table */}
      <div className="bg-[#070914] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#0a0d1a]/50 text-slate-400 font-satoshi text-[10px] uppercase tracking-wider font-semibold">
                <th className="px-6 py-4 w-20">No.</th>
                <th className="px-6 py-4">Chapter Title</th>
                <th className="px-6 py-4">Lessons / Info</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {chapters.map((c) => (
                <tr key={c.num} className="hover:bg-white/[0.01] transition-colors font-satoshi text-xs">
                  {/* Number Badge */}
                  <td className="px-6 py-4.5">
                    <span className="font-heading font-semibold text-[#0080ff] text-sm">{c.num}</span>
                  </td>

                  {/* Title */}
                  <td className="px-6 py-4.5 font-semibold text-white text-sm">{c.title}</td>

                  {/* Lessons Info */}
                  <td className="px-6 py-4.5 text-slate-400">{c.sub}</td>

                  {/* Duration */}
                  <td className="px-6 py-4.5 text-slate-400">{c.duration}</td>

                  {/* Actions */}
                  <td className="px-6 py-4.5 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => openEditForm(c)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0080ff]/15 hover:text-[#0080ff] text-slate-400 flex items-center justify-center border border-white/5 transition-all"
                        title="Edit chapter"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteChapter(c.num)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center justify-center border border-white/5 transition-all"
                        title="Delete chapter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {chapters.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-satoshi text-xs">
                    No curriculum chapters created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT DRAWER OVERLAY */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setFormOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#070914] border-l border-white/5 h-full p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#0080ff]" />
                  {editingNum ? "Edit Course Chapter" : "Add Course Chapter"}
                </h3>
                <button
                  onClick={() => setFormOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form id="course-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5 col-span-1">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Chapter No.
                    </label>
                    <input
                      type="text"
                      required
                      value={num}
                      onChange={(e) => setNum(e.target.value)}
                      placeholder="e.g. 01"
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
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={sub}
                    onChange={(e) => setSub(e.target.value)}
                    placeholder="e.g. 6 Lessons • 1h 10m"
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
              </form>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-5 mt-6">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 font-heading font-normal text-xs py-3.5 rounded-xl transition-all border border-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="course-form"
                className="flex-1 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs py-3.5 rounded-xl transition-all shadow-[0_0_18px_rgba(0,128,255,0.25)]"
              >
                {editingNum ? "Save Changes" : "Create Chapter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
