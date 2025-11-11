"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Preference } from "@/lib/types";
import { loadUser, saveUser, saveJourney } from "@/lib/storage";
import { generateJourney } from "@/lib/journey";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";

export default function PersonalizationQuizPage() {
  const router = useRouter();
  const [pref, setPref] = useState<Preference>({ prefersMeditation: true, prefersVideo: false, sessionLength: "short" });
  const user = loadUser();

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-2xl font-semibold text-slate-900">Personalization</h1>
        <Card>
          <CardHeader>
            <CardTitle>Have you ever practiced meditation?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup>
              <RadioItem checked={pref.prefersMeditation} onChange={() => setPref((p) => ({ ...p, prefersMeditation: true }))}>Yes</RadioItem>
              <RadioItem checked={!pref.prefersMeditation} onChange={() => setPref((p) => ({ ...p, prefersMeditation: false }))}>No</RadioItem>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Do you prefer audio or video content?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup>
              <RadioItem checked={!pref.prefersVideo} onChange={() => setPref((p) => ({ ...p, prefersVideo: false }))}>Audio</RadioItem>
              <RadioItem checked={pref.prefersVideo} onChange={() => setPref((p) => ({ ...p, prefersVideo: true }))}>Video</RadioItem>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How much time do you have daily?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup>
              <RadioItem checked={pref.sessionLength === "short"} onChange={() => setPref((p) => ({ ...p, sessionLength: "short" }))}>5 min</RadioItem>
              <RadioItem checked={pref.sessionLength === "medium"} onChange={() => setPref((p) => ({ ...p, sessionLength: "medium" }))}>10 min</RadioItem>
              <RadioItem checked={pref.sessionLength === "long"} onChange={() => setPref((p) => ({ ...p, sessionLength: "long" }))}>15 min</RadioItem>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button
          onClick={() => {
            if (!user?.archetype) {
              router.push("/quiz/archetype");
              return;
            }
            const updated = { ...(user ?? { id: crypto.randomUUID() }), preference: pref };
            saveUser(updated);
            const journey = generateJourney(user!.archetype!, pref);
            saveJourney(journey);
            router.push("/congrats");
          }}
        >
          GÃƒÂ©nÃƒÂ©rer mon parcours
        </Button>
      </div>
    </main>
  );
}
