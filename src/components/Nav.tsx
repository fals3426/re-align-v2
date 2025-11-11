"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/auth", label: "Auth" },
  { href: "/intro", label: "Intro" },
  { href: "/journey", label: "Journey" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between border-b border-brand-lavender/40 bg-brand-lavender/60 px-4 py-3 text-sm text-brand-ink backdrop-blur">
      <Link href="/" className="flex items-center gap-2 text-brand-forest hover:opacity-90">
        <Logo size={28} />
        <span className="font-semibold tracking-tight">Re.Align</span>
      </Link>
      <div className="flex gap-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={pathname === l.href ? "text-brand-forest font-semibold" : "hover:text-brand-forest/80"}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
