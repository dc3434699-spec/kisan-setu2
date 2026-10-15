import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { X, Star, MapPin, QrCode, Phone, Plus, Minus, ShoppingBag, ShieldCheck, Heart, Send } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, openTraceability, reviews, addReview } = useStore();
  const { currentUser } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return null;

  const productReviews = reviews.filter(r => r.productId === product.id);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addReview({
      productId: product.id,
      consumerName: currentUser?.name || 'Verified Consumer',
      rating: newRating,
      comment: newComment,
      verifiedBuyer: true
    });

    setNewComment('');
    setShowReviewForm(false);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="relative bg-white border-b border-[#E5E0D5]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              onError={e => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                  {product.organic ? '🌿 100% Certified Organic' : 'Direct Farm Produce'}
                </span>
                {product.promotionalBadge && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                    {product.promotionalBadge}
                  </span>
                )}
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white">
                  {product.batchId}
                </span>
              </div>
              <h3 className="font-serif text-2xl font-bold">{product.name}</h3>
              <p className="text-xs text-emerald-300 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" /> {product.farmerLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Price, Stock & Stepper */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E5E0D5] p-4 rounded-2xl shadow-2xs">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-[#1B5E3B]">₹{product.pricePerUnit}</span>
                {product.originalPrice && product.originalPrice > product.pricePerUnit && (
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-xs text-gray-500 font-medium">/ {product.unit}</span>
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {product.promotionalBadge || `${product.discountPercent}% OFF`}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                ✓ Fair Price Direct to Farmer (+42% higher payout than mandi)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#FAF9F6] border border-[#E5E0D5] rounded-xl px-2.5 py-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 rounded-lg hover:bg-white text-gray-600"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 rounded-lg hover:bg-white text-gray-600"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-5 py-2.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (₹{product.pricePerUnit * quantity})</span>
              </button>
            </div>
          </div>

          {/* Description & Nutrition Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#2D3A26] uppercase tracking-wider">About This Harvest</h4>
            <p className="text-xs text-gray-700 leading-relaxed bg-white border border-[#E5E0D5] p-3.5 rounded-2xl">
              {product.description}
            </p>

            {product.nutritionalHighlights && (
              <div className="flex flex-wrap gap-2">
                {product.nutritionalHighlights.map((n, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    ✓ {n}
                  </span>
                ))}
                {product.shelfLife && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                    ⏱ Shelf Life: {product.shelfLife}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Farmer Spotlight Card */}
          <div className="bg-white border border-[#E5E0D5] p-4 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Producer Farm:</span>
              <h5 className="text-xs font-bold text-[#1B3B22]">{product.farmName}</h5>
              <p className="text-[11px] text-gray-600">{product.farmerName}</p>
            </div>
            <button
              onClick={() => {
                onClose();
                openTraceability(product.batchId);
              }}
              className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#1B5E3B] border border-emerald-200 text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
            >
              <QrCode className="w-4 h-4" />
              <span>Trace Batch Origin</span>
            </button>
          </div>

          {/* Reviews Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#2D3A26] uppercase tracking-wider flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Customer Feedback ({productReviews.length})</span>
              </h4>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs text-[#1B5E3B] font-bold hover:underline"
              >
                {showReviewForm ? 'Cancel' : '+ Write a Review'}
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form onSubmit={handleAddReview} className="bg-white border border-[#E5E0D5] p-3.5 rounded-2xl space-y-2.5 animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2D3A26]">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-0.5"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  placeholder="Share your experience regarding freshness, taste, and packaging..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#1B5E3B] text-white text-xs font-bold hover:bg-[#2D5A27] transition-colors flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Review
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-2">
              {productReviews.length === 0 ? (
                <p className="text-xs text-gray-500 italic bg-white p-3 rounded-xl border border-[#E5E0D5]">
                  No reviews yet for this harvest. Be the first to try and review!
                </p>
              ) : (
                productReviews.map(r => (
                  <div key={r.id} className="bg-white border border-[#E5E0D5] p-3 rounded-2xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#2D3A26]">{r.consumerName}</span>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{r.comment}</p>
                    <span className="text-[10px] text-gray-400 block">{r.date} • Verified Purchase</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
