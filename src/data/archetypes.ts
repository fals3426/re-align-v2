export type ArchetypeId =
  | "visionary"
  | "grounded"
  | "connector"
  | "strategist"
  | "nurturer"
  | "explorer"
  | "transformer"
  | "dreamer";

export type ArchetypeProfile = {
  id: ArchetypeId;
  name: string;
  color?: string;
  welcome: string;
  nature: {
    essence: string;
    gifts: string[];
    shadowRisks: string[];
    ecosystemRole: string;
  };
  path: {
    shadowName: string;
    shadowPattern: string;
    empoweredName: string;
    empoweredShift: string;
    growthInvitation: string;
  };
  combinedIdentity: string;
  nextSteps: {
    vrJourney: string;
    dailyAiGuidance: string;
    cohortRole: string;
  };
  practices: {
    embodimentCue: string;
    natureAnchor: string;
    journalPrompt: string;
  };
};

export const archetypes: Record<ArchetypeId, ArchetypeProfile> = {
  visionary: {
    id: "visionary",
    name: "The Visionary",
    color: "#3C805C",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role in the living ecosystem of humanity — and every leader also carries a growth edge. What you discover here is not a box, but a compass. Your Nature Archetype shows the medicine you carry for the collective. Your Shadow → Empowered Archetype shows the path you are called to walk right now.",
    nature: {
      essence:
        "You carry the fire of future‑seeing. Like the hawk soaring above the landscape, you hold perspective that others cannot yet see. You inspire possibility, craft vision, and ignite collective imagination.",
      gifts: ["Clarity of direction", "Inspiration", "Creative strategy"],
      shadowRisks: [
        "Overextending into burnout",
        "Losing patience with slower movers",
        "Getting stuck in ideas without grounding",
      ],
      ecosystemRole:
        "The one who holds the horizon — offering guidance and orientation to others.",
    },
    path: {
      shadowName: "The Overachiever",
      shadowPattern:
        "Driven to prove worth through doing. Rest feels unsafe. You often tie identity to output, risking exhaustion or disconnection.",
      empoweredName: "The Aligned Creator",
      empoweredShift:
        "You step into integrity with your energy. Your creations are aligned, not forced. You honor cycles of rest and regeneration, creating impact with clarity and sustainability.",
      growthInvitation:
        "Rest is not laziness — it is leadership. By embodying rest and alignment, you model regenerative leadership for others.",
    },
    combinedIdentity:
      "You are The Visionary, carrying the sight of horizons. Right now, your journey is to walk from The Overachiever to The Aligned Creator. This means your leadership gift is not just seeing what’s ahead, but embodying the regenerative pace of creation that makes visions real. You are here to show others that vision + alignment = impact with integrity.",
    nextSteps: {
      vrJourney:
        "Step into the Mountain of Vision — where your hawk’s‑eye perspective will guide you to transform overwork into aligned creation.",
      dailyAiGuidance:
        "Your archetype avatar appears as a Hawk Spirit Mentor, reminding you of your growth edge with short practices.",
      cohortRole:
        "As a Visionary, you’ll often hold the ‘Future Seer’ role — and you’ll be challenged to rotate into Steward and Connector roles to strengthen balance.",
    },
    practices: {
      embodimentCue:
        "Take 3 breaths before every decision → ask: ‘Am I creating from force or alignment?’",
      natureAnchor:
        "The hawk. Find height — a balcony, rooftop, or hill. Look to the horizon when you need perspective.",
      journalPrompt:
        "Where in my life am I over‑achieving? What would aligned creation look like instead?",
    },
  },
  grounded: {
    id: "grounded",
    name: "The Grounded Steward",
    color: "#4B8667",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role in the living ecosystem of humanity — and every leader also carries a growth edge. What you discover here is not a box, but a compass.",
    nature: {
      essence:
        "You root teams in stability. Like an old‑growth tree, you bring calm presence, reliability and the capacity to hold steady when others sway.",
      gifts: ["Stability", "Patience", "Operational care"],
      shadowRisks: [
        "Over‑caution that slows momentum",
        "Taking on too much responsibility",
        "Avoiding necessary conflict",
      ],
      ecosystemRole: "The steward who tends the soil so others can grow.",
    },
    path: {
      shadowName: "The Over‑Stabilizer",
      shadowPattern:
        "Clings to what works, resists change, buffers others from discomfort at the cost of learning.",
      empoweredName: "The Adaptive Steward",
      empoweredShift:
        "Keeps roots in the ground and branches flexible — stabilizes while iterating, invites healthy tension for growth.",
      growthInvitation:
        "Hold both stability and movement. Practice small, safe‑to‑try experiments while protecting core rhythms.",
    },
    combinedIdentity:
      "You are the Grounded Steward. Your path is to evolve from Over‑Stabilizer to Adaptive Steward — carrying reliability while welcoming change.",
    nextSteps: {
      vrJourney: "Enter the Grove of Presence — practice staying rooted while winds of change move around you.",
      dailyAiGuidance: "Your mentor appears as an Oak Spirit — a reminder to breathe low and act deliberately.",
      cohortRole: "Often holds logistics/ops; rotate into Visionary and Connector roles to stretch perspective and flow.",
    },
    practices: {
      embodimentCue: "Exhale twice as long as you inhale before answering a request.",
      natureAnchor: "The tree. Touch bark or sit with a trunk when you need steadiness.",
      journalPrompt:
        "Where am I holding on too tightly? What tiny experiment could I allow without risking our roots?",
    },
  },
  connector: {
    id: "connector",
    name: "The Connector",
    color: "#4B8667",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role… this is your compass, not a box.",
    nature: {
      essence:
        "You weave trust. Like mycelium under the forest floor, you sense what people need and help energy flow between them.",
      gifts: ["Empathy", "Relationship building", "Facilitation"],
      shadowRisks: [
        "People‑pleasing or over‑merging",
        "Avoiding clear boundaries",
        "Diffusing focus by saying yes to all",
      ],
      ecosystemRole: "The bridge — translating, listening, bringing parts into coherence.",
    },
    path: {
      shadowName: "The Pleaser",
      shadowPattern:
        "Seeks harmony at all costs; dilutes truth or personal needs to keep peace.",
      empoweredName: "The Boundaried Connector",
      empoweredShift:
        "Speaks truth with care, names needs clearly, builds durable trust through clarity.",
      growthInvitation:
        "Let clarity be kindness. Practice saying a clean ‘no’ to protect a deeper ‘yes’.",
    },
    combinedIdentity:
      "You are the Connector. Your path is to move from Pleaser to Boundaried Connector — keeping your heart open while keeping your edges clear.",
    nextSteps: {
      vrJourney: "Walk the River Crossing — practice truth‑telling and boundary setting in motion.",
      dailyAiGuidance: "Your mentor appears as a Deer Guide — attune, then choose with backbone.",
      cohortRole: "Often holds ‘Glue’ — rotate into Strategist/Visionary roles to sharpen edges and direction.",
    },
    practices: {
      embodimentCue: "Before agreeing, pause and feel: do I have a full‑body yes?",
      natureAnchor: "The river. Listen to flow and choose the channel.",
      journalPrompt: "Where am I saying yes from fear? What boundary would honor connection more deeply?",
    },
  },
  strategist: {
    id: "strategist",
    name: "The Strategist",
    color: "#3C805C",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role… this is your compass, not a box.",
    nature: {
      essence:
        "You pattern the path. Like mountain switchbacks, you design pragmatic routes from vision to reality.",
      gifts: ["Prioritization", "Decision clarity", "Systems thinking"],
      shadowRisks: [
        "Over‑controlling plans",
        "Dismissing emotion",
        "Optimizing at the expense of aliveness",
      ],
      ecosystemRole: "The path‑maker — turns raw possibility into actionable steps.",
    },
    path: {
      shadowName: "The Controller",
      shadowPattern:
        "Grips outcomes and timelines; squeezes creativity and team autonomy.",
      empoweredName: "The Orchestrator",
      empoweredShift:
        "Sets clear constraints and invites contribution; designs adaptive plans that learn.",
      growthInvitation:
        "Trade certainty for cadence. Lead by rhythms, not rigidity.",
    },
    combinedIdentity:
      "You are the Strategist. Your path is to move from Controller to Orchestrator — composing structure that lets life play.",
    nextSteps: {
      vrJourney: "Enter the Switchback Trail — practice adaptive planning under shifting conditions.",
      dailyAiGuidance: "Your mentor appears as a Wolf Planner — decisive and attuned to the pack.",
      cohortRole: "Often holds planning/OKRs — rotate into Connector/Nurturer to soften edges and widen empathy.",
    },
    practices: {
      embodimentCue: "Before choosing, name 3 options and 1 experiment.",
      natureAnchor: "The mountain trail. Remember: steady steps beat forced sprints.",
      journalPrompt: "Where am I gripping? What cadence would let learning lead?",
    },
  },
  nurturer: {
    id: "nurturer",
    name: "The Nurturer",
    color: "#4B8667",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role… this is your compass, not a box.",
    nature: {
      essence:
        "You heal ecosystems. Like rich soil, you regenerate morale and help others flourish.",
      gifts: ["Care", "Psychological safety", "Team healing"],
      shadowRisks: [
        "Self‑erasure / over‑giving",
        "Avoiding standards to be nice",
        "Carrying others’ work",
      ],
      ecosystemRole: "The soil‑keeper — restores energy and trust.",
    },
    path: {
      shadowName: "The Rescuer",
      shadowPattern:
        "Steps in too fast; creates dependency and burns out.",
      empoweredName: "The Gardener‑Coach",
      empoweredShift:
        "Nourishes with boundaries; asks empowering questions; expects growth and competence.",
      growthInvitation:
        "Care ≠ carrying. Love people, and keep standards clear.",
    },
    combinedIdentity:
      "You are the Nurturer. Your path is to move from Rescuer to Gardener‑Coach — warmth with backbone.",
    nextSteps: {
      vrJourney: "Enter the Healing Garden — compost old stories and re‑source yourself.",
      dailyAiGuidance: "Your mentor appears as a Bear Guardian — protect rest and boundaries.",
      cohortRole: "Often holds culture/people — rotate into Strategist/Visionary roles to balance care with direction.",
    },
    practices: {
      embodimentCue: "When asked for help, breathe and ask: ‘What have you tried?’",
      natureAnchor: "The garden bed. Prune and water — both are love.",
      journalPrompt: "Where do I rescue? What boundary would grow others faster?",
    },
  },
  explorer: {
    id: "explorer",
    name: "The Explorer",
    color: "#3C805C",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role… this is your compass, not a box.",
    nature: {
      essence:
        "You bring curiosity and first‑principles thinking. Like a fox on new terrain, you sense patterns and test edges.",
      gifts: ["Learning velocity", "Creativity", "Experimentation"],
      shadowRisks: [
        "Shiny‑object drift",
        "Abandoning commitments too soon",
        "Impatience with routines",
      ],
      ecosystemRole: "The pathfinder — discovers options others miss.",
    },
    path: {
      shadowName: "The Dabbler",
      shadowPattern:
        "Samples everything; finishes little; struggles to land value.",
      empoweredName: "The Learning Maker",
      empoweredShift:
        "Pairs curiosity with throughput — ships small, often, and learns in public.",
      growthInvitation:
        "Make it real weekly. Choose one experiment to finish and share.",
    },
    combinedIdentity:
      "You are the Explorer. Your path is to move from Dabbler to Learning Maker — curiosity with completion.",
    nextSteps: {
      vrJourney: "Climb the Ridge of Experiments — iterate, ship, learn.",
      dailyAiGuidance: "Your mentor appears as a Fox Scout — playful, focused in sprints.",
      cohortRole: "Often sparks innovation — rotate into Steward/Strategist to strengthen follow‑through.",
    },
    practices: {
      embodimentCue: "Set a 30‑minute maker sprint before you research more.",
      natureAnchor: "The fox trail. Move light; commit to the next marker.",
      journalPrompt: "Which idea will I complete this week? What is the smallest valuable version?",
    },
  },
  transformer: {
    id: "transformer",
    name: "The Transformer (Alchemist)",
    color: "#3C805C",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role… this is your compass, not a box.",
    nature: {
      essence:
        "Intensity and depth. Like lightning splitting the sky, you catalyze change and turn limitation into innovation.",
      gifts: ["Truth‑telling", "Catalysis", "Deep transformation"],
      shadowRisks: [
        "Performing instead of being authentic",
        "Burning hot then burning out",
        "Overwhelming gentler teammates",
      ],
      ecosystemRole: "The fire‑bringer — clears stagnation and opens new pathways.",
    },
    path: {
      shadowName: "The Mask‑Wearer",
      shadowPattern: "Performance over authenticity; hides behind polish.",
      empoweredName: "The Authentic Force",
      empoweredShift:
        "Embodied truth becomes your power. You speak cleanly, move decisively, and energize the field without scorched earth.",
      growthInvitation: "Share one unpolished truth each day — and breathe into your voice.",
    },
    combinedIdentity:
      "You are the Transformer. Your path is to move from Mask‑Wearer to Authentic Force — turning pressure into presence.",
    nextSteps: {
      vrJourney: "Enter the Storm Ridge — practice grounding intensity into clear action.",
      dailyAiGuidance: "Your mentor appears as a Lightning Guide — direct, honest, compassionate.",
      cohortRole: "Often plays Challenger — rotate into Connector/Nurturer roles to balance heat with care.",
    },
    practices: {
      embodimentCue: "Hand on throat, breathe into your voice.",
      natureAnchor: "Watch a storm from shelter — feel power without acting it out.",
      journalPrompt: "Where am I performing? What would honest presence look like?",
    },
  },
  dreamer: {
    id: "dreamer",
    name: "The Dreamer (Edge‑Walker)",
    color: "#4B8667",
    welcome:
      "You’ve stepped through the portal. Every leader carries a role… this is your compass, not a box.",
    nature: {
      essence:
        "Vision, intuition, and mystery. Like the moon over water, you sense subtle currents and invite new worlds.",
      gifts: ["Imagination", "Intuition", "Sense‑making across worlds"],
      shadowRisks: [
        "People‑pleasing to keep harmony",
        "Drifting without grounding",
        "Withholding truth to be liked",
      ],
      ecosystemRole: "The seer‑weaver — brings unseen possibilities into form.",
    },
    path: {
      shadowName: "The Pleaser",
      shadowPattern: "Seeks approval; softens truth and self‑abandons boundaries.",
      empoweredName: "The Self‑Honoring Leader",
      empoweredShift:
        "Your truth becomes your belonging. You stand tall, speak cleanly, and invite authentic connection.",
      growthInvitation: "Honor one small boundary daily — let your light stay bright.",
    },
    combinedIdentity:
      "You are the Dreamer. Your path is to move from Pleaser to Self‑Honoring Leader — vision with backbone.",
    nextSteps: {
      vrJourney: "Walk the Night Dune — practice stillness, then speak one clear truth.",
      dailyAiGuidance: "Your mentor appears as a Moon Guide — gentle, unwavering.",
      cohortRole: "Often plays Oracle — rotate into Strategist/Steward to ground vision in structure.",
    },
    practices: {
      embodimentCue: "Stand tall, breathe into the belly.",
      natureAnchor: "Moonlight walk — keep your gaze soft and steady.",
      journalPrompt: "Where do I dim to fit in? What truth would honor me and the group?",
    },
  },
};

// Helper to safely read an archetype by id
export function getArchetypeProfile(id: string | undefined | null): ArchetypeProfile | null {
  const key = (id ?? "").toLowerCase() as ArchetypeId;
  try {
    const p = archetypes[key];
    if (p && typeof p === "object") return p;
  } catch {}
  return null;
}
