import { useState, useEffect, FormEvent } from 'react';
import { Star, MessageSquare, Plus, CheckCircle, Flame } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS } from '../data';

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceCompleted, setServiceCompleted] = useState('Signature Downtown Cut & Blowout');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Load reviews from localStorage or fallback to default REVIEWS
  useEffect(() => {
    const saved = localStorage.getItem('salon_reviews');
    if (saved) {
      try {
        setReviewsList(JSON.parse(saved));
      } catch (e) {
        setReviewsList(REVIEWS);
      }
    } else {
      setReviewsList(REVIEWS);
    }
  }, []);

  const handleLevelReview = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !comment) return;

    const newReview: Review = {
      id: `REV-${Date.now()}`,
      reviewerName,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      serviceCompleted,
      verified: true
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('salon_reviews', JSON.stringify(updated));

    // Reset Form state
    setReviewerName('');
    setRating(5);
    setComment('');
    setSubmittedMessage('Thank you so much! Your review has been published instantly on our downtown page.');
    setShowAddForm(false);

    // auto clear notice
    setTimeout(() => {
      setSubmittedMessage(null);
    }, 6000);
  };

  // Calculate scores
  const totalReviewsCount = reviewsList.length;
  const averageScore = totalReviewsCount > 0 
    ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1)
    : '5.0';

  // Count specific stars
  const fiveStarsCount = reviewsList.filter(r => r.rating === 5).length;
  const fourStarsCount = reviewsList.filter(r => r.rating === 4).length;
  const otherStarsCount = reviewsList.filter(r => r.rating < 4).length;

  return (
    <div id="reviews-section" className="w-full bg-[#F8F7F2] py-20 px-4 md:px-8 border-b border-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Core Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
              Established 2018 — Guest Feedback
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight mt-3">
              Highly Rated Services
            </h2>
            <p className="text-neutral-700 font-serif italic text-sm md:text-base mt-2">
              Discover why over 350+ downtown residents rank our salon stations as their absolute style home. We treat hair cutting as an architectural art form.
            </p>
          </div>

          <button
            id="reviews-btn-toggle-form"
            onClick={() => {
              setShowAddForm(!showAddForm);
              setSubmittedMessage(null);
            }}
            className="self-start md:self-end px-5 py-3.5 bg-black hover:bg-neutral-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-none transition flex items-center gap-1.5 border border-black"
          >
            <Plus className="w-4 h-4" /> Share Your Experience →
          </button>
        </div>

        {/* Dynamic score dashboard banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-white border border-black rounded-none p-8 items-center">
          
          {/* Average scoring card */}
          <div className="text-center md:border-r border-black/15 py-4">
            <span className="text-6xl font-serif font-extrabold text-neutral-900 leading-none">
              {averageScore}
            </span>
            <div className="flex items-center justify-center gap-0.5 mt-3 mb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${Math.round(parseFloat(averageScore)) >= s ? 'fill-black text-black' : 'text-neutral-300'}`}
                />
              ))}
            </div>
            <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider mt-2">
              Based on {totalReviewsCount} verified recent visits
            </p>
          </div>

          {/* Bar breakdowns */}
          <div className="space-y-3.5 md:col-span-2">
            <div>
              <div className="flex justify-between text-[10px] font-bold font-mono text-neutral-600 uppercase tracking-widest mb-1.5">
                <span>5 Stars (Exceptional)</span>
                <span>{fiveStarsCount}</span>
              </div>
              <div className="w-full bg-neutral-100 h-2.5 rounded-none overflow-hidden border border-black/10">
                <div
                  className="bg-black h-full rounded-none transition-all duration-500"
                  style={{ width: `${(fiveStarsCount / (totalReviewsCount || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold font-mono text-neutral-600 uppercase tracking-widest mb-1.5">
                <span>4 Stars (Very Good)</span>
                <span>{fourStarsCount}</span>
              </div>
              <div className="w-full bg-neutral-150 h-2.5 rounded-none overflow-hidden border border-black/10">
                <div
                  className="bg-neutral-700 h-full rounded-none transition-all duration-500"
                  style={{ width: `${(fourStarsCount / (totalReviewsCount || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold font-mono text-neutral-600 uppercase tracking-widest mb-1.5">
                <span>Other Ratings</span>
                <span>{otherStarsCount}</span>
              </div>
              <div className="w-full bg-neutral-150 h-2.5 rounded-none overflow-hidden border border-black/10">
                <div
                  className="bg-neutral-400 h-full rounded-none transition-all duration-500"
                  style={{ width: `${(otherStarsCount / (totalReviewsCount || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notice for feedback submitting */}
        {submittedMessage && (
          <div className="mb-8 p-4 bg-[#F8F7F2] rounded-none border border-black text-neutral-900 text-xs font-mono uppercase tracking-widest flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-black shrink-0" />
            <span>{submittedMessage}</span>
          </div>
        )}

        {/* Review Leaving Form */}
        {showAddForm && (
          <div className="mb-10 p-6 bg-white border border-black rounded-none animate-fadeIn">
            <h3 className="text-lg font-serif italic text-neutral-900 mb-6 flex items-center gap-2 border-b border-black pb-3">
              <MessageSquare className="w-4 h-4 text-black" /> Share Your Local Hair Experience
            </h3>
            
            <form onSubmit={handleLevelReview} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-widest mb-1.5">Your Name</label>
                  <input
                    id="review-input-name"
                    type="text"
                    required
                    placeholder="E.g. Sarah J."
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full p-2.5 text-sm bg-[#F8F7F2] border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-widest mb-1.5">Service Completed</label>
                  <select
                    id="review-input-service"
                    value={serviceCompleted}
                    onChange={(e) => setServiceCompleted(e.target.value)}
                    className="w-full p-2.5 text-sm bg-white border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="Signature Downtown Cut & Blowout">Signature Downtown Cut & Blowout</option>
                    <option value="Premium Art Balayage & Gloss">Premium Art Balayage & Gloss</option>
                    <option value="Classic Downtown Fade & Hot Towel">Classic Downtown Fade & Hot Towel</option>
                    <option value="Executive Beardsmanship Cut">Executive Beardsmanship Cut</option>
                    <option value="Red Carpet Volume Blowout">Red Carpet Volume Blowout</option>
                    <option value="Scalp Detox Treatment">Scalp Detox Treatment</option>
                  </select>
                </div>
              </div>

              {/* Star selector */}
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-widest mb-1.5">Quality Star Rating</label>
                <div className="flex items-center gap-1.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      id={`star-btn-${star}`}
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-black focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${rating >= star ? 'fill-black text-black' : 'text-neutral-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-neutral-500 ml-2 font-bold uppercase tracking-wider">({rating} of 5 Stars)</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-widest mb-1.5">Feedback Comment</label>
                <textarea
                  id="review-input-comment"
                  required
                  rows={3}
                  placeholder="Share details of your stylist session, styling highlights, or reception hospitality..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2.5 text-sm bg-[#F8F7F2] border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex gap-2">
                <button
                  id="review-submit-btn"
                  type="submit"
                  className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-none text-[9px] font-mono font-bold uppercase tracking-widest transition border border-black"
                >
                  Publish Now →
                </button>
                <button
                  id="review-cancel-btn"
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-none text-[9px] font-mono font-bold uppercase tracking-widest transition border border-neutral-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              id={`review-card-${rev.id}`}
              key={rev.id}
              className="p-6 rounded-none border border-black bg-white flex flex-col justify-between hover:bg-neutral-50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-none border border-black bg-black flex items-center justify-center text-[#F8F7F2] text-xs font-mono font-bold uppercase">
                      {rev.reviewerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-neutral-900 leading-tight">
                        {rev.reviewerName}
                      </h4>
                      <span className="text-[9px] text-[#1A1A1A]/50 font-mono uppercase tracking-widest block mt-0.5">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars indicators */}
                  <div className="flex items-center gap-0.5 shrink-0 bg-[#F8F7F2] px-2 py-1 rounded-none border border-black">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${rev.rating >= s ? 'fill-black text-black' : 'text-neutral-350'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-neutral-700 font-serif italic text-sm leading-relaxed mt-4">
                  "{rev.comment}"
                </p>
              </div>

              {rev.serviceCompleted && (
                <div className="mt-5 pt-3 border-t border-black/10 flex items-center gap-1.5 text-[9px] font-mono font-bold text-black uppercase bg-neutral-100 px-2.5 py-1 rounded-none self-start border border-black/20">
                  <Flame className="w-3 h-3 text-black" />
                  <span>{rev.serviceCompleted}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
