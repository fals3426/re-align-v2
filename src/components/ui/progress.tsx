export function Progress({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full overflow-hidden rounded bg-slate-800">
      <div className="h-full bg-indigo-500 transition-all" style={{ width: `${clamped}%` }} />
    </div>
  );
}

