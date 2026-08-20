import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, ShoppingCart, Check, ExternalLink } from 'lucide-react';

export const ProductCardItem: React.FC<{ product: Product }> = ({ product }) => {
  const { trackVisitorEvent } = useApp();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackVisitorEvent('cart_add', `Added ${product.name} directly via AI Recommendation Card`, {
      product,
      value: product.price
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleView = () => {
    trackVisitorEvent('product_view', `Clicked "View Product" from AI Card for ${product.name}`, {
      page: `/products/${product.id}`,
      product
    });
  };

  return (
    <div
      onClick={handleView}
      className="p-3 rounded-2xl bg-[#13151E] border border-zinc-700/80 hover:border-zinc-500 transition-all cursor-pointer space-y-2.5 max-w-xs text-xs shadow-md group text-white"
    >
      <div className="relative h-28 rounded-xl overflow-hidden bg-zinc-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <span className="absolute top-2 left-2 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur-md text-zinc-200 border border-zinc-700">
          {product.category}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-white truncate max-w-[180px]">{product.name}</h4>
          <div className="flex items-center space-x-1 text-zinc-300 font-mono font-bold text-[11px]">
            <Star className="h-3 w-3 fill-zinc-300" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="font-mono font-bold text-white text-sm">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-mono text-zinc-500 text-[10px] line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1.5 pt-1">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center space-x-1 transition-all ${
            added
              ? 'bg-zinc-400 text-slate-950'
              : 'bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 shadow-sm'
          }`}
        >
          {added ? (
            <>
              <Check className="h-3 w-3" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-3 w-3" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
