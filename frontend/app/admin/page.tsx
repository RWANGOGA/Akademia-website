"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, Edit2, Trash2, Calendar, Image as ImageIcon, 
  Video, LogOut, AlertCircle, CheckCircle, Loader2, ArrowLeft, X 
} from "lucide-react";

type Activity = {
  id: number;
  title: string;
  description: string;
  image_urls: string[];
  video_urls: string[];
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [existingVideoUrls, setExistingVideoUrls] = useState<string[]>([]);

  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/activities");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error(error);
    } finally { setIsLoading(false); }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (view === "list") fetchActivities();
  }, [view, fetchActivities]);

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  const resetForm = () => {
    setTitle(""); setDescription("");
    setImages([]); setVideos([]);
    setExistingImageUrls([]); setExistingVideoUrls([]);
    setEditingId(null); setStatus(null);
  };

  const handleEditClick = (activity: Activity) => {
    setEditingId(activity.id);
    setTitle(activity.title);
    setDescription(activity.description);
    setExistingImageUrls(activity.image_urls || []);
    setExistingVideoUrls(activity.video_urls || []);
    setImages([]); setVideos([]);
    setView("form");
  };

  const handleCreateClick = () => { resetForm(); setView("form"); };
  const handleCancel = () => { resetForm(); setView("list"); };

  const removePendingImage = (index: number) => setImages(prev => prev.filter((_, i) => i !== index));
  const removePendingVideo = (index: number) => setVideos(prev => prev.filter((_, i) => i !== index));
  const removeExistingImage = (index: number) => setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
  const removeExistingVideo = (index: number) => setExistingVideoUrls(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      
      // Append multiple files with the SAME key. FastAPI will parse this as a List.
      images.forEach(file => formData.append("images", file));
      videos.forEach(file => formData.append("videos", file));

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/activities/${editingId}` : "/api/activities";

      const response = await fetch(url, { method, body: formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Operation failed");
      }

      setStatus({ type: "success", message: editingId ? "Activity updated successfully!" : "Activity created successfully!" });
      setTimeout(() => { resetForm(); setView("list"); }, 1500);
    } catch (error) {
      const message = error instanceof Error ? error.message : "An error occurred.";
      setStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const response = await fetch(`/api/activities/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setActivities((prev) => prev.filter((a) => a.id !== id));
      setStatus({ type: "success", message: "Activity deleted successfully!" });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed";
      setStatus({ type: "error", message });
    } finally { setDeletingId(null); }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  // ================= RENDER: FORM VIEW =================
  if (view === "form") {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-[#0B1E3D] text-white p-4 sm:p-6 shadow-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-yellow-400">
              DYNA WISDOM <span className="text-white font-normal">| {editingId ? "Edit" : "Create"} Activity</span>
            </h1>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 font-medium">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4 sm:p-8">
          <button onClick={handleCancel} className="mb-6 text-slate-600 hover:text-[#0B1E3D] flex items-center gap-2 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[#0B1E3D] mb-6">{editingId ? "Edit Activity" : "Create New Activity"}</h2>

            {status && (
              <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${status.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                {status.type === "success" ? <CheckCircle className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                <span className="text-sm font-medium">{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Title <span className="text-red-500">*</span></label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
                <textarea required rows={6} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all resize-none" />
              </div>

              {/* Images Section */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-slate-500" /> Images (Multiple allowed)
                </label>
                
                {/* Existing Images Grid */}
                {existingImageUrls.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {existingImageUrls.map((url, idx) => (
                      <div key={idx} className="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <Image src={url} alt="Existing" fill className="object-cover" />
                        <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1">Current</span>
                      </div>
    ))}
                  </div>
                )}

                {/* New Images Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {images.map((file, idx) => (
                      <div key={idx} className="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden border border-yellow-400">
                        <Image src={URL.createObjectURL(file)} alt="Preview" fill className="object-cover" unoptimized />
                        <button type="button" onClick={() => removePendingImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-1 truncate px-1">New</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors bg-slate-50">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setImages(prev => [...prev, ...files]);
                      e.target.value = ""; // Reset input so same file can be selected again
                    }} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <p className="text-sm text-slate-600 font-medium">Click to add more images</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB each</p>
                </div>
              </div>

              {/* Videos Section */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4 text-slate-500" /> Videos (Multiple allowed)
                </label>
                
                {existingVideoUrls.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {existingVideoUrls.map((url, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-100 p-3 rounded-lg border border-slate-200">
                        <span className="text-xs text-slate-600 truncate flex-1 mr-2">Current: {url}</span>
                        <button type="button" onClick={() => removeExistingVideo(idx)} className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {videos.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {videos.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <span className="text-xs text-slate-700 truncate flex-1 mr-2 font-medium">New: {file.name}</span>
                        <button type="button" onClick={() => removePendingVideo(idx)} className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-yellow-400 transition-colors bg-slate-50">
                  <input 
                    type="file" 
                    multiple 
                    accept="video/*" 
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setVideos(prev => [...prev, ...files]);
                      e.target.value = "";
                    }} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <p className="text-sm text-slate-600 font-medium">Click to add more videos</p>
                  <p className="text-xs text-slate-400 mt-1">MP4, MOV up to 50MB each</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex gap-4">
                <button type="button" onClick={handleCancel} className="px-6 py-3 rounded-lg font-bold text-sm sm:text-base border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-sm sm:text-base transition-all bg-[#0B1E3D] text-white hover:bg-[#162a4d] shadow-lg disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                  {editingId ? "Update Activity" : "Publish Activity"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // ================= RENDER: LIST VIEW =================
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0B1E3D] text-white p-4 sm:p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-yellow-400">
            DYNA WISDOM <span className="text-white font-normal">| Admin Dashboard</span>
          </h1>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2">← View Website</Link>
            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 font-medium">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1E3D]">Manage Activities</h2>
            <p className="text-slate-500 text-sm mt-1">{activities.length} published {activities.length === 1 ? "activity" : "activities"}.</p>
          </div>
          <button onClick={handleCreateClick} className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
            <Plus className="w-5 h-5" /> Create New Activity
          </button>
        </div>

        {status && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${status.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
            {status.type === "success" ? <CheckCircle className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200">
            <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No activities yet</h3>
            <button onClick={handleCreateClick} className="mt-4 inline-flex items-center gap-2 bg-[#0B1E3D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#162a4d] transition-colors">
              <Plus className="w-5 h-5" /> Create First Activity
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-100">
              {activities.map((activity) => (
                <div key={activity.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-slate-100 rounded-lg overflow-hidden relative flex items-center justify-center">
                      {activity.image_urls && activity.image_urls.length > 0 ? (
                        <Image src={activity.image_urls[0]} alt={activity.title} fill className="object-cover" />
                      ) : (
                        <ImageIcon className="w-10 h-10 text-slate-300" />
                      )}
                      {(activity.image_urls?.length || 0) + (activity.video_urls?.length || 0) > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full">
                          +{(activity.image_urls?.length || 0) + (activity.video_urls?.length || 0) - 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#0B1E3D] text-lg mb-2 line-clamp-1">{activity.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-2 mb-3">{activity.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(activity.created_at)}</span>
                        {activity.image_urls?.length > 0 && <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><ImageIcon className="w-3 h-3" /> {activity.image_urls.length} Image(s)</span>}
                        {activity.video_urls?.length > 0 && <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"><Video className="w-3 h-3" /> {activity.video_urls.length} Video(s)</span>}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                      <button onClick={() => handleEditClick(activity)} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#0B1E3D] hover:bg-[#162a4d] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => handleDelete(activity.id, activity.title)} disabled={deletingId === activity.id} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-50">
                        {deletingId === activity.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}