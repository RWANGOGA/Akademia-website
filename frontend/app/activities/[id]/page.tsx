"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Image as ImageIcon } from "lucide-react";

type Activity = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  created_at: string;
};

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(`/api/activities/${params.id}`);
        if (!response.ok) throw new Error("Activity not found");
        const data = await response.json();
        setActivity(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) fetchActivity();
  }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Loading activity...</p>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
        <p className="text-red-500 font-semibold mb-4">{error || "Activity not found"}</p>
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 bg-[#0B1E3D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#162a4d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Activities
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Activities
        </button>

        {/* Title first */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 mb-2 leading-tight">
          {activity.title}
        </h1>
        <div className="w-16 h-1 bg-yellow-400 mb-4"></div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
          <Calendar className="w-4 h-4" />
          {formatDate(activity.created_at)}
        </div>

        {/* Media block */}
        <div className="mb-8 rounded-lg overflow-hidden bg-slate-100">
          {activity.video_url ? (
            <video
              src={activity.video_url}
              controls
              className="w-full max-h-[480px] bg-black"
            />
          ) : activity.image_url ? (
            <img
              src={activity.image_url}
              alt={activity.title}
              className="w-full max-h-[480px] object-cover"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-slate-200">
              <ImageIcon className="w-14 h-14 text-slate-400" />
            </div>
          )}
        </div>

        {/* Secondary image if both video + image exist */}
        {activity.video_url && activity.image_url && (
          <img
            src={activity.image_url}
            alt={activity.title}
            className="w-full rounded-lg mb-8 max-h-[300px] object-cover"
          />
        )}

        {/* Body */}
        <p className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
          {activity.description}
        </p>
      </main>
    </div>
  );
}