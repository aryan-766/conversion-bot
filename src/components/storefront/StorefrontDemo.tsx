import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  ShoppingBag,
  Star,
  Flame,
  Search,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';
import { ProductDetailPage } from './ProductDetailPage';
import { CartDrawer } from './CartDrawer';
import { SalesWidget } from '../widget/SalesWidget';

export const StorefrontDemo: React.FC = () => {
  const {
    products,
    activeVisitor,
    trackVisitorEvent,
    businessProfile,
    setIsWidgetOpen
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Exit intent detector
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15) {
        trackVisitorEvent('exit_intent', 'Cursor moved rapidly toward tab close / URL bar');
      }
    };
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => window.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const categories = ['All', 'Running Shoes', 'Daily Sneakers', 'Outdoor & Trekking', 'Slip-On & Casual', 'Athletic Wear'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 5)));

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    trackVisitorEvent('product_view', `Viewed ${product.name} PDP`, {
      page: `/products/${product.id}`,
      product
    });
  };

  const totalCartCount = activeVisitor.cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 flex flex-col relative">
      {/* Simulation Telemetry HUD Bar */}
      <div className="bg-slate-900/95 border-b border-emerald-500/30 px-4 py-2 flex flex-wrap items-center justify-between text-xs sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live D2C Storefront Simulation</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Visitor ID: <code className="text-white font-mono">{activeVisitor.id}</code>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] text-slate-400">Live Intent:</span>
            <span
              className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                activeVisitor.intentScore >= 75
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : activeVisitor.intentScore >= 50
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {activeVisitor.intentScore} pts ({activeVisitor.intentLevel}) 🔥
            </span>
          </div>

          <div className="text-[11px] text-slate-400 font-mono hidden md:inline">
            Dwell: {Math.floor(activeVisitor.sessionDurationSec / 60)}m {activeVisitor.sessionDurationSec % 60}s
          </div>
        </div>
      </div>

      {/* Store Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-[37px] z-10 backdrop-blur-md">
        <div
          onClick={() => setSelectedProduct(null)}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md">
            A
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              {businessProfile.name}
            </span>
            <span className="text-[10px] text-slate-500 block leading-tight">Engineered Footwear</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsWidgetOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-emerald-400 border border-slate-700/80 transition-all hover:scale-105"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Ask AI Assistant</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-md animate-bounce-subtle">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">
        {selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <div className="space-y-8 animate-fade-in pb-12">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-950 border border-emerald-500/20 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Carbon Marathon Edition v4
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Defy Gravity with <span className="text-emerald-400">Nitrogen Foam</span> Precision.
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Engineered with 85% kinetic energy return, wide ergonomic toe contours, and 7-day risk-free doorstep exchange.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleProductClick(products[0])}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/30 transition-all flex items-center space-x-1.5"
                  >
                    <span>Shop CloudStrider Pro</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsWidgetOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
                  >
                    Find My Running Match
                  </button>
                </div>
              </div>

              <div className="w-full md:w-80 h-52 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative">
                <img
                  src={products[0].image}
                  alt="Hero Product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
                  ₹2,799 <span className="text-slate-500 text-[10px] line-through">₹4,499</span>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Performance Footwear & Apparel</h2>
                  <p className="text-xs text-slate-400">Select an item to inspect sizing and trigger intent telemetry</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-emerald-950/30"
                >
                  <div>
                    <div className="relative h-48 bg-slate-950 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1 text-amber-400 text-xs font-bold font-mono">
                          <Star className="h-3.5 w-3.5 fill-amber-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="pt-2 text-[11px] text-slate-500">
                        Best For: <span className="text-slate-300 font-medium">{product.bestFor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                      <div className="font-mono font-bold text-white text-base">
                        ₹{product.price.toLocaleString()}
                        {product.originalPrice && (
                          <span className="text-xs text-slate-500 line-through font-normal ml-1.5">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Details</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Standalone Sales Widget */}
      <SalesWidget />
    </div>
  );
};
