"use client";
import { useEffect, useMemo, useState } from "react";
import { QUESTIONS, type Question, type Answers, scoreAnswers } from "@/data/quiz";
import { loadQuizAnswers, saveQuizAnswers, loadUser, saveUser } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function ArchetypeQuizFlow() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    const saved = loadQuizAnswers();
    if (saved) setAnswers(saved as Answers);
  }, []);

  useEffect(() => {
    saveQuizAnswers(answers);
  }, [answers]);

  const q = QUESTIONS[idx];
  const progress = Math.round(((idx + 1) / QUESTIONS.length) * 100);

  const canNext = useMemo(() => {
    const v = answers[q.id];
    if (q.type === "single") return typeof v === "string" && v.length > 0;
    if (q.type === "multi") return Array.isArray(v) && v.length > 0 && v.length <= (q.maxSelect ?? 99);
    if (q.type === "scale") return typeof v === "number";
    return false;
  }, [answers, q]);

  const setAnswer = (val: any) => setAnswers((a) => ({ ...a, [q.id]: val }));

  const onFinish = () => {
    const res = scoreAnswers(answers);
    const base = loadUser() ?? { id: crypto.randomUUID() };
    // Cast defensively to avoid build issues if types drift
    saveUser({ ...base, archetype: res.topNature as any });
    router.push("/archetype");
  };

  return (
    <main className="min-h-[calc(100vh-56px)] bg-brand-gold/20 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-brand-ink">Archetype Intake</h1>
          <span className="text-sm text-brand-ink/70">
            Question {idx + 1} / {QUESTIONS.length}
          </span>
        </div>
        <Progress value={progress} />

        <section className="rounded-2xl bg-white/90 border border-brand-lavender/40 p-6 shadow-sm">
          <p className="text-sm text-brand-ink/60">{q.section}</p>
          <h2 className="mt-1 text-lg font-medium text-brand-ink">{q.prompt}</h2>

          {q.type === "single" && (
            <div className="mt-4 grid gap-2">
              {q.options?.map((o) => (
                <label key={o.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === o.id}
                    onChange={() => setAnswer(o.id)}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
          )}

          {q.type === "multi" && (
            <div className="mt-4 grid gap-2">
              {q.options?.map((o) => {
                const list = (answers[q.id] as string[] | undefined) ?? [];
                const checked = list.includes(o.id);
                const disabled = !checked && q.maxSelect && list.length >= q.maxSelect;
                return (
                  <label key={o.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={(e) => {
                        if (e.target.checked) setAnswer([...list, o.id]);
                        else setAnswer(list.filter((id) => id !== o.id));
                      }}
                    />
                    <span>{o.label}</span>
                  </label>
                );
              })}
              {q.maxSelect && (
                <p className="text-xs text-brand-ink/60">Select up to {q.maxSelect}</p>
              )}
            </div>
          )}

          {q.type === "scale" && (
            <div className="mt-6">
              <input
                type="range"
                min={1}
                max={10}
                value={(answers[q.id] as number) || 5}
                onChange={(e) => setAnswer(Number(e.target.value))}
                className="w-full"
              />
              <div className="mt-1 text-sm text-brand-ink/70">Value: {(answers[q.id] as number) || 5}</div>
            </div>
          )}
        </section>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0}>
            Previous
          </Button>
          {idx < QUESTIONS.length - 1 ? (
            <Button onClick={() => setIdx((i) => Math.min(QUESTIONS.length - 1, i + 1))} disabled={!canNext}>
              Next
            </Button>
          ) : (
            <Button onClick={onFinish} disabled={!canNext}>
              See my profile
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
