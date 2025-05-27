import { Subject } from '../types';

/**
 * Calculates the total percentage weight from subjects
 */
export const calculateTotalPercentage = (subjects: Subject[]): number => {
  return subjects
    .filter(subject => subject.weightType === 'percent' && subject.percentWeight)
    .reduce((sum, subject) => sum + parseFloat(subject.percentWeight || '0'), 0);
};

/**
 * Gets a color class based on the grade value
 */
export const getGradeColorClass = (grade: number): string => {
  if (grade <= 1.5) return 'text-green-600';
  if (grade <= 2.5) return 'text-green-500';
  if (grade <= 3.5) return 'text-yellow-600';
  if (grade <= 4.5) return 'text-orange-500';
  return 'text-red-600';
};

/**
 * Converts points to grade
 */
export const pointsToGrade = (points: number): number => {
  if (points >= 13) return 1.0;
  if (points >= 10) return 2.0;
  if (points >= 7) return 3.0;
  if (points >= 5) return 4.0;
  if (points >= 1) return 5.0;
  return 6.0;
};

/**
 * Converts grade to points
 */
export const gradeToPoints = (grade: number): number => {
  if (grade <= 1.5) return 14; // middle of 13-15
  if (grade <= 2.5) return 11; // middle of 10-12
  if (grade <= 3.5) return 8;  // middle of 7-9
  if (grade <= 4.5) return 5.5; // middle of 5-6
  if (grade <= 5.5) return 2.5; // middle of 1-4
  return 0;
};

/**
 * Validates subjects for calculation
 */
export const validateSubjects = (subjects: Subject[]): string | null => {
  const subjectsWithPercentage = subjects.filter(
    subject => subject.weightType === 'percent' && subject.percentWeight && subject.grade
  );
  
  if (subjectsWithPercentage.length > 0) {
    const totalPercentage = calculateTotalPercentage(subjects);
    if (totalPercentage !== 100) {
      return `Die Summe der Prozente muss 100% ergeben! Aktuell: ${totalPercentage}%`;
    }
  }
  
  return null;
};