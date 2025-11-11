"use client";
import { cn } from "@/lib/utils";

export function MilestoneCoin({ label = "", small = false }: { label?: string; small?: boolean }) {
  return (
    <div
      className={cn(
        "journey-node relative grid place-items-center rounded-full",
        small ? "h-20 w-20" : "h-24 w-24"
      )}
      title={label || "Milestone"}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id="goldGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FEE575" />
            <stop offset="100%" stopColor="#DAB74F" />
          </linearGradient>
          <filter id="inner" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
            <feOffset in="blur" dx="0" dy="1" result="off" />
            <feMerge>
              <feMergeNode in="off" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#goldGrad)" stroke="#C6A23E" strokeWidth="2" filter="url(#inner)" />
        <path d="M50 24l7.2 14.6 16.1 2.4-11.7 11.4 2.8 16-14.4-7.6-14.4 7.6 2.8-16L26.7 41l16.1-2.4L50 24z" fill="#FFF4BF" stroke="#E3C95A" strokeWidth="2" />
      </svg>
    </div>
  );
}
