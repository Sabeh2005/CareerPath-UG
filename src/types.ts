export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
}

export type SubjectCategory =
  | 'STEM'
  | 'Business'
  | 'Humanities'
  | 'Creative'
  | 'Languages'
  | 'Vocational';

export interface ALevelCombination {
  code: string;
  subjects: string[];
  fullName: string;
  category: 'Sciences' | 'Arts' | 'Business' | 'Languages' | 'Mixed';
}

export interface Degree {
  name: string;
  university: string;
  duration: string;
  description: string;
}

export interface CareerPath {
  title: string;
  description: string;
  avgSalary: string;
  growthPotential: string;
  icon: string;
}

export interface SubjectGroupMapping {
  subjects: string[];
  careers: CareerPath[];
  suggestedALevel?: string;
}

export interface CombinationMapping {
  code: string;
  degrees: Degree[];
  careers: CareerPath[];
}

export type StudentLevel = 'olevel' | 'alevel';

export type ALevelTrack = 'sciences' | 'arts' | 'business';

export interface QuizState {
  step: number;
  level?: StudentLevel;
  selectedSubjects: string[];
  alevelTrack?: ALevelTrack;
  strength?: string;
  completed: boolean;
  results?: CareerPath[];
}

export interface MapperState {
  mode: 'landing' | 'olevel' | 'alevel';
  olevelSubjects: string[];
  selectedCombo: string;
}
