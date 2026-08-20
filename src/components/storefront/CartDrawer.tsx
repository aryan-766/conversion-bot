import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    activeVisitor,
    applyCouponToCart,
    completeCheckout,
    trackVisitorEvent
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [appliedDiscountPct, setAppliedDiscountPct] = useState(0);

  if (!isOpen) return null;

  const cartItems = activeVisitor.cart || [];
  const rawSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((rawSubtotal * appliedDiscountPct) / 100);
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;

    const valid = applyCouponToCart(couponInput);
    if (valid) {
      const discount = couponInput.toUpperCase() === 'FIRSTFIT' ? 15 : 10;
      setAppliedDiscountPct(discount);
      setCouponStatus({ success: true, message: `Coupon ${couponInput.toUpperCase()} applied! (${discount}% OFF)` });
    } else {
      setCouponStatus({ success: false, message: 'Invalid or expired coupon code' });
    }
  };

  const handleCheckout = () => {
    completeCheckout();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end animate-fade-in text-white">
      <div className="bg-[#12141C] border-l border-zinc-700 w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="space-y-3 pb-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-zinc-300" />
              <h2 className="text-base font-bold text-white">Your Shopping Bag</h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                {cartItems.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-zinc-300" />
                {rawSubtotal >= 999 ? 'You unlocked Free Express Courier!' : `Add ₹${999 - rawSubtotal} more for Free Express Shipping`}
              </span>
              <span className="text-white font-bold font-mono">
                {rawSubtotal >= 999 ? 'FREE' : '₹99'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (rawSubtotal / 999) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
          {cartItems.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center text-zinc-500 text-xs space-y-2">
              <ShoppingCart className="h-8 w-8 text-zinc-600" />
              <p>Your shopping bag is empty.</p>
              <button
                onClick={onClose}
                className="text-zinc-200 font-semibold underline"
              >
                Browse Top Shoes
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#0E1017] border border-zinc-800 flex items-center justify-between space-x-3 text-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 rounded-lg object-cover bg-zinc-900 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="font-bold text-white truncate">{item.product.name}</div>
                  <div className="text-[11px] text-zinc-400">
                    Size: {item.selectedSize || 'UK 9'} • Qty: {item.quantity}
                  </div>
                  <div className="font-mono font-bold text-white text-xs">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        <div className="pt-4 border-t border-zinc-800 space-y-3">
          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Tag className="h-3.5 w-3.5 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Discount code (e.g. SAVE10)"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white uppercase placeholder:normal-case font-mono focus:outline-none focus:border-zinc-500"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold shrink-0 border border-zinc-700"
            >
              Apply
            </button>
          </form>

          {couponStatus && (
            <div
              className={`text-[11px] font-medium flex items-center gap-1 ${
                couponStatus.success ? 'text-zinc-200' : 'text-rose-400'
              }`}
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{couponStatus.message}</span>
            </div>
          )}

          {/* Pricing Breakdown */}
          <div className="space-y-1 text-xs text-zinc-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono font-semibold text-white">₹{rawSubtotal.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-zinc-200 font-medium">
                <span>Coupon Discount ({appliedDiscountPct}%)</span>
                <span className="font-mono">-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Delivery</span>
              <span className="font-mono">{rawSubtotal >= 999 ? 'FREE' : '₹99'}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
              <span>Total Payable</span>
              <span className="font-mono text-white">₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-b from-zinc-600 to-zinc-700 hover:from-zinc-500 hover:to-zinc-600 text-white border border-zinc-500 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-black/40 disabled:opacity-40"
          >
            <span>Proceed to 1-Click Order (₹{finalTotal.toLocaleString()})</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
