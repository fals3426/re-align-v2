import type { ArchetypeId } from "@/data/archetypes";

export type PathwayId =
  | "reactor_responder"
  | "overachiever_aligned_creator"
  | "pleaser_self_honoring"
  | "lone_wolf_relational_genius"
  | "mask_wearer_authentic_force";

export type QuestionType = "single" | "multi" | "scale";

export type OptionWeight = {
  nature?: Partial<Record<ArchetypeId, number>>;
  pathway?: Partial<Record<PathwayId, number>>;
};

export type QuestionOption = {
  id: string;
  label: string;
  weights?: OptionWeight;
};

export type Question = {
  id: string;
  section: string;
  prompt: string;
  type: QuestionType;
  maxSelect?: number; // for multi
  scaleTarget?: { target: "nature" | "pathway"; id: ArchetypeId | PathwayId; factor?: number };
  options?: QuestionOption[]; // for single/multi
};

// Helper: build weights quickly
const N = (w: Partial<Record<ArchetypeId, number>>): OptionWeight => ({ nature: w });
const P = (w: Partial<Record<PathwayId, number>>): OptionWeight => ({ pathway: w });

export const QUESTIONS: Question[] = [
  // Section 1 — Core Drivers
  {
    id: "q1",
    section: "Core Drivers",
    prompt: "What energizes you most at work? (Select up to 2)",
    type: "multi",
    maxSelect: 2,
    options: [
      { id: "q1_o1", label: "Creating new ideas and possibilities", weights: N({ visionary: 2, explorer: 1 }) },
      { id: "q1_o2", label: "Solving complex challenges", weights: N({ strategist: 2, explorer: 1 }) },
      { id: "q1_o3", label: "Supporting people’s growth", weights: N({ nurturer: 2, connector: 1 }) },
      { id: "q1_o4", label: "Building systems and structure", weights: N({ strategist: 2, grounded: 1 }) },
      { id: "q1_o5", label: "Driving results and impact", weights: N({ strategist: 1, visionary: 1 }) },
      { id: "q1_o6", label: "Connecting people and fostering harmony", weights: N({ connector: 2, nurturer: 1 }) },
    ],
  },
  {
    id: "q2",
    section: "Core Drivers",
    prompt: "What situations drain your energy the most? (Select up to 2)",
    type: "multi",
    maxSelect: 2,
    options: [
      { id: "q2_o1", label: "Repetitive or uninspiring tasks", weights: N({ visionary: 1, explorer: 1 }) },
      { id: "q2_o2", label: "Disconnection or lack of purpose", weights: N({ connector: 1, visionary: 1 }) },
      { id: "q2_o3", label: "Over-structuring / too many rules", weights: N({ explorer: 1, visionary: 1 }) },
      { id: "q2_o4", label: "Unclear communication or chaos", weights: N({ strategist: 1, grounded: 1 }) },
      { id: "q2_o5", label: "Lack of recognition or feedback", weights: N({ nurturer: 1, connector: 1 }) },
    ],
  },
  { id: "q3", section: "Core Drivers", prompt: "How often do you feel proud of your work? (1–10)", type: "scale", scaleTarget: { target: "nature", id: "visionary", factor: 1 } },
  {
    id: "q4",
    section: "Core Drivers",
    prompt: "What gives you the greatest sense of pride?",
    type: "single",
    options: [
      { id: "q4_o1", label: "Leading others effectively", weights: N({ strategist: 1, connector: 1 }) },
      { id: "q4_o2", label: "Creating something meaningful", weights: N({ visionary: 2 }) },
      { id: "q4_o3", label: "Staying true to my values", weights: N({ nurturer: 1, dreamer: 1 as any }) },
      { id: "q4_o4", label: "Overcoming challenges", weights: N({ explorer: 1, transformer: 1 as any }) },
      { id: "q4_o5", label: "Contributing to a greater mission", weights: N({ visionary: 1, connector: 1 }) },
    ],
  },
  {
    id: "q5",
    section: "Core Drivers",
    prompt: "Which statement best reflects your motivation style?",
    type: "single",
    options: [
      { id: "q5_o1", label: "I’m driven by inner purpose and meaning.", weights: N({ dreamer: 2 as any, visionary: 1 }) },
      { id: "q5_o2", label: "I’m driven by achievement and excellence.", weights: P({ overachiever_aligned_creator: 2 }) },
      { id: "q5_o3", label: "I’m driven by belonging and connection.", weights: N({ connector: 2 }) },
      { id: "q5_o4", label: "I’m driven by growth and transformation.", weights: N({ transformer: 2 as any }) },
      { id: "q5_o5", label: "I’m driven by vision and innovation.", weights: N({ visionary: 2 }) },
    ],
  },

  // Section 2 — Strengths & Learning
  { id: "q6", section: "Strengths", prompt: "Which of the following describes your “superpower”?", type: "single", options: [
    { id: "q6_o1", label: "Seeing possibilities others miss", weights: N({ visionary: 2, explorer: 1 }) },
    { id: "q6_o2", label: "Staying calm and clear under pressure", weights: N({ grounded: 2 }) },
    { id: "q6_o3", label: "Reading people and building trust", weights: N({ connector: 2, nurturer: 1 }) },
    { id: "q6_o4", label: "Bringing energy and drive into action", weights: N({ strategist: 1, visionary: 1 }) },
    { id: "q6_o5", label: "Translating vision into strategy", weights: N({ strategist: 2 }) },
    { id: "q6_o6", label: "Holding space for deeper reflection", weights: N({ dreamer: 2 as any, nurturer: 1 }) },
  ] },
  { id: "q7", section: "Strengths", prompt: "Which qualities come most naturally to you? (Select up to 3)", type: "multi", maxSelect: 3, options: [
    { id: "q7_o1", label: "Creative thinking", weights: N({ visionary: 1, explorer: 1 }) },
    { id: "q7_o2", label: "Emotional intelligence", weights: N({ connector: 1, nurturer: 1 }) },
    { id: "q7_o3", label: "Strategic execution", weights: N({ strategist: 1, grounded: 1 }) },
    { id: "q7_o4", label: "Collaboration", weights: N({ connector: 1, nurturer: 1 }) },
    { id: "q7_o5", label: "Resilience", weights: N({ grounded: 1, transformer: 1 as any }) },
    { id: "q7_o6", label: "Intuition", weights: N({ dreamer: 1 as any, visionary: 1 }) },
    { id: "q7_o7", label: "Discipline", weights: N({ strategist: 1, grounded: 1 }) },
  ] },
  { id: "q8", section: "Strengths", prompt: "Which areas would you like to strengthen? (Select up to 3)", type: "multi", maxSelect: 3, options: [
    { id: "q8_o1", label: "Communication & influence", weights: N({ connector: 1 }) },
    { id: "q8_o2", label: "Boundaries & self-care", weights: P({ pleaser_self_honoring: 2 }) },
    { id: "q8_o3", label: "Strategic thinking", weights: N({ strategist: 1 }) },
    { id: "q8_o4", label: "Delegation", weights: P({ lone_wolf_relational_genius: 2 }) },
    { id: "q8_o5", label: "Emotional regulation", weights: P({ reactor_responder: 2 }) },
    { id: "q8_o6", label: "Consistency & follow-through", weights: N({ grounded: 1 }) },
  ] },
  { id: "q9", section: "Strengths", prompt: "How do you best absorb new ideas?", type: "single", options: [
    { id: "q9_o1", label: "Experiential — learn by doing", weights: N({ explorer: 2 }) },
    { id: "q9_o2", label: "Reflective — journaling / contemplation", weights: N({ dreamer: 2 as any }) },
    { id: "q9_o3", label: "Interactive — conversation / collaboration", weights: N({ connector: 2 }) },
    { id: "q9_o4", label: "Analytical — frameworks / data", weights: N({ strategist: 2 }) },
  ] },
  { id: "q10", section: "Strengths", prompt: "What kind of environment helps you excel most?", type: "single", options: [
    { id: "q10_o1", label: "Calm and grounded", weights: N({ grounded: 2 }) },
    { id: "q10_o2", label: "Fast-paced and dynamic", weights: N({ strategist: 1, visionary: 1 }) },
    { id: "q10_o3", label: "Creative and flexible", weights: N({ visionary: 1, explorer: 1 }) },
    { id: "q10_o4", label: "Structured and organized", weights: N({ strategist: 2 }) },
    { id: "q10_o5", label: "Supportive and relational", weights: N({ nurturer: 1, connector: 1 }) },
  ] },

  // Section 3 — Regulation & Integration
  { id: "q11", section: "Regulation", prompt: "How do you typically respond to stress or uncertainty?", type: "single", options: [
    { id: "q11_o1", label: "Fight — assertive, problem-solver", weights: P({ reactor_responder: 1 }) },
    { id: "q11_o2", label: "Flight — distract or avoid", weights: P({ reactor_responder: 1 }) },
    { id: "q11_o3", label: "Freeze — overthink or withdraw", weights: P({ reactor_responder: 1 }) },
    { id: "q11_o4", label: "Fawn — appease, smooth over conflict", weights: P({ pleaser_self_honoring: 2 }) },
  ] },
  { id: "q12", section: "Regulation", prompt: "When you’re in ‘flow,’ what describes your state best?", type: "single", options: [
    { id: "q12_o1", label: "Calm, open, connected", weights: N({ grounded: 1, connector: 1 }) },
    { id: "q12_o2", label: "Focused, activated, inspired", weights: N({ visionary: 1, strategist: 1 }) },
    { id: "q12_o3", label: "Expressive, embodied, playful", weights: N({ nurturer: 1, explorer: 1 }) },
    { id: "q12_o4", label: "Quiet, intuitive, still", weights: N({ dreamer: 2 as any }) },
  ] },
  { id: "q13", section: "Regulation", prompt: "How do you like to integrate insight into daily life?", type: "single", options: [
    { id: "q13_o1", label: "Morning reflection or ritual", weights: N({ dreamer: 1 as any, grounded: 1 }) },
    { id: "q13_o2", label: "Physical movement or somatic practice", weights: N({ nurturer: 1, transformer: 1 as any }) },
    { id: "q13_o3", label: "Dialogue or coaching conversation", weights: N({ connector: 2 }) },
    { id: "q13_o4", label: "Creative expression", weights: N({ visionary: 1, explorer: 1 }) },
  ] },
  { id: "q14", section: "Regulation", prompt: "Rate your current self‑care and energy management (1–10)", type: "scale", scaleTarget: { target: "pathway", id: "overachiever_aligned_creator", factor: 1 } },
  { id: "q15", section: "Regulation", prompt: "Your current relationship with boundaries and rest", type: "single", options: [
    { id: "q15_o1", label: "Excellent — I protect my time and energy", weights: P({ pleaser_self_honoring: 2 }) },
    { id: "q15_o2", label: "Moderate — sometimes overextend", weights: P({ pleaser_self_honoring: 1, overachiever_aligned_creator: 1 }) },
    { id: "q15_o3", label: "Needs improvement — I often overgive/burn out", weights: P({ overachiever_aligned_creator: 2 }) },
  ] },

  // Section 4 — Leadership Identity
  { id: "q16", section: "Identity", prompt: "How do you measure success for yourself?", type: "single", options: [
    { id: "q16_o1", label: "Personal growth and balance", weights: N({ dreamer: 1 as any, nurturer: 1 }) },
    { id: "q16_o2", label: "Impact and results achieved", weights: N({ strategist: 1, visionary: 1 }) },
    { id: "q16_o3", label: "Recognition and influence", weights: N({ visionary: 1 }) },
    { id: "q16_o4", label: "Team harmony and culture", weights: N({ connector: 1, nurturer: 1 }) },
    { id: "q16_o5", label: "Innovation and creativity", weights: N({ visionary: 1, explorer: 1 }) },
  ] },
  { id: "q17", section: "Identity", prompt: "What type of feedback helps you improve most?", type: "single", options: [
    { id: "q17_o1", label: "Direct and data-driven", weights: N({ strategist: 2 }) },
    { id: "q17_o2", label: "Encouraging and relational", weights: N({ nurturer: 1, connector: 1 }) },
    { id: "q17_o3", label: "Reflective and inquiry-based", weights: N({ dreamer: 1 as any }) },
    { id: "q17_o4", label: "Visionary and big-picture", weights: N({ visionary: 2 }) },
  ] },
  { id: "q18", section: "Identity", prompt: "One leadership quality to amplify this season", type: "single", options: [
    { id: "q18_o1", label: "Courage", weights: N({ transformer: 1 as any }) },
    { id: "q18_o2", label: "Clarity", weights: N({ strategist: 1, visionary: 1 }) },
    { id: "q18_o3", label: "Compassion", weights: N({ nurturer: 1, connector: 1 }) },
    { id: "q18_o4", label: "Creativity", weights: N({ visionary: 1, explorer: 1 }) },
    { id: "q18_o5", label: "Consistency", weights: N({ grounded: 1 }) },
  ] },
  { id: "q19", section: "Identity", prompt: "What pattern repeats in your leadership?", type: "single", options: [
    { id: "q19_o1", label: "Taking on too much responsibility", weights: P({ overachiever_aligned_creator: 1, lone_wolf_relational_genius: 1 }) },
    { id: "q19_o2", label: "Avoiding conflict or discomfort", weights: P({ pleaser_self_honoring: 1 }) },
    { id: "q19_o3", label: "Overthinking decisions", weights: P({ reactor_responder: 1 }) },
    { id: "q19_o4", label: "Struggling to delegate", weights: P({ lone_wolf_relational_genius: 2 }) },
    { id: "q19_o5", label: "Undervaluing my unique perspective", weights: N({ visionary: 1 }) },
  ] },
  { id: "q20", section: "Identity", prompt: "If your inner archetype were a symbol…", type: "single", options: [
    { id: "q20_o1", label: "Phoenix — transformation & renewal", weights: N({ transformer: 2 as any }) },
    { id: "q20_o2", label: "Dolphin — connection & play", weights: N({ connector: 2 }) },
    { id: "q20_o3", label: "Oak — grounding & strength", weights: N({ grounded: 2 }) },
    { id: "q20_o4", label: "Wolf — intuition & loyalty", weights: N({ strategist: 1, connector: 1 }) },
    { id: "q20_o5", label: "Eagle — vision & freedom", weights: N({ visionary: 2 }) },
    { id: "q20_o6", label: "Alchemist — transformation & wisdom", weights: N({ transformer: 2 as any }) },
  ] },

  // Section 5 — Team & Culture
  { id: "q21", section: "Team", prompt: "How do you contribute most naturally to a team’s culture?", type: "single", options: [
    { id: "q21_o1", label: "Bringing new ideas and perspectives", weights: N({ visionary: 2 }) },
    { id: "q21_o2", label: "Building emotional safety and trust", weights: N({ nurturer: 1, connector: 1 }) },
    { id: "q21_o3", label: "Driving momentum and focus", weights: N({ strategist: 2 }) },
    { id: "q21_o4", label: "Translating vision into structure", weights: N({ strategist: 2 }) },
    { id: "q21_o5", label: "Holding space for reflection and integration", weights: N({ dreamer: 2 as any }) },
  ] },
  { id: "q22", section: "Team", prompt: "What team dynamics challenge you most?", type: "single", options: [
    { id: "q22_o1", label: "Lack of accountability", weights: N({ strategist: 1, grounded: 1 }) },
    { id: "q22_o2", label: "Emotional disconnection", weights: N({ connector: 1, nurturer: 1 }) },
    { id: "q22_o3", label: "Over-competition or ego", weights: N({ connector: 1 }) },
    { id: "q22_o4", label: "Poor communication", weights: N({ strategist: 1 }) },
    { id: "q22_o5", label: "Resistance to change", weights: N({ explorer: 1, visionary: 1 }) },
  ] },
  { id: "q23", section: "Team", prompt: "In conflict, what is your instinctive role?", type: "single", options: [
    { id: "q23_o1", label: "Mediator", weights: N({ connector: 1, nurturer: 1 }) },
    { id: "q23_o2", label: "Challenger", weights: N({ strategist: 1, transformer: 1 as any }) },
    { id: "q23_o3", label: "Peacemaker", weights: N({ connector: 1 }) },
    { id: "q23_o4", label: "Strategist", weights: N({ strategist: 2 }) },
    { id: "q23_o5", label: "Observer", weights: N({ dreamer: 1 as any }) },
  ] },
  { id: "q24", section: "Team", prompt: "One belief/behavior to release as a leader?", type: "single", options: [
    { id: "q24_o1", label: "Overgiving or self-sacrifice", weights: P({ pleaser_self_honoring: 2 }) },
    { id: "q24_o2", label: "Fear of being misunderstood", weights: N({ connector: 1, visionary: 1 }) },
    { id: "q24_o3", label: "Needing control or certainty", weights: P({ mask_wearer_authentic_force: 1, controller: undefined as any }) },
    { id: "q24_o4", label: "People-pleasing", weights: P({ pleaser_self_honoring: 2 }) },
    { id: "q24_o5", label: "Playing small", weights: P({ mask_wearer_authentic_force: 1 }) },
  ] },

  // Section 6 — Heart Medicine Self-Awareness
  { id: "q25", section: "Heart", prompt: "I see things as either/or (1–10)", type: "scale", scaleTarget: { target: "pathway", id: "mask_wearer_authentic_force", factor: 1 } },
  { id: "q26", section: "Heart", prompt: "I view uncertainty as weakness (1–10)", type: "scale", scaleTarget: { target: "pathway", id: "reactor_responder", factor: 1 } },
  { id: "q27", section: "Heart", prompt: "I seek evidence to prove I’m right (1–10)", type: "scale", scaleTarget: { target: "pathway", id: "reactor_responder", factor: 1 } },
  { id: "q28", section: "Heart", prompt: "I assume others act from bad intent (1–10)", type: "scale", scaleTarget: { target: "pathway", id: "reactor_responder", factor: 1 } },
  { id: "q29", section: "Heart", prompt: "I feel superior or more entitled than others (1–10)", type: "scale", scaleTarget: { target: "pathway", id: "mask_wearer_authentic_force", factor: 1 } },
  { id: "q30", section: "Heart", prompt: "I can easily step into another’s perspective (1–10)", type: "scale", scaleTarget: { target: "nature", id: "connector", factor: 1 } },
];

export type Answers = Record<string, number | string | string[]>;

export function scoreAnswers(ans: Answers) {
  const nature: Record<ArchetypeId, number> = {
    visionary: 0,
    grounded: 0,
    connector: 0,
    strategist: 0,
    nurturer: 0,
    explorer: 0,
    transformer: 0 as any,
    dreamer: 0 as any,
  } as any;
  const pathway: Record<PathwayId, number> = {
    reactor_responder: 0,
    overachiever_aligned_creator: 0,
    pleaser_self_honoring: 0,
    lone_wolf_relational_genius: 0,
    mask_wearer_authentic_force: 0,
  };

  const applyWeights = (w?: OptionWeight) => {
    if (!w) return;
    if (w.nature) for (const k in w.nature) nature[k as ArchetypeId] += w.nature[k as ArchetypeId] || 0;
    if (w.pathway) for (const k in w.pathway) pathway[k as PathwayId] += w.pathway[k as PathwayId] || 0;
  };

  for (const q of QUESTIONS) {
    const v = ans[q.id];
    if (q.type === "single" && typeof v === "string") {
      const opt = q.options?.find((o) => o.id === v);
      applyWeights(opt?.weights);
    }
    if (q.type === "multi" && Array.isArray(v)) {
      v.forEach((vid) => applyWeights(q.options?.find((o) => o.id === vid)?.weights));
    }
    if (q.type === "scale" && typeof v === "number" && q.scaleTarget) {
      const factor = q.scaleTarget.factor ?? 1;
      const bucket = v >= 8 ? 2 : v >= 4 ? 1 : 0; // 0..2
      if (q.scaleTarget.target === "nature") nature[q.scaleTarget.id as ArchetypeId] += bucket * factor;
      else pathway[q.scaleTarget.id as PathwayId] += bucket * factor;
    }
  }

  const topNature = (Object.keys(nature) as ArchetypeId[]).reduce((a, b) => (nature[a] >= nature[b] ? a : b));
  const topPath = (Object.keys(pathway) as PathwayId[]).reduce((a, b) => (pathway[a] >= pathway[b] ? a : b));
  return { nature, pathway, topNature, topPath };
}

