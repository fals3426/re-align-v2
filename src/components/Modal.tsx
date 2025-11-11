"use client";
import { ReactNode, useEffect } from "react";

// Minimal modal component for MVP
export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-lg border border-slate-800 bg-slate-950/90 p-5 text-slate-100 shadow-xl backdrop-blur"
      >
        <div className="flex items-center justify-between">
          <strong>Session</strong>
          <button onClick={onClose} aria-label="Close" className="text-slate-300 hover:text-white">
            ✕
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
