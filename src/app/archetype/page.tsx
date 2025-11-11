"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { loadUser, loadQuizAnswers } from "@/lib/storage";
import { scoreAnswers, type PathwayId } from "@/data/quiz";
import { getArchetypeProfile } from "@/data/archetypes";

export default function ArchetypePage() {
  const [ready, setReady] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const u = loadUser();
    setId(u?.archetype ?? null);
    setReady(true);
  }, []);

  const onPrint = useCallback(() => {
    try {
      window.print();
    } catch {}
  }, []);

  if (!ready) return null;

  const profile = getArchetypeProfile(id ?? undefined);
  const saved = loadQuizAnswers();
  const scored = saved ? scoreAnswers(saved) : null;
  const topPath = (scored?.topPath ?? null) as PathwayId | null;

  const PATHWAY_META: Record<
    PathwayId,
    {
      title: string;
      shadow: string;
      empowered: string;
      shift: string;
      anchors: { cue: string; mantra: string; practice: string };
    }
  > = {
    reactor_responder: {
      title: "Reactor → Responder",
      shadow:
        "Impulsive reactions under stress; fight/flight/freeze/fawn patterns dominate.",
      empowered: "Calm, embodied choice - presence before action.",
      shift: "From reactivity to regulated response.",
      anchors: {
        cue: "Exhale slowly (4-6s) before responding.",
        mantra: "I pause. I choose presence.",
        practice: "Three conscious pauses before key replies today.",
      },
    },
    overachiever_aligned_creator: {
      title: "Overachiever → Aligned Creator",
      shadow: "Worth tied to output; relentless doing; rest feels unsafe.",
      empowered: "Aligned creation in rhythm - clarity, sustainability, impact.",
      shift: "From forcing to creating from alignment.",
      anchors: {
        cue: "Hand on heart; 3 breaths before deciding.",
        mantra: "I create from alignment, not effort.",
        practice: "One sacred pause before major action.",
      },
    },
    pleaser_self_honoring: {
      title: "Pleaser → Self-Honoring Leader",
      shadow: "Approval-seeking; softens truth; over-gives.",
      empowered: "Truth-rooted belonging; clear boundaries.",
      shift: "From people-pleasing to self-honor.",
      anchors: {
        cue: "Stand tall; breathe into belly before saying yes/no.",
        mantra: "My truth is my belonging.",
        practice: "Honor one small boundary today.",
      },
    },
    lone_wolf_relational_genius: {
      title: "Lone Wolf → Relational Genius",
      shadow: "Isolation; carrying too much; difficult to delegate.",
      empowered: "Interdependence; co-creation; trusted collaboration.",
      shift: "From going alone to growing together.",
      anchors: {
        cue: "Touch your back: 'I'm supported.'",
        mantra: "My power grows in connection.",
        practice: "Share one authentic vulnerability with a teammate.",
      },
    },
    mask_wearer_authentic_force: {
      title: "Mask-Wearer → Authentic Force",
      shadow: "Performance over authenticity; polished persona.",
      empowered: "Embodied truth as power; clean speech and action.",
      shift: "From hiding to honest presence.",
      anchors: {
        cue: "Hand on throat; breathe into your voice.",
        mantra: "My authenticity is my power.",
        practice: "Share one unpolished truth today.",
      },
    },
  };

  if (!profile) {
    return (
      <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-brand-ink">No archetype found - please start with the quiz.</p>
          <Link href="/quiz/archetype2" className="text-brand-forest underline">
            Go to quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-6 py-10">
      {/* Print watermark */}
      <div className="print-only print-watermark">Re.Align - Archetype</div>

      <div className="print-container mx-auto max-w-3xl space-y-8 text-brand-ink">
        {/* Print header */}
        <div className="print-only mb-4 flex items-center gap-3">
          <img src="/brand/logo.png" alt="Re.Align" width={40} height={40} />
          <div>
            <div className="text-sm">Re.Align Archetype Report</div>
            <div className="text-xs text-brand-ink/70">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <header className="text-center space-y-2">
          <p className="text-sm text-brand-ink/70">Archetype Report</p>
          <h1 className="text-4xl font-extrabold tracking-tight">{profile.name}</h1>
          <p className="text-brand-ink/80">{profile.welcome}</p>
        </header>

        {(() => {
          const meta = topPath ? PATHWAY_META[topPath] : null;
          if (!meta) return null;
          return (
            <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Shadow → Empowered Pathway</h2>
              <p className="text-brand-ink/80 mb-2">{meta.title}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Shadow:</strong> {meta.shadow}
                </li>
                <li>
                  <strong>Empowered:</strong> {meta.empowered}
                </li>
                <li>
                  <strong>Shift:</strong> {meta.shift}
                </li>
              </ul>
              <div className="mt-3 grid gap-2 md:grid-cols-3">
                <div>
                  <div className="text-sm font-semibold">Somatic Cue</div>
                  <div className="text-sm text-brand-ink/80">{meta.anchors.cue}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Mantra</div>
                  <div className="text-sm text-brand-ink/80">{meta.anchors.mantra}</div>
                </div>
                <div>
                  <div className="text-sm font-semibold">Micro-Practice</div>
                  <div className="text-sm text-brand-ink/80">{meta.anchors.practice}</div>
                </div>
              </div>
            </section>
          );
        })()}

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Your Nature Archetype</h2>
          <p className="mb-3">{profile.nature.essence}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Gifts:</strong> {profile.nature.gifts.join(", ")}
            </li>
            <li>
              <strong>Shadow Risks:</strong> {profile.nature.shadowRisks.join(", ")}
            </li>
            <li>
              <strong>Ecosystem Role:</strong> {profile.nature.ecosystemRole}
            </li>
          </ul>
        </section>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Shadow → Empowered Path</h2>
          <p className="mb-2">
            <strong>Shadow Pattern ({profile.path.shadowName}):</strong> {profile.path.shadowPattern}
          </p>
          <p className="mb-2">
            <strong>Empowered Shift ({profile.path.empoweredName}):</strong> {profile.path.empoweredShift}
          </p>
          <p className="text-brand-ink/90">
            <strong>Growth Invitation:</strong> {profile.path.growthInvitation}
          </p>
        </section>

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Combined Identity</h2>
          <p>{profile.combinedIdentity}</p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">VR Journey Unlock</h3>
            <p className="text-sm text-brand-ink/80">{profile.nextSteps.vrJourney}</p>
          </div>
          <div className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">Daily AI Guidance</h3>
            <p className="text-sm text-brand-ink/80">{profile.nextSteps.dailyAiGuidance}</p>
          </div>
          <div className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
            <h3 className="font-semibold mb-1">Cohort Role</h3>
            <p className="text-sm text-brand-ink/80">{profile.nextSteps.cohortRole}</p>
          </div>
        </section>

        <div className="no-print flex flex-wrap items-center justify-between gap-3">
          <Link href="/quiz/archetype2" className="text-brand-forest underline">
            Retake quiz
          </Link>
          <Link href="/quiz/personalization2" className="rounded-xl bg-brand-sage px-4 py-2 text-white hover:bg-brand-forest">
            Continue → Personalization
          </Link>
          <button onClick={onPrint} className="rounded-xl border border-brand-sage px-4 py-2 text-brand-sage hover:bg-brand-sage/10">
            Download PDF
          </button>
        </div>
      </div>
    </main>
  );
}
