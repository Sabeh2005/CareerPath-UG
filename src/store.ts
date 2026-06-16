import type { QuizState, MapperState, CareerPath } from './types';

const QUIZ_KEY = 'careerpath_quiz';
const QUIZ_RESULTS_KEY = 'careerpath_quiz_results';
const WELCOME_KEY = 'careerpath_welcome_seen';
export const MAPPER_KEY = 'careerpath_mapper';

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable */
  }
}

export function getQuizState(): QuizState {
  return safeGet<QuizState>(QUIZ_KEY, {
    step: 1,
    selectedSubjects: [],
    completed: false,
  });
}

export function saveQuizState(state: QuizState): void {
  safeSet(QUIZ_KEY, state);
}

export function getQuizResults(): CareerPath[] {
  return safeGet<CareerPath[]>(QUIZ_RESULTS_KEY, []);
}

export function saveQuizResults(results: CareerPath[]): void {
  safeSet(QUIZ_RESULTS_KEY, results);
}

export function clearQuiz(): void {
  localStorage.removeItem(QUIZ_KEY);
  localStorage.removeItem(QUIZ_RESULTS_KEY);
}

export function hasSeenWelcome(): boolean {
  return safeGet<boolean>(WELCOME_KEY, false);
}

export function markWelcomeSeen(): void {
  safeSet(WELCOME_KEY, true);
}

export function getMapperState(): MapperState {
  return safeGet<MapperState>(MAPPER_KEY, {
    mode: 'olevel',
    olevelSubjects: [],
    selectedCombo: '',
  });
}

export function saveMapperState(state: MapperState): void {
  safeSet(MAPPER_KEY, state);
}

export function clearMapper(): void {
  localStorage.removeItem(MAPPER_KEY);
}
