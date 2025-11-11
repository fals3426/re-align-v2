import type { Archetype, Journey, JourneyStep, Preference } from "@/lib/types";
import type { PathwayId } from "@/data/quiz";

function minFor(len: Preference["sessionLength"]) {
  return len === "short" ? 3 : len === "medium" ? 5 : 8;
}

// Legacy/basic generator (kept for backwards compatibility)
export function generateJourney(archetype: Archetype, pref: Preference): Journey {
  const unit = minFor(pref.sessionLength);
  const typeCycle: Array<JourneyStep["type"]> = [
    "breathwork",
    "meditation",
    pref.prefersVideo ? "video" : "audio",
    "meditation",
    pref.prefersVideo ? "video" : "audio",
  ];

  const titlesByType = {
    breathwork: ["Breath 4-7-8", "Grounding Breath", "Box Breathing"],
    meditation: ["Body Scan", "Clarity Pause", "Vision Focus", "Gratitude Pause"],
    audio: ["Reset Loop", "Curiosity Walk", "Focus Primer"],
    video: ["Reset Loop", "Mini Lesson", "Focus Primer"],
  } as const;

  const total = 20;
  const steps: JourneyStep[] = [];
  for (let i = 0; i < total; i++) {
    const t = typeCycle[i % typeCycle.length];
    const pool = titlesByType[t];
    let title = pool[i % pool.length];
    if (t === "breathwork" && archetype === "grounded") title = "Grounding Breath";
    if (t === "meditation" && archetype === "visionary" && i < 2) title = "Vision Focus";
    if (t !== "breathwork" && archetype === "connector" && i % 5 === 2) title = "Heart Coherence";
    const minutes = unit + (i % 3);
    steps.push({ id: `s${i}`, title, type: t, minutes, completed: false });
  }

  return { steps };
}

export function nextUnlockIndex(steps: JourneyStep[]): number {
  return steps.findIndex((s) => !s.completed);
}

function minutesFromPref(pref: Preference) {
  return pref.sessionLength === "short" ? 5 : pref.sessionLength === "medium" ? 10 : 15;
}

// New generator that uses Nature + Pathway + Preferences
export function generatePersonalizedJourney(
  archetype: Archetype,
  pathway: PathwayId | null,
  pref: Preference
): Journey {
  const baseMinutes = minutesFromPref(pref);
  const allowed: Array<JourneyStep["type"]> = [];
  const content = pref.content ?? { breathwork: true, meditation: true, audio: !pref.prefersVideo, video: pref.prefersVideo };
  if (content.breathwork) allowed.push("breathwork");
  if (content.meditation) allowed.push("meditation");
  if (content.video) allowed.push("video");
  if (content.audio) allowed.push("audio");
  if (allowed.length === 0) allowed.push("meditation");

  const total = Math.max(10, Math.min(28, (pref.sessionsPerWeek ?? 5) * 3));
  const steps: JourneyStep[] = [];

  const titles: Record<JourneyStep["type"], string[]> = {
    breathwork: ["Grounding Breath", "Box Breathing", "Breath 4-7-8"],
    meditation: ["Clarity Pause", "Body Scan", "Vision Focus"],
    audio: ["Reset Loop", "Focus Primer", "Gentle Guidance"],
    video: ["Mini Lesson", "Guided Practice", "Insight Clip"],
  };

  if (archetype === "visionary") titles.meditation.unshift("Vision Focus");
  if (archetype === "connector") titles.audio.unshift("Heart Coherence");
  if (archetype === "grounded") titles.breathwork[0] = "Grounding Breath";

  for (let i = 0; i < total; i++) {
    const t = allowed[i % allowed.length];
    const pool = titles[t];
    const title = pool[i % pool.length];
    const minutes = baseMinutes + (pref.pace === "dynamic" ? (i % 2) : 0);
    steps.push({ id: `p${i}`, title, type: t, minutes, completed: false });
  }

  const pushMilestone = (index: number, label: string) => {
    if (index >= 0 && index < steps.length) {
      steps[index] = { ...steps[index], title: label, type: "meditation", minutes: baseMinutes };
    }
  };
  if (pathway) {
    if (pathway === "overachiever_aligned_creator") {
      pushMilestone(Math.floor(total / 3), "Sacred Pause");
      pushMilestone(Math.floor((2 * total) / 3), "Aligned Creation");
    }
    if (pathway === "pleaser_self_honoring") {
      pushMilestone(Math.floor(total / 3), "Truth Rooted");
      pushMilestone(Math.floor((2 * total) / 3), "Boundaries Practice");
    }
    if (pathway === "reactor_responder") {
      pushMilestone(Math.floor(total / 3), "Choose Presence");
      pushMilestone(Math.floor((2 * total) / 3), "Calm Response");
    }
    if (pathway === "lone_wolf_relational_genius") {
      pushMilestone(Math.floor(total / 3), "Ask & Delegate");
      pushMilestone(Math.floor((2 * total) / 3), "Co-create");
    }
    if (pathway === "mask_wearer_authentic_force") {
      pushMilestone(Math.floor(total / 3), "Honest Voice");
      pushMilestone(Math.floor((2 * total) / 3), "Embodied Truth");
    }
  }

  return { steps };
}

