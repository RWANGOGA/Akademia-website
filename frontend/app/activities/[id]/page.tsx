"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Image as ImageIcon, Video, PlayCircle } from "lucide-react";

type Activity = {
  id: number;
  title: string;
  description: string;
  image_urls: string[];
  video_urls: string[];
  created_at: string;
};

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(`/api/activities/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch activity");
        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error("Error fetching activity:", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) fetchActivity();
  }, [params.id]);

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
                <img 
                  src={activity.image_urls[0]} 
                  alt={activity.title}
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
                      <img 
                        src={url} 
                        alt={`Gallery image ${index + 2}`}
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
                        poster={activity.image_urls?.[0]} // Use first image as video thumbnail
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
        <div className="prose prose-lg prose-slate max-w-none">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
            {activity.description}
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