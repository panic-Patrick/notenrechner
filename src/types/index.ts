export interface Subject {
  id: string;
  name: string;
  grade: string;
  weightType: 'multiple';
  multipleWeight: string;
  percentWeight: string;
  category?: 'exam' | 'assignment' | 'practical';
  gradeType: 'points' | 'grades';
}

export interface GradeResult {
  subjectName: string;
  grade: number;
  weight: string;
  category?: string;
  isDeficit?: boolean;
}

export const STIWL_WEIGHTS = {
  exam: 65,
  assignment: 15,
  practical: 20
} as const;

export interface DeficitCheck {
  hasDeficits: boolean;
  deficitCount: number;
  message: string;
  status: 'success' | 'warning' | 'error';
}