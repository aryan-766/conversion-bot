import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  ShoppingCart,
  Check,
  ChevronLeft,
  Flame,
  Sparkles,
  Zap
} from 'lucide-react';
import { SizeGuideModal } from './SizeGuideModal';

export const ProductDetailPage: React.FC<{
  product: Product;
  onBack: () => void;
}> = ({ product, onBack }) => {
  const { trackVisitorEvent, activeVisitor, setIsWidgetOpen } = useApp();
  const [selectedSize, setSelectedSize] = useState<string>(product.variants.sizes[2] || 'UK 8');
  const [selectedColor, setSelectedColor] = useState<string>(product.variants.colors[0]);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleOpenSizeGuide = () => {
    setShowSizeGuide(true);
    trackVisitorEvent('size_guide_open', `Inspected size guide on ${product.name}`, { product });
  };

  const handleViewReviews = () => {
    trackVisitorEvent('review_view', `Scrolled to verified customer reviews on ${product.name}`, { product });
  };

  const handleAddToCart = () => {
    trackVisitorEvent('cart_add', `Added ${product.name} (${selectedSize}, ${selectedColor}) to Cart`, {
      product,
      value: product.price
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleAskAI = () => {
    setIsWidgetOpen(true);
    trackVisitorEvent('chat_open', `Clicked "Ask AI about ${product.name}" on PDP`, { product });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 text-white">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Store Catalog</span>
      </button>

      {/* Product Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#13151E] border border-zinc-800 rounded-3xl p-6">
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-6 space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 h-80 sm:h-96">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-200 border border-zinc-700">
              {product.category}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[product.image, product.image, product.image].map((img, i) => (
              <div
                key={i}
                className="h-20 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="md:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Engineered Performance
                </span>
                <button
                  onClick={handleViewReviews}
                  className="flex items-center space-x-1 text-zinc-300 text-xs font-bold font-mono hover:underline"
                >
                  <Star className="h-4 w-4 fill-zinc-300" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-400 font-normal">({product.reviewCount} reviews)</span>
                </button>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                {product.name}
              </h1>
            </div>

            {/* Price & Offer */}
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-zinc-500 line-through font-mono">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-semibold text-zinc-300">
                Colorway: <span className="text-white font-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.colors.map(col => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedColor === col
                        ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white font-bold border border-zinc-500 shadow-md'
                        : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Trigger */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300">
                  Select Size (UK / India):
                </label>
                <button
                  onClick={handleOpenSizeGuide}
                  className="text-xs text-zinc-300 hover:text-white font-medium flex items-center gap-1 underline"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>Size & Fit Guide</span>
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.variants.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                      selectedSize === sz
                        ? 'bg-gradient-to-b from-zinc-600 to-zinc-700 text-white border border-zinc-500 shadow-md'
                        : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {sz.replace('UK ', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-zinc-800">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg ${
                addedAnimation
                  ? 'bg-zinc-400 text-slate-950'
                  : 'bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-400 shadow-black/40 hover:scale-[1.01]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added to Shopping Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Bag — ₹{product.price.toLocaleString()}</span>
                </>
              )}
            </button>

            <button
              onClick={handleAskAI}
              className="w-full py-2.5 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center justify-center space-x-2 border border-zinc-700 transition-all"
            >
              <Sparkles className="h-4 w-4 text-zinc-300" />
              <span>Not sure? Ask AI Sales Specialist about Fit & Cushion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 flex items-center space-x-3">
          <Truck className="h-5 w-5 text-zinc-300 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-white">Free Express Shipping</div>
            <div className="text-zinc-400">Dispatched in 24h via Delhivery Air</div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 flex items-center space-x-3">
          <RotateCcw className="h-5 w-5 text-zinc-300 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-white">7-Day Zero-Risk Return</div>
            <div className="text-zinc-400">Doorstep pickup & instant size swap</div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-[#13151E] border border-zinc-800 flex items-center space-x-3">
          <ShieldCheck className="h-5 w-5 text-zinc-300 shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-white">1-Year Sole Warranty</div>
            <div className="text-zinc-400">Guaranteed anti-separation durability</div>
          </div>
        </div>
      </div>

      {showSizeGuide && <SizeGuideModal onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
};
