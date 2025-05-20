import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SubjectEntry from './SubjectEntry';
import ResultDisplay from './ResultDisplay';
import { Subject, GradeResult, STIWL_WEIGHTS } from '../types';

const GradeCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [results, setResults] = useState<GradeResult[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with subjects for each category
    const initialSubjects = [
      // Klausuren (5 entries)
      ...Array(5).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'exam' as const
      })),
      // Hausarbeiten (2 entries)
      ...Array(2).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'assignment' as const
      })),
      // Praktische Prüfungen (2 entries)
      ...Array(2).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'practical' as const
      }))
    ];
    setSubjects(initialSubjects);
  }, []);

  const handleSubjectChange = (updatedSubject: Subject) => {
    setSubjects(subjects.map(subject => 
      subject.id === updatedSubject.id ? updatedSubject : subject
    ));
  };

  const addSubject = (category: 'exam' | 'assignment' | 'practical') => {
    const newSubject: Subject = {
      id: uuidv4(),
      name: '',
      grade: '',
      weightType: 'multiple',
      multipleWeight: '1',
      percentWeight: '',
      category
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const validateWeights = (categorySubjects: Subject[]): boolean => {
    const percentSubjects = categorySubjects.filter(
      subject => subject.grade && subject.weightType === 'percent' && subject.percentWeight
    );
    
    if (percentSubjects.length > 0) {
      const totalWeight = percentSubjects.reduce(
        (sum, subject) => sum + parseFloat(subject.percentWeight || '0'), 
        0
      );
      return Math.abs(totalWeight - 100) < 0.01;
    }
    
    return true;
  };

  const calculateAverage = () => {
    setError(null);
    setResults([]);
    setAverage(null);

    const categorySubjects = {
      exam: subjects.filter(s => s.category === 'exam'),
      assignment: subjects.filter(s => s.category === 'assignment'),
      practical: subjects.filter(s => s.category === 'practical')
    };

    // Validate weights for each category
    for (const [category, subjectList] of Object.entries(categorySubjects)) {
      const activeSubjects = subjectList.filter(s => s.grade);
      if (activeSubjects.length > 0 && !validateWeights(activeSubjects)) {
        setError(`Die Gewichtungen in ${category === 'exam' ? 'Klausuren' : 
                 category === 'assignment' ? 'Hausarbeiten' : 
                 'Praktische Prüfungen'} müssen 100% ergeben!`);
        return;
      }
    }

    const categoryAverages = {
      exam: 0,
      assignment: 0,
      practical: 0
    };

    // Calculate weighted averages for each category
    Object.entries(categorySubjects).forEach(([category, subjectList]) => {
      const activeSubjects = subjectList.filter(s => s.grade);
      
      if (activeSubjects.length > 0) {
        let categorySum = 0;
        let totalWeight = 0;

        activeSubjects.forEach(subject => {
          const grade = parseFloat(subject.grade);
          if (subject.weightType === 'percent') {
            categorySum += grade * (parseFloat(subject.percentWeight || '0') / 100);
          } else {
            const weight = parseFloat(subject.multipleWeight || '1');
            categorySum += grade * weight;
            totalWeight += weight;
          }
        });

        categoryAverages[category as keyof typeof categoryAverages] = 
          totalWeight > 0 ? categorySum / totalWeight : categorySum;
      }
    });

    // Calculate final weighted average using STIWL weights
    let finalAverage = 0;
    const categoryResults: GradeResult[] = [];

    Object.entries(categoryAverages).forEach(([category, average]) => {
      if (average > 0) {
        const weight = STIWL_WEIGHTS[category as keyof typeof STIWL_WEIGHTS];
        finalAverage += average * (weight / 100);

        categoryResults.push({
          subjectName: category === 'exam' ? 'Klausuren' : 
                       category === 'assignment' ? 'Hausarbeiten' : 
                       'Praktische Prüfungen',
          grade: average,
          weight: `${weight}%`,
          category
        });
      }
    });

    if (categoryResults.length === 0) {
      setError('Bitte geben Sie mindestens eine Note ein.');
      return;
    }

    // Add individual grades to results
    const individualResults: GradeResult[] = subjects
      .filter(subject => subject.grade)
      .map(subject => ({
        subjectName: subject.name || 'Unbenanntes Fach',
        grade: parseFloat(subject.grade),
        weight: subject.weightType === 'percent' ? 
          `${subject.percentWeight}%` : 
          `${subject.multipleWeight}-fach`,
        category: subject.category
      }));

    setResults([...individualResults, ...categoryResults]);
    setAverage(finalAverage);
  };

  const renderSection = (title: string, category: 'exam' | 'assignment' | 'practical', weight: number) => {
    const categorySubjects = subjects.filter(s => s.category === category);
    const percentSubjects = categorySubjects.filter(
      s => s.grade && s.weightType === 'percent' && s.percentWeight
    );
    const totalWeight = percentSubjects.reduce(
      (sum, s) => sum + parseFloat(s.percentWeight || '0'), 
      0
    );

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
          {title} ({weight}%)
          {totalWeight > 0 && (
            <span className="text-sm font-normal text-gray-600 ml-2">
              Aktuelle Gewichtung: {totalWeight}%
            </span>
          )}
        </h3>
        <div className="space-y-3">
          {categorySubjects.map(subject => (
            <SubjectEntry
              key={subject.id}
              subject={subject}
              onChange={handleSubjectChange}
              onRemove={() => removeSubject(subject.id)}
              isRemovable={categorySubjects.length > 1}
            />
          ))}
        </div>
        <button
          onClick={() => addSubject(category)}
          className="mt-3 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors duration-200"
        >
          + Weiteres Fach hinzufügen
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Noteneingabe</h2>
        
        {renderSection('Klausuren', 'exam', STIWL_WEIGHTS.exam)}
        {renderSection('Hausarbeiten', 'assignment', STIWL_WEIGHTS.assignment)}
        {renderSection('Praktische Prüfungen', 'practical', STIWL_WEIGHTS.practical)}
        
        <div className="mt-6">
          <button
            onClick={calculateAverage}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
          >
            Durchschnitt berechnen
          </button>
        </div>
      </div>
      
      <ResultDisplay 
        results={results} 
        average={average} 
        error={error} 
      />
    </div>
  );
};

export default GradeCalculator;