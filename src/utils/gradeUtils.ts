import { Subject } from '../types';

export const calculateTotalPercentage = (subjects: Subject[]): number => {
  return subjects
    .filter(subject => subject.weightType === 'percent' && subject.percentWeight)
    .reduce((sum, subject) => sum + parseFloat(subject.percentWeight || '0'), 0);
};

export const getGradeColorClass = (points: number): string => {
  if (points >= 13) return 'text-green-600';
  if (points >= 10) return 'text-green-500';
  if (points >= 7) return 'text-yellow-600';
  if (points >= 5) return 'text-orange-500';
  return 'text-red-600';
};

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