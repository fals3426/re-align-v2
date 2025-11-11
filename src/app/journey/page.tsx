"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { loadJourney, loadUser, saveJourney } from "@/lib/storage";
import { nextUnlockIndex } from "@/lib/journey";
import type { JourneyStep } from "@/lib/types";
import { Modal } from "@/components/Modal";
import { JourneyBubble } from "@/components/JourneyBubble";
import { MilestoneCoin } from "@/components/MilestoneCoin";
import { PathOverlay } from "@/components/PathOverlay";

export default function JourneyPage() {
  const [steps, setSteps] = useState<JourneyStep[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const j = loadJourney();
    if (j) setSteps(j.steps);
  }, []);

  const unlockIdx = useMemo(() => nextUnlockIndex(steps), [steps]);
  const user = loadUser();

  function markComplete(idx: number) {
    const copy = [...steps];
    copy[idx] = { ...copy[idx], completed: true };
    setSteps(copy);
    saveJourney({ steps: copy });
    setOpenIdx(null);
  }

  // Layout: rows of 5, alternating direction (snake path)
  const cols = 5;
  const rows: number[][] = [];
  for (let i = 0; i < steps.length; i += cols) {
    const len = Math.min(cols, steps.length - i);
    const row = Array.from({ length: len }, (_, k) => i + k);
    if (rows.length % 2 === 1) row.reverse();
    rows.push(row);
  }
  const displayOrder: number[] = rows.flat();

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-10">
      <h1 className="text-2xl font-semibold text-brand-ink">My Journey</h1>
      {!user?.archetype && (
        <p className="text-brand-ink/70">Start with the archetype quiz.</p>
      )}
      {steps.length === 0 && (
        <p className="text-brand-ink/70">No steps yet - go to personalization.</p>
      )}

      <div ref={containerRef} className="relative mt-10 space-y-32 mx-auto max-w-5xl">
        <PathOverlay containerRef={containerRef as any} deps={[steps.length]} />
        {rows.map((row, rIdx) => (
          <div
            key={rIdx}
            className={`journey-row flex items-center ${
              rIdx % 2 === 0 ? "justify-start" : "justify-end"
            } gap-8 sm:gap-10`}
          >
            {row.map((stepIdx) => {
              const s = steps[stepIdx];
              const prevDone = stepIdx > 0 ? steps[stepIdx - 1]?.completed : true;
              const unlocked = stepIdx === 0 || Boolean(prevDone);
              const isCurrent = stepIdx === unlockIdx;
              const connector: "none" = "none"; // connectors drawn by overlay
              const globalIndex = displayOrder.indexOf(stepIdx);
              const showMilestone = (globalIndex + 1) % 5 === 0 && stepIdx !== steps.length - 1;
              return (
                <Fragment key={s.id}>
                  <JourneyBubble
                    step={s}
                    unlocked={unlocked}
                    isCurrent={isCurrent}
                    connector={connector}
                    onClick={() => setOpenIdx(stepIdx)}
                  />
                  {showMilestone && <MilestoneCoin />}
                </Fragment>
              );
            })}
          </div>
        ))}
      </div>

      <Modal open={openIdx !== null} onClose={() => setOpenIdx(null)}>
        {openIdx !== null && (
          <div>
            <p>
              <strong>{steps[openIdx].title}</strong> - {steps[openIdx].minutes} min
            </p>
            <div className="mt-3 grid h-40 place-items-center rounded-md border border-slate-700 bg-slate-800 text-white">
              {steps[openIdx].type === "video"
                ? "Video player placeholder"
                : steps[openIdx].type === "audio"
                ? "Audio player placeholder"
                : steps[openIdx].type === "breathwork"
                ? "Breathwork guidance"
                : "Meditation guidance"}
            </div>
            {!steps[openIdx].completed && (
              <button
                className="mt-3 rounded-md bg-brand-sage px-3 py-2 text-white hover:bg-brand-forest"
                onClick={() => markComplete(openIdx)}
              >
                Mark as completed
              </button>
            )}
          </div>
        )}
      </Modal>
    </main>
  );
}
