"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, FileText, Image as ImageIcon, Video, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      
      if (image) formData.append("image", image);
      if (video) formData.append("video", video);

      // FIXED: Use relative path so Nginx can route it to the backend in Docker
      const response = await fetch("/api/activities", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create activity");
      }

      // Success! Reset the form
      setTitle("");
      setDescription("");
      setImage(null);
      setVideo(null);
      setStatus({ type: "success", message: "Activity published successfully!" });
      
      // Clear success message after 4 seconds
      setTimeout(() => setStatus(null), 4000);

    } catch (error: any) {
      setStatus({ type: "error", message: error.message || "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simple Header */}
      <header className="bg-[#0B1E3D] text-white p-4 sm:p-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-yellow-400">
            DYNA WISDOM <span className="text-white font-normal">| Admin Dashboard</span>
          </h1>
          <Link 
            href="/" 
            className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back to Website
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0B1E3D] mb-2">Create New Activity</h2>
            <p className="text-slate-500 text-sm">
              Fill in the details below to publish a new company activity, event, or update to the website.
            </p>
          </div>

          {/* Status Messages */}
          {status && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              status.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {status.type === "success" ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Activity Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., New AI Dojo Partnership Announced"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the details of the activity here..."
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* File Uploads Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-slate-500" />
                  Cover Image (Optional)
                </label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors bg-slate-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">
                    {image ? image.name : "Click to upload image"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4 text-slate-500" />
                  Video (Optional)
                </label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors bg-slate-50">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">
                    {video ? video.name : "Click to upload video"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">MP4, MOV up to 50MB</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-sm sm:text-base transition-all ${
                  isLoading 
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                    : "bg-[#0B1E3D] text-white hover:bg-[#162a4d] shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Publish Activity
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}