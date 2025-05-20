export interface Subject {
  id: string;
  name: string;
  grade: string;
  weightType: 'multiple' | 'percent';
  multipleWeight: string;
  percentWeight: string;
  category?: 'exam' | 'assignment' | 'practical';
}

export interface GradeResult {
  subjectName: string;
  grade: number;
  weight: string;
  category?: string;
}

export const STIWL_WEIGHTS = {
  exam: 65,
  assignment: 15,
  practical: 20
} as const;