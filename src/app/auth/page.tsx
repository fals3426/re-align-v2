"use client";
import { useRouter } from "next/navigation";
import { loadUser, saveUser, resetAll } from "@/lib/storage";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const router = useRouter();
  const existing = loadUser();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleAuth() {
    const id = existing?.id ?? crypto.randomUUID();
    saveUser({ id, email });
    if (mode === "signup") router.push("/intro");
    else router.push("/journey");
  }

  return (
    <main className="min-h-screen bg-brand-gold/20 px-4 py-10">
      <div className="mx-auto grid max-w-md place-items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{mode === "login" ? "Login" : "Sign Up"}</CardTitle>
            <CardDescription>Use a dummy email/password or continue as guest.</CardDescription>
            <div className="mt-2 flex gap-2">
              <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")}>Login</Button>
              <Button variant={mode === "signup" ? "default" : "outline"} onClick={() => setMode("signup")}>Sign Up</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Password</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" />
            </div>
            <Button className="w-full" onClick={handleAuth}>{mode === "login" ? "Login" : "Create account"}</Button>
            <div className="my-2 h-px w-full bg-brand-lavender/40" />
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => { saveUser({ id: crypto.randomUUID() }); router.push("/intro"); }}>Continue as Guest</Button>
              {existing && (
                <Button variant="outline" onClick={() => { resetAll(); location.reload(); }}>Reset</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
