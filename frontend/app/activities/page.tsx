"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Image as ImageIcon, PlayCircle } from "lucide-react";

type Activity = {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  created_at: string;
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch("/api/activities");
        if (!response.ok) throw new Error("Failed to fetch activities");
        const data = await response.json();
        setActivities(data.activities || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 mb-10 sm:mb-12">
          Latest News
        </h1>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Loading latest activities...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-red-500 font-semibold mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#0B1E3D] font-bold underline hover:text-yellow-500"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && activities.length === 0 && (
          <div className="text-center py-20 border-t border-slate-200">
            <ImageIcon className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No activities yet</h3>
            <p className="text-slate-500 mb-6">Check back soon for updates.</p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-[#0B1E3D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#162a4d] transition-colors"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        )}

        {!isLoading && !error && activities.length > 0 && (
          <div className="divide-y divide-slate-200">
            {activities.map((activity) => (
              <article
                key={activity.id}
                className="flex flex-col sm:flex-row gap-5 sm:gap-8 py-8 first:pt-0"
              >
                {/* Thumbnail */}
                <Link
                  href={`/activities/${activity.id}`}
                  className="flex-shrink-0 w-full sm:w-64 h-40 rounded-md overflow-hidden bg-slate-100 relative group"
                >
                  {activity.image_url ? (
                    <img
                      src={activity.image_url}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : activity.video_url ? (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <PlayCircle className="w-10 h-10 text-white/80" />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-200">
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                </Link>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold tracking-wide text-slate-500 mb-2">
                    {formatDate(activity.created_at)}
                  </div>

                  <Link href={`/activities/${activity.id}`} className="inline-block group/title">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 group-hover/title:text-blue-700 transition-colors">
                      {activity.title}
                    </h2>
                    <div className="w-14 h-[3px] bg-blue-600 mt-2 mb-4"></div>
                  </Link>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {activity.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}