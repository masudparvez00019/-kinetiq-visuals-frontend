"use client";

import React, { useState } from "react";
import { useAppStore, Product } from "@/context/store";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("Trending");
  const [tag, setTag] = useState("");
  const [downloads, setDownloads] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setTitle("");
    setPrice("");
    setOriginalPrice("");
    setCategory("Trending");
    setTag("");
    setDownloads("");
    setImage("/product-nebula.png");
    setDescription("");
    setFormOpen(true);
  };

  const openEditForm = (p: Product) => {
    setEditingId(p.id);
    setTitle(p.title);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice || "");
    setCategory(p.category);
    setTag(p.tag);
    setDownloads(p.downloads);
    setImage(p.image);
    setDescription(p.description || "");
    setFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      price,
      originalPrice: originalPrice || price,
      category,
      tag,
      downloads: downloads || "0+ DLs",
      image: image || "/product-nebula.png",
      description,
    };

    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }
    setFormOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading font-normal text-2xl md:text-3xl text-white">
            Manage Products
          </h1>
          <p className="font-satoshi text-xs text-slate-500 font-light">
            Create, update, and manage your Creative Asset packs catalog.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs px-5 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(0,128,255,0.25)] self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Pack
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex bg-[#070914] border border-white/5 rounded-xl p-3 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0d1a] border border-white/5 rounded-lg pl-10 pr-4 py-2 font-satoshi text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#070914] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#0a0d1a]/50 text-slate-400 font-satoshi text-[10px] uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Pack Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Downloads</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.01] transition-colors font-satoshi text-xs">
                  {/* Info Column */}
                  <td className="px-6 py-4.5 flex items-center gap-3.5">
                    {/* Thumbnail */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/5 shrink-0 bg-black flex items-center justify-center">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Titles */}
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-white text-sm">{p.title}</span>
                      <span className="text-[10px] text-slate-500 font-light">{p.tag}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4.5">
                    <span className="bg-blue-500/10 border border-blue-500/15 text-[#0080ff] px-2.5 py-1 rounded-full text-[10px] font-semibold">
                      {p.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4.5 font-semibold text-white">
                    {p.price}{" "}
                    {p.originalPrice && p.originalPrice !== p.price && (
                      <span className="text-[10px] text-slate-600 line-through ml-1">{p.originalPrice}</span>
                    )}
                  </td>

                  {/* Downloads */}
                  <td className="px-6 py-4.5 text-slate-400">{p.downloads}</td>

                  {/* Actions */}
                  <td className="px-6 py-4.5 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => openEditForm(p)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0080ff]/15 hover:text-[#0080ff] text-slate-400 flex items-center justify-center border border-white/5 transition-all"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 text-slate-400 flex items-center justify-center border border-white/5 transition-all"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-satoshi text-xs">
                    No products matching search query.
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
          <div className="relative w-full max-w-lg bg-[#070914] border-l border-white/5 h-full p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="flex flex-col gap-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0080ff]" />
                  {editingId ? "Edit Asset Pack" : "Create Asset Pack"}
                </h3>
                <button
                  onClick={() => setFormOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form id="drawer-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Pack Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Nebula Cosmic SFX"
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Sale Price
                    </label>
                    <input
                      type="text"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. $32"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Original Price (optional)
                    </label>
                    <input
                      type="text"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="e.g. $42"
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
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                    >
                      <option>Trending</option>
                      <option>New Releases</option>
                      <option>DaVinci Plugins</option>
                      <option>LUTs Pack</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Tag Info
                    </label>
                    <input
                      type="text"
                      required
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="e.g. After Effect Plugin"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Downloads Count
                    </label>
                    <input
                      type="text"
                      value={downloads}
                      onChange={(e) => setDownloads(e.target.value)}
                      placeholder="e.g. 150+ DLs"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Image Asset URL
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="e.g. /product-nebula.png"
                      className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-satoshi text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a description of what is included in this pack..."
                    className="bg-[#0a0d1a] border border-white/5 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50 resize-none"
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
                form="drawer-form"
                className="flex-1 bg-[#0080ff] hover:bg-[#0070e6] text-white font-heading font-normal text-xs py-3.5 rounded-xl transition-all shadow-[0_0_18px_rgba(0,128,255,0.25)]"
              >
                {editingId ? "Save Changes" : "Publish Pack"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
