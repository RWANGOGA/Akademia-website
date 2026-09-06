"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Image as ImageIcon, Video, ArrowRight } from "lucide-react";

type Activity = {
  id: number;
  title: string;
  description: string;
  image_urls: string[];
  video_urls: string[];
  created_at: string;
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch("/api/activities");
        if (!response.ok) throw new Error("Failed to fetch activities");
        const data = await response.json();
        setActivities(data.activities || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-[#0B1E3D] text-white py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Our Activities
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover the latest events, partnerships, and milestones from the DYNA WISDOM and Akademia teams.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B1E3D]"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No activities yet</h3>
            <p className="text-slate-500">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => {
              const totalMedia = (activity.image_urls?.length || 0) + (activity.video_urls?.length || 0);
              const hasMultipleMedia = totalMedia > 1;

              return (
                <Link 
                  href={`/activities/${activity.id}`} 
                  key={activity.id}
                  className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    {activity.image_urls && activity.image_urls.length > 0 ? (
                      <Image 
                        src={activity.image_urls[0]} 
                        alt={activity.title}
                        width={640}
                        height={360}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-slate-300" />
                      </div>
                    )}
                    
                    {/* Media Count Badge */}
                    {hasMultipleMedia && (
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        {activity.video_urls?.length > 0 ? <Video className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                        <span>+{totalMedia - 1}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(activity.created_at)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0B1E3D] mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                      {activity.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                      {activity.description}
                    </p>

                    <div className="flex items-center text-[#0B1E3D] font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="w-4 h-4 ml-1.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}