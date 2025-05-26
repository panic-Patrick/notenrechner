import { Subject, DeficitCheck } from '../types';

export const calculateTotalPercentage = (subjects: Subject[]): number => {
  return subjects
    .filter(subject => subject.weightType === 'percent' && subject.percentWeight)
    .reduce((sum, subject) => sum + parseFloat(subject.percentWeight || '0'), 0);
};

export const getGradeColorClass = (grade: number): string => {
  if (grade <= 1.5) return 'text-green-600';
  if (grade <= 2.5) return 'text-green-500';
  if (grade <= 3.5) return 'text-yellow-600';
  if (grade <= 4.5) return 'text-orange-500';
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

export const checkDeficits = (subjects: Subject[]): DeficitCheck => {
  const deficits = subjects.filter(subject => {
    if (!subject.grade) return false;
    const gradeValue = parseFloat(subject.grade);
    return subject.gradeType === 'points' 
      ? gradeValue <= 4 
      : gradeValue >= 5;
  });

  const deficitCount = deficits.length;

  if (deficitCount >= 2) {
    return {
      hasDeficits: true,
      deficitCount,
      message: 'Du hast nicht bestanden, da mehrere Defizite vorhanden sind.',
      status: 'error'
    };
  } else if (deficitCount === 1) {
    return {
      hasDeficits: true,
      deficitCount,
      message: 'Es liegt ein Defizit vor. Dieses kann ggf. ausgeglichen werden, beachte die Prüfungsordnung.',
      status: 'warning'
    };
  }

  return {
    hasDeficits: false,
    deficitCount: 0,
    message: 'Du hast bestanden. Es liegt kein Defizit vor.',
    status: 'success'
  };
};