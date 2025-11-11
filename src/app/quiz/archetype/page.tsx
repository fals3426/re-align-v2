"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ArchetypeId } from "@/data/archetypes";
import { loadUser, saveUser } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Option = { label: string; weights: Partial<Record<ArchetypeId, number>> };
type Question = { id: string; text: string; options: Option[] };

// Lightweight 6-question quiz (legacy), aligned with ArchetypeId (lowercase)
const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "What do you seek most right now?",
    options: [
      { label: "Clarity of vision", weights: { visionary: 2 } },
      { label: "Calm and grounding", weights: { grounded: 2 } },
      { label: "Better relationships", weights: { connector: 2 } },
      { label: "Focus and strategy", weights: { strategist: 2 } },
    ],
  },
  {
    id: "q2",
    text: "Your natural leadership style tends to be…",
    options: [
      { label: "Inspiring and future-oriented", weights: { visionary: 2 } },
      { label: "Supportive and caring", weights: { nurturer: 2 } },
      { label: "Analytical and decisive", weights: { strategist: 2 } },
      { label: "Exploring new ideas", weights: { explorer: 2 } },
    ],
  },
  {
    id: "q3",
    text: "When stressed, you prefer to…",
    options: [
      { label: "Breathe and center", weights: { grounded: 2 } },
      { label: "Talk it out", weights: { connector: 2 } },
      { label: "Map a plan", weights: { strategist: 2 } },
      { label: "Step back for perspective", weights: { visionary: 2 } },
    ],
  },
  {
    id: "q4",
    text: "What energizes you most?",
    options: [
      { label: "Learning by doing", weights: { explorer: 2 } },
      { label: "Guiding and mentoring", weights: { nurturer: 2 } },
      { label: "Connecting people", weights: { connector: 2 } },
      { label: "Crafting strategy", weights: { strategist: 2 } },
    ],
  },
  {
    id: "q5",
    text: "Choose a practice for today:",
    options: [
      { label: "Vision focus meditation", weights: { visionary: 1 } },
      { label: "Grounding breath", weights: { grounded: 1 } },
      { label: "Gratitude message", weights: { connector: 1 } },
      { label: "Curiosity micro-experiment", weights: { explorer: 1 } },
    ],
  },
  {
    id: "q6",
    text: "Your team would likely describe you as…",
    options: [
      { label: "Visionary", weights: { visionary: 1 } },
      { label: "Grounded", weights: { grounded: 1 } },
      { label: "Connector", weights: { connector: 1 } },
      { label: "Strategist", weights: { strategist: 1 } },
      { label: "Nurturer", weights: { nurturer: 1 } },
    ],
  },
];

export default function ArchetypeQuizPage() {
  const router = useRouter();
  const user = loadUser();
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1));

  const canSubmit = useMemo(() => answers.every((i) => i >= 0), [answers]);

  const result: ArchetypeId | null = useMemo(() => {
    const scores: Record<ArchetypeId, number> = {
      visionary: 0,
      grounded: 0,
      connector: 0,
      strategist: 0,
      nurturer: 0,
      explorer: 0,
      transformer: 0,
      dreamer: 0,
    };
    answers.forEach((optIdx, qIdx) => {
      if (optIdx < 0) return;
      const opt = QUESTIONS[qIdx].options[optIdx];
      for (const [k, v] of Object.entries(opt.weights)) {
        scores[k as ArchetypeId] += v ?? 0;
      }
    });
    let best: ArchetypeId = "visionary";
    let bestVal = -Infinity;
    (Object.keys(scores) as ArchetypeId[]).forEach((k) => {
      if (scores[k] > bestVal) {
        best = k;
        bestVal = scores[k];
      }
    });
    return best;
  }, [answers]);

  const progress = Math.round((answers.filter((a) => a >= 0).length / QUESTIONS.length) * 100);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-brand-ink">Archetype Quiz</h1>
          <p className="text-brand-ink/80">Answer the questions below. Your archetype will be computed automatically.</p>
          <Progress value={progress} />
        </div>
        {QUESTIONS.map((q, qi) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle>
                <span className="mr-2 text-brand-ink/50">{qi + 1}/{QUESTIONS.length}</span>
                {q.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {q.options.map((opt, oi) => (
                <Button
                  key={oi}
                  variant={answers[qi] === oi ? "default" : "outline"}
                  className="justify-start"
                  onClick={() =>
                    setAnswers((a) => {
                      const copy = [...a];
                      copy[qi] = oi;
                      return copy;
                    })
                  }
                >
                  {opt.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        ))}

        {canSubmit && (
          <div className="flex flex-wrap items-center gap-3">
            <p>
              Your archetype: <strong>{result}</strong>
            </p>
            <Button onClick={() => { const base = user ?? { id: crypto.randomUUID() }; saveUser({ ...base, archetype: result! }); router.push("/archetype"); }}>See my profile</Button>
            <Button variant="outline" onClick={() => { const base = user ?? { id: crypto.randomUUID() }; saveUser({ ...base, archetype: result! }); router.push("/quiz/personalization"); }}>Go to personalization</Button>
          </div>
        )}
      </div>
    </main>
  );
}

