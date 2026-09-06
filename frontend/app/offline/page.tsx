import Link from "next/link";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-slate-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-[#0B1E3D] mb-3">
          You're Currently Offline
        </h1>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          It looks like you've lost your internet connection. Don't worry — your DYNA WISDOM app is still installed and ready. 
          Once you're back online, you'll be able to view the latest activities, post comments, and contact our team.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1E3D] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#162a4d] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
        
        <p className="text-xs text-slate-400 mt-6">
          DYNA WISDOM © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}