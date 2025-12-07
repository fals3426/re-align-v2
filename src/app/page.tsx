import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20">
      {/* Hero */}
      <section className="px-6 py-24 flex flex-col items-center justify-center">
        <Logo size={96} className="mb-4" />
        <h1 className="text-6xl font-extrabold text-brand-forest text-center mb-2 tracking-tight">Re.Align</h1>
        <p className="text-3xl font-semibold tracking-tight text-brand-forest text-center mb-6">
          Simple rituals for clarity and energy
        </p>
        <p className="text-xl text-brand-ink/80 max-w-2xl mx-auto text-center leading-relaxed mb-10">
          A calm space to breathe, slow down and recenter. Create short, tailored rituals to strengthen inner balance.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/auth" className="bg-brand-sage hover:bg-brand-sage/90 text-white px-6 py-3 rounded-xl shadow-lg">Start the Profile Test</Link>
          <Link href="/intro" className="border border-brand-sage text-brand-sage px-6 py-3 rounded-xl hover:bg-brand-sage/10">Learn more</Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto px-6">
        <div className="bg-white/90 backdrop-blur-md shadow-md border border-brand-lavender/40 hover:shadow-xl rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-lg font-semibold text-brand-ink mb-2">Personalized path</h3>
          <p className="text-gray-500 leading-relaxed">Discover your archetype and get a path tailored to your rhythm and needs.</p>
        </div>
        <div className="bg-white/90 backdrop-blur-md shadow-md border border-brand-lavender/40 hover:shadow-xl rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-lg font-semibold text-brand-ink mb-2">Quick rituals</h3>
          <p className="text-gray-500 leading-relaxed">Short sessions (5–15 minutes) to breathe, recenter and strengthen balance.</p>
        </div>
        <div className="bg-white/90 backdrop-blur-md shadow-md border border-brand-lavender/40 hover:shadow-xl rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.02]">
          <h3 className="text-lg font-semibold text-brand-ink mb-2">Conscious progress</h3>
          <p className="text-gray-500 leading-relaxed">Move at your pace with a clear visual path and inspiring practices. Your path: <Link href="/journey" className="text-brand-sage hover:underline">/journey</Link></p>
        </div>
      </section>

      {/* Footer light */}
      <p className="text-gray-400 text-sm mt-16 text-center">© 2025 Re.Align — Prototype MVP</p>
    </main>
  );
}
