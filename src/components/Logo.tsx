"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Logo({ size = 96, className }: { size?: number; className?: string }) {
  const [src, setSrc] = useState("/brand/logo.png");
  return (
    <Image
      src={src}
      alt="Re.Align logo"
      width={size}
      height={size}
      priority
      onError={() => setSrc("/brand/Logo.png")}
      className={cn("select-none", className)}
    />
  );
}
