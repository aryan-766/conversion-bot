import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Star,
  Plus,
  Edit2,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Tag,
  Search
} from 'lucide-react';
import { Product } from '../../types';

export const ProductsTab: React.FC = () => {
  const { products, setProducts } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-zinc-300" />
            Structured Product Catalog & Recommendation Index
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Structured SKU database with real pricing, variants, and semantic recommendation attributes.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#13151E] border border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search products by title or specs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-semibold shadow-sm border border-zinc-500'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="rounded-2xl bg-[#13151E] border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-44 bg-zinc-950 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-200 border border-zinc-700">
                  {product.category}
                </span>
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-zinc-700 to-zinc-800 text-white border border-zinc-600 font-mono shadow-md">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white tracking-tight">{product.name}</h3>
                  <div className="flex items-center space-x-1 text-zinc-300 text-xs font-bold font-mono">
                    <Star className="h-3.5 w-3.5 fill-zinc-300" />
                    <span>{product.rating}</span>
                    <span className="text-[10px] text-zinc-500">({product.reviewCount})</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="pt-2 border-t border-zinc-800 space-y-1.5">
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-zinc-300" />
                    <span className="font-semibold text-zinc-300">Best For:</span> {product.bestFor}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                <span className="text-[11px] text-zinc-300 font-medium">● In Stock ({product.variants.sizes.length} Sizes)</span>
                <span className="font-mono text-[10px] text-zinc-500">SKU: {product.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
