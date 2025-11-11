// Supported leadership archetypes
// Align with ids defined in src/data/archetypes.ts to avoid casing mismatches
import type { ArchetypeId } from "@/data/archetypes";
export type Archetype = ArchetypeId;

export type Preference = {
  // existing
  prefersMeditation: boolean;
  prefersVideo: boolean; // if false, assume audio
  sessionLength: "short" | "medium" | "long";
  // personalization 2
  pace?: "calm" | "dynamic";
  content?: {
    breathwork?: boolean;
    meditation?: boolean;
    audio?: boolean;
    video?: boolean;
  };
  sessionsPerWeek?: number; // 3–7
  timeOfDay?: "morning" | "noon" | "evening";
  reminders?: boolean;
  themes?: ("stress_to_rest" | "focus" | "creativity")[];
  vr?: boolean;
};

export type JourneyStep = {
  id: string;
  title: string;
  type: "audio" | "video" | "meditation" | "breathwork";
  minutes: number;
  completed: boolean;
};

export type Journey = {
  steps: JourneyStep[];
};

export type User = {
  id: string;
  email?: string;
  archetype?: Archetype;
  preference?: Preference;
};
