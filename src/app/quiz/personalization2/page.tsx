"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Preference } from "@/lib/types";
import { loadUser, saveUser, saveJourney, loadQuizAnswers } from "@/lib/storage";
import { generatePersonalizedJourney } from "@/lib/journey";
import { scoreAnswers } from "@/data/quiz";
import { Button } from "@/components/ui/button";

export default function Personalization2() {
  const router = useRouter();
  const [pref, setPref] = useState<Preference>({
    prefersMeditation: true,
    prefersVideo: false,
    sessionLength: "medium",
    pace: "calm",
    content: { breathwork: true, meditation: true, audio: true, video: false },
    sessionsPerWeek: 5,
    timeOfDay: "morning",
    reminders: false,
    themes: ["stress_to_rest", "focus"],
    vr: false,
  });

  useEffect(() => {
    const u = loadUser();
    if (u?.preference) setPref({ ...pref, ...u.preference });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGenerate = () => {
    const u = loadUser();
    if (!u?.archetype) {
      router.push("/quiz/archetype2");
      return;
    }
    const saved = loadQuizAnswers();
    const scored = saved ? scoreAnswers(saved) : null;
    const journey = generatePersonalizedJourney(u.archetype as any, scored?.topPath ?? null, pref);
    saveUser({ ...(u ?? { id: crypto.randomUUID() }), preference: pref });
    saveJourney(journey);
    router.push("/congrats");
  };

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold text-brand-ink">Personalization</h1>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-lg font-medium">Session length</h2>
          <div className="mt-2 flex gap-3">
            {["short", "medium", "long"].map((v) => (
              <label key={v} className="flex items-center gap-2">
                <input type="radio" name="len" checked={pref.sessionLength === v} onChange={() => setPref({ ...pref, sessionLength: v as any })} />
                <span className="capitalize">{v}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-lg font-medium">Pace & time</h2>
          <div className="mt-2 flex flex-wrap gap-4">
            <div>
              <div className="text-sm">Pace</div>
              <label className="mr-3"><input type="radio" name="pace" checked={pref.pace === "calm"} onChange={() => setPref({ ...pref, pace: "calm" })} /> Calm</label>
              <label><input type="radio" name="pace" checked={pref.pace === "dynamic"} onChange={() => setPref({ ...pref, pace: "dynamic" })} /> Dynamic</label>
            </div>
            <div>
              <div className="text-sm">Time of day</div>
              {(["morning", "noon", "evening"] as const).map((t) => (
                <label key={t} className="mr-3"><input type="radio" name="tod" checked={pref.timeOfDay === t} onChange={() => setPref({ ...pref, timeOfDay: t })} /> {t}</label>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-lg font-medium">Content mix</h2>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <label><input type="checkbox" checked={!!pref.content?.breathwork} onChange={(e) => setPref({ ...pref, content: { ...(pref.content ?? {}), breathwork: e.target.checked } })} /> Breathwork</label>
            <label><input type="checkbox" checked={!!pref.content?.meditation} onChange={(e) => setPref({ ...pref, content: { ...(pref.content ?? {}), meditation: e.target.checked } })} /> Meditation</label>
            <label><input type="checkbox" checked={!!pref.content?.audio} onChange={(e) => setPref({ ...pref, content: { ...(pref.content ?? {}), audio: e.target.checked } })} /> Audio</label>
            <label><input type="checkbox" checked={!!pref.content?.video} onChange={(e) => setPref({ ...pref, content: { ...(pref.content ?? {}), video: e.target.checked } })} /> Video</label>
          </div>
        </section>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-lg font-medium">Habits</h2>
          <div className="mt-2 grid gap-3 md:grid-cols-2">
            <label>
              Sessions / week
              <input className="ml-2 w-16 border border-brand-lavender/40 bg-white px-2 py-1" type="number" min={3} max={7} value={pref.sessionsPerWeek ?? 5} onChange={(e) => setPref({ ...pref, sessionsPerWeek: Number(e.target.value) })} />
            </label>
            <label>
              Reminders
              <input className="ml-2" type="checkbox" checked={!!pref.reminders} onChange={(e) => setPref({ ...pref, reminders: e.target.checked })} />
            </label>
          </div>
        </section>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-lg font-medium">Themes</h2>
          <div className="mt-2 flex flex-wrap gap-4 text-sm">
            {[
              { id: "stress_to_rest", label: "Stress → Rest" },
              { id: "focus", label: "Focus" },
              { id: "creativity", label: "Creativity" },
            ].map((t) => {
              const set = new Set(pref.themes ?? []);
              const checked = set.has(t.id as any);
              return (
                <label key={t.id}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      if (e.target.checked) set.add(t.id as any);
                      else set.delete(t.id as any);
                      setPref({ ...pref, themes: Array.from(set) as any });
                    }}
                  />{' '}
                  {t.label}
                </label>
              );
            })}
          </div>
        </section>

        <div className="flex justify-end">
          <Button onClick={onGenerate}>Generate my personalized journey</Button>
        </div>
      </div>
    </main>
  );
}

