import Link from "next/link";
import Header from "@/components/Header";

export default function TechStackPage() {
  const categories = [
    {
      title: "Web & Cloud",
      items: ["Next.js (React)", "TypeScript", "Node.js", "Cloud Clusters"],
    },
    {
      title: "Mobile & Native",
      items: ["Flutter", "Swift/Kotlin", "Embedded C++", "Bare-metal Firmware"],
    },
    {
      title: "Design & UX",
      items: ["Vehicle UI/UX", "Machine Interfaces", "Prototyping", "Design Systems"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E3D] mb-6">Tech Stack</h1>
        <p className="text-slate-600 mb-10 max-w-3xl">
          A snapshot of the technologies and platforms we use to build reliable, high-performance solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#0B1E3D] mb-4">{category.title}</h2>
              <ul className="space-y-2 text-slate-700">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/services" className="text-[#0B1E3D] font-semibold hover:underline">
            ← Back to Services
          </Link>
        </div>
      </section>
    </div>
  );
}
