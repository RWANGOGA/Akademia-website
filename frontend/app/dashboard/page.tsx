import Link from "next/link";
import Header from "@/components/Header";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E3D] mb-4">Dashboard</h1>
        <p className="text-slate-600 mb-8">
          This dashboard space is reserved for future account and product management features.
        </p>
        <Link href="/products" className="text-[#0B1E3D] font-semibold hover:underline">
          ← Back to Products
        </Link>
      </section>
    </div>
  );
}
