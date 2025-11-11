"use client";
import type { Journey, User } from "@/lib/types";

const K_USER = "re-align:user";
const K_JOURNEY = "re-align:journey";
const K_QUIZ = "re-align:quiz";

export function loadUser(): User | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(K_USER);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function saveUser(user: User) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(K_USER, JSON.stringify(user));
}

export function loadJourney(): Journey | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(K_JOURNEY);
  return raw ? (JSON.parse(raw) as Journey) : null;
}

export function saveJourney(journey: Journey) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(K_JOURNEY, JSON.stringify(journey));
}

export function resetAll() {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(K_USER);
  localStorage.removeItem(K_JOURNEY);
  localStorage.removeItem(K_QUIZ);
}

export function saveQuizAnswers(a: Record<string, any>) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(K_QUIZ, JSON.stringify(a));
}

export function loadQuizAnswers(): Record<string, any> | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(K_QUIZ);
  return raw ? (JSON.parse(raw) as Record<string, any>) : null;
}
