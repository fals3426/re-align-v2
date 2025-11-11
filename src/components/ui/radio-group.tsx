import * as React from "react";
import { cn } from "@/lib/utils";

export function RadioGroup({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function RadioItem({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex items-center justify-between rounded-md border px-3 py-2 text-left",
        checked ? "border-indigo-500 bg-indigo-500/10" : "border-slate-800 hover:bg-slate-900"
      )}
    >
      <span className="text-slate-200">{children}</span>
      <span className={cn("h-4 w-4 rounded-full border", checked ? "border-indigo-400 bg-indigo-400" : "border-slate-600")} />
    </button>
  );
}

