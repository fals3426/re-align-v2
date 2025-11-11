"use client";
import { useRouter } from "next/navigation";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function IntroPage() {
  const router = useRouter();
  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-10">
      <div className="mx-auto grid max-w-2xl place-items-center gap-6 text-center">
        <h1 className="text-3xl font-semibold text-brand-ink">Welcome to Re.Align — find your daily balance.</h1>
        <p className="text-brand-ink/80">
          Re.Align guides you with short, tailored practices to breathe, recenter and move with clarity. In this MVP,
          take a quick archetype quiz, set your preferences, and get your personalized path.
        </p>
        <VideoPlayer className="w-full" src="/media/intro.mp4" poster="/media/intro-poster.jpg" />
        <button className="rounded-md bg-brand-sage px-4 py-2 text-white hover:bg-brand-forest" onClick={() => router.push("/quiz/archetype2")}>Start My Journey</button>
      </div>
    </main>
  );
}

