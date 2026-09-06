"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft, Image as ImageIcon, Video, Star, Send, User } from "lucide-react";

type Activity = {
  id: number;
  title: string;
  description: string;
  image_urls: string[];
  video_urls: string[];
  created_at: string;
};

type Comment = {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export default function ActivityDetailPage() {
  const params = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Comment & Rating State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Activity Details
        const activityRes = await fetch(`/api/activities/${params.id}`);
        if (!activityRes.ok) throw new Error("Failed to fetch activity");
        const activityData = await activityRes.json();
        setActivity(activityData);

        // Fetch Comments
        const commentsRes = await fetch(`/api/activities/${params.id}/comments`);
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData.comments || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) fetchData();
  }, [params.id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;
    
    setIsSubmittingComment(true);
    try {
      const response = await fetch(`/api/activities/${params.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: userName, rating: newRating, comment: newComment }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]); // Add new comment to the top
        setNewComment("");
        setNewRating(5);
        setUserName(""); // Optional: clear name or keep it for convenience
      } else {
        alert("Failed to post comment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B1E3D]"></div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Activity Not Found</h2>
        <Link href="/activities" className="text-[#0B1E3D] font-semibold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Activities
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-[#0B1E3D] text-white py-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/activities" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to All Activities
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(activity.created_at)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1E3D] leading-tight mb-6">
            {activity.title}
          </h1>
        </div>

        {/* Media Gallery Section */}
        {(activity.image_urls?.length > 0 || activity.video_urls?.length > 0) && (
          <div className="mb-10 space-y-8">
            {/* Primary Hero Image */}
            {activity.image_urls && activity.image_urls.length > 0 && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                <Image 
                  src={activity.image_urls[0]} 
                  alt={activity.title}
                  width={1200}
                  height={500}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Additional Images Grid */}
            {activity.image_urls && activity.image_urls.length > 1 && (
              <div>
                <h3 className="text-lg font-bold text-[#0B1E3D] mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-yellow-500" /> Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activity.image_urls.slice(1).map((url, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-sm border border-slate-100 aspect-square group cursor-pointer">
                      <Image 
                        src={url} 
                        alt={`Gallery image ${index + 2}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Section */}
            {activity.video_urls && activity.video_urls.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[#0B1E3D] mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-yellow-500" /> Videos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activity.video_urls.map((url, index) => (
                    <div key={index} className="rounded-xl overflow-hidden shadow-lg border border-slate-100 bg-black">
                      <video 
                        controls 
                        className="w-full aspect-video"
                        poster={activity.image_urls?.[0]} 
                      >
                        <source src={url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Media Placeholder */}
        {!activity.image_urls?.length && !activity.video_urls?.length && (
          <div className="mb-10 p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No media attached to this activity.</p>
          </div>
        )}

        {/* Description Content */}
        <div className="prose prose-lg prose-slate max-w-none mb-16">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
            {activity.description}
          </div>
        </div>

        {/* ================= RATING & COMMENTING SECTION ================= */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <h3 className="text-2xl font-bold text-[#0B1E3D] mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> 
            Reviews & Feedback
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    required 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe" 
                    className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-4 py-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-6 h-6 ${star <= newRating ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your Feedback</label>
              <textarea 
                required 
                rows={3} 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this project..." 
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmittingComment}
              className="inline-flex items-center gap-2 bg-[#0B1E3D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#162a4d] transition-colors disabled:opacity-50"
            >
              {isSubmittingComment ? "Posting..." : "Post Feedback"} 
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                <Star className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 font-medium">No reviews yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 font-bold text-sm">
                        {c.user_name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-900">{c.user_name}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= c.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-200"}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed ml-12">{c.comment}</p>
                  <p className="text-xs text-slate-400 mt-3 ml-12">
                    {new Date(c.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-500 mb-4">Interested in learning more about our work?</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 bg-[#0B1E3D] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#162a4d] transition-colors shadow-md"
          >
            Get in Touch <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </main>
    </div>
  );
}