"use client";
import { useRouter } from "next/navigation";
import { loadUser } from "@/lib/storage";

export default function CongratsPage() {
  const router = useRouter();
  const user = loadUser();
  const archetype = user?.archetype ?? "Unknown";
  const pref = user?.preference;

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-3xl font-semibold text-transparent">
          Congratulations! Your personalized Re.Align path is ready.
        </h1>
        <div className="mx-auto mt-6 w-full max-w-md rounded-xl border border-slate-300 bg-white p-4 text-left shadow-sm">
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            <li>
              Archetype: <strong>{archetype}</strong>
            </li>
            <li>Prefers meditation: {pref?.prefersMeditation ? "Yes" : "No"}</li>
            <li>Content: {pref?.prefersVideo ? "Video" : "Audio"}</li>
            <li>
              Daily time: {pref?.sessionLength === "short" ? "~5" : pref?.sessionLength === "medium" ? "~10" : "~15"} min
            </li>
          </ul>
        </div>
        <button
          className="mt-6 rounded-md bg-brand-sage px-4 py-2 text-white hover:bg-brand-forest"
          onClick={() => router.push("/journey")}
        >
          Access My Personalized Journey
        </button>
      </div>
    </main>
  );
}

