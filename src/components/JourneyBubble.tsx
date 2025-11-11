"use client";
import type { JourneyStep } from "@/lib/types";
import { Headphones, Play, Wind, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Connector = "none" | "right" | "left" | "down-right" | "down-left";

function StepIcon({ type }: { type: JourneyStep["type"] }) {
  const cls = "h-6 w-6 drop-shadow-sm text-white/95";
  if (type === "audio") return <Headphones className={cls} />;
  if (type === "video") return <Play className={cls} />;
  if (type === "breathwork") return <Wind className={cls} />;
  return <Moon className={cls} />; // meditation
}

export function JourneyBubble({
  step,
  unlocked,
  isCurrent,
  onClick,
  connector = "none",
}: {
  step: JourneyStep;
  unlocked: boolean;
  isCurrent: boolean;
  connector?: Connector;
  onClick: () => void;
}) {
  const disabled = !unlocked;

  const baseGrad = step.completed
    ? "from-brand-forest to-brand-sage"
    : unlocked
    ? "from-brand-sage to-brand-forest"
    : "from-slate-700 to-slate-800";

  return (
    <div className="relative journey-node">
      {/* subtle pulse for current, unlocked step */}
      {isCurrent && !step.completed && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 block h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-brand-sage/60 animate-ping" />
      )}
      <button
        disabled={disabled}
        onClick={onClick}
        title={`${step.title} • ${step.minutes} min`}
        className={cn(
          "relative flex h-28 w-28 items-center justify-center rounded-full border border-black/20 bg-gradient-to-b text-slate-100",
          "shadow-[inset_0_6px_0_rgba(255,255,255,0.20),0_8px_18px_rgba(0,0,0,0.25)]",
          baseGrad,
          unlocked && !step.completed ? "transition-transform hover:scale-[1.03] active:scale-[0.99]" : "",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
          isCurrent && !step.completed ? "ring-4 ring-brand-sun/70" : ""
        )}
      >
        <span className="pointer-events-none absolute -top-2 left-1/2 h-8 w-16 -translate-x-1/2 rounded-full bg-white/25 blur-sm" />
        <div className="grid place-items-center text-center">
          <StepIcon type={step.type} />
          <strong className="mt-1 px-2 text-sm leading-snug drop-shadow">{step.title}</strong>
          <span className="text-xs opacity-90 drop-shadow">{step.minutes} min</span>
        </div>
        {step.completed && (
          <svg
            viewBox="0 0 24 24"
            className="absolute bottom-1 right-1 h-5 w-5 text-brand-gold drop-shadow"
            fill="currentColor"
          >
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.2 13.2l-3-3 1.4-1.4 1.6 1.6 3.8-3.8 1.4 1.4-5.2 5.2z" />
          </svg>
        )}
      </button>

      {/* Optional per-bubble connector (overlay usually draws the path) */}
      {connector !== "none" && (
        <span
          aria-hidden
          className={
            "absolute block rounded-full bg-brand-forest/40" +
            (connector === "right"
              ? " left-[112px] top-1/2 h-1.5 w-24 -translate-y-1/2"
              : connector === "left"
              ? " right-[112px] top-1/2 h-1.5 w-24 -translate-y-1/2"
              : connector === "down-right"
              ? " left-1/2 top-[112px] h-16 w-1.5 -translate-x-1/2 after:absolute after:-bottom-1 after:left-1/2 after:block after:h-1.5 after:w-16 after:-translate-x-0.5 after:rotate-45 after:transform after:rounded-full after:bg-brand-forest/40"
              : " left-1/2 top-[112px] h-16 w-1.5 -translate-x-1/2 after:absolute after:-bottom-1 after:right-1/2 after:block after:h-1.5 after:w-16 after:translate-x-0.5 after:-rotate-45 after:transform after:rounded-full after:bg-brand-forest/40")
          }
        />
      )}

      {/* Mastery stars */}
      <div className="mt-2 flex justify-center gap-1">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={cn(
              "h-4 w-4 transition-transform",
              step.completed ? "text-brand-gold scale-110" : "text-slate-400"
            )}
            fill="currentColor"
          >
            <path d="M10 1.5l2.6 5.2 5.7.8-4.1 4 1 5.7L10 14.8 4.8 17.2l1-5.7-4.1-4 5.7-.8L10 1.5z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

