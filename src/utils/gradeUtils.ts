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