"use client";
import { useEffect, useMemo, useRef, useState } from "react";

export function PathOverlay({ containerRef, deps = [] as unknown[] }) {
  const [viewBox, setViewBox] = useState({ w: 0, h: 0 });
  const [d, setD] = useState("");
  const recalc = () => {
    const el = containerRef.current as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rows = Array.from(el.querySelectorAll<HTMLElement>(".journey-row"));
    const rowPath = (rowEl: HTMLElement) => {
      const nodes = Array.from(rowEl.querySelectorAll<HTMLElement>(".journey-node"));
      if (nodes.length < 2) return "";
      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2, rad: Math.min(r.width, r.height) / 2 };
      });

      let path = "";
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.max(1, Math.hypot(dx, dy));
        const ux = dx / len;
        const uy = dy / len;
        const startX = a.x + ux * (a.rad * 0.92);
        const startY = a.y + uy * (a.rad * 0.92);
        const endX = b.x - ux * (b.rad * 0.92);
        const endY = b.y - uy * (b.rad * 0.92);

        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const nx = -uy; // perpendicular
        const ny = ux;
        const sign = i % 2 === 0 ? 1 : -1;
        const offset = 20; // gentle arc
        const cx = midX + nx * offset * sign;
        const cy = midY + ny * offset * sign;

        if (i === 0) path += `M ${Math.round(startX)} ${Math.round(startY)}`;
        path += ` Q ${Math.round(cx)} ${Math.round(cy)} ${Math.round(endX)} ${Math.round(endY)}`;
      }
      return path;
    };
    const joined = rows.map((r) => rowPath(r)).filter(Boolean).join("|");
    setD(joined);
    setViewBox({ w: Math.ceil(rect.width), h: Math.ceil(rect.height) });
  };

  // Recalc on deps / resize
  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(() => recalc());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  if (!d) return null;
  const parts = d.split("|").filter(Boolean);
  return (
    <svg className="pointer-events-none absolute inset-0 -z-10" width={viewBox.w} height={viewBox.h}>
      <defs>
        <filter id="soft-row" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
        </filter>
      </defs>
      {parts.map((pd, i) => (
        <path
          key={i}
          d={pd}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          /* soft lavender dash for serenity */
          stroke="rgba(238,242,255,0.75)"
          strokeDasharray="8 10"
          filter="url(#soft-row)"
        />
      ))}
    </svg>
  );
}
