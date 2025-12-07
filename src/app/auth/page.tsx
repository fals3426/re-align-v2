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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleAuth() {
    const id = existing?.id ?? crypto.randomUUID();
    saveUser({ id, email, firstName: mode === "signup" ? firstName : existing?.firstName, lastName: mode === "signup" ? lastName : existing?.lastName });
    if (mode === "signup") router.push("/intro");
    else router.push("/journey");
  }

  return (
    <main className="min-h-screen bg-brand-gold/20 px-4 py-10">
      <div className="mx-auto grid max-w-md place-items-center">
        <Card className="w-full bg-white shadow-lg border border-brand-lavender/60">
          <CardHeader>
            <CardTitle>{mode === "login" ? "Login" : "Sign Up"}</CardTitle>
            <CardDescription>Use a dummy email/password or continue as guest.</CardDescription>
            <div className="mt-2 flex gap-2">
              <Button variant={mode === "login" ? "default" : "outline"} onClick={() => setMode("login")}>Login</Button>
              <Button variant={mode === "signup" ? "default" : "outline"} onClick={() => setMode("signup")}>Sign Up</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {mode === "signup" && (
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm">First name</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Last name</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
                </div>
              </div>
            )}
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
            {existing && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => { resetAll(); location.reload(); }}>Reset</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
