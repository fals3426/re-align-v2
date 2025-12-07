"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Preference } from "@/lib/types";
import { loadUser, savePreferences, saveJourney, loadQuizAnswers } from "@/lib/storage";
import { generatePersonalizedJourney } from "@/lib/journey";
import { scoreAnswers } from "@/data/quiz";
import { Button } from "@/components/ui/button";

export default function Personalization2() {
  const router = useRouter();
  const [pref, setPref] = useState<Preference | null>(null);

  const generateDefaultPreferences = (archetype: string): Preference => {
    const base: Preference = {
      prefersMeditation: true,
      prefersVideo: false,
      sessionLength: "medium",
      pace: "calm",
      content: { breathwork: true, meditation: true, audio: true, video: false },
      sessionsPerWeek: 5,
      timeOfDay: "morning",
      reminders: true,
      themes: ["stress_to_rest"],
      vr: false,
    };
    const map: Record<string, Partial<Preference>> = {
      visionary: { pace: "dynamic", timeOfDay: "morning", themes: ["focus"] },
      connector: { pace: "calm", timeOfDay: "evening", reminders: true, themes: ["stress_to_rest"] },
      grounded: { pace: "calm", timeOfDay: "morning", themes: ["stress_to_rest"] },
      strategist: { pace: "dynamic", timeOfDay: "morning", themes: ["focus"] },
      nurturer: { pace: "calm", timeOfDay: "evening", themes: ["stress_to_rest"] },
      explorer: { pace: "dynamic", timeOfDay: "noon", themes: ["creativity"] },
      transformer: { pace: "dynamic", timeOfDay: "noon", themes: ["creativity"] },
      dreamer: { pace: "calm", timeOfDay: "evening", themes: ["creativity"] },
    };
    return { ...base, ...(map[archetype] ?? {}) };
  };

  useEffect(() => {
    const u = loadUser();
    if (!u?.archetype) {
      router.push("/quiz/archetype2");
      return;
    }
    const defaults = generateDefaultPreferences(u.archetype);
    if (u.preference) setPref({ ...defaults, ...u.preference });
    else setPref(defaults);
  }, [router]);

  const finalPref = useMemo(() => pref, [pref]);

  const onGenerate = () => {
    const u = loadUser();
    if (!u?.archetype || !finalPref) {
      router.push("/quiz/archetype2");
      return;
    }
    const saved = loadQuizAnswers();
    const scored = saved ? scoreAnswers(saved) : null;
    const journey = generatePersonalizedJourney(u.archetype as any, scored?.topPath ?? null, finalPref);
    savePreferences(finalPref);
    saveJourney(journey);
    router.push("/congrats");
  };

  if (!finalPref) return null;

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold text-brand-ink">Personalization</h1>
        <p className="text-brand-ink/80">
          Nous avons pré-rempli vos préférences à partir de votre profil. Ajustez seulement ce qui compte vraiment pour votre rythme.
        </p>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-lg font-medium">Pace & Time</h2>
          <div className="mt-2 flex flex-wrap gap-4">
            <div>
              <div className="text-sm">Pace</div>
              <label className="mr-3">
                <input type="radio" name="pace" checked={finalPref.pace === "calm"} onChange={() => setPref({ ...finalPref, pace: "calm" })} /> Calm
              </label>
              <label>
                <input type="radio" name="pace" checked={finalPref.pace === "dynamic"} onChange={() => setPref({ ...finalPref, pace: "dynamic" })} /> Dynamic
              </label>
            </div>
            <div>
              <div className="text-sm">Time of day</div>
              {(["morning", "noon", "evening"] as const).map((t) => (
                <label key={t} className="mr-3">
                  <input type="radio" name="tod" checked={finalPref.timeOfDay === t} onChange={() => setPref({ ...finalPref, timeOfDay: t })} /> {t}
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-lg font-medium">Reminders</h2>
          <label className="mt-2 inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!!finalPref.reminders} onChange={(e) => setPref({ ...finalPref, reminders: e.target.checked })} /> Enable reminders
          </label>
        </section>

        <div className="flex justify-end">
          <Button onClick={onGenerate}>Generate my personalized journey</Button>
        </div>
      </div>
    </main>
  );
}

