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
    const initialSubjects = [
      ...Array(5).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'exam' as const
      })),
      ...Array(2).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'assignment' as const
      })),
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

  const calculateAverage = () => {
    setError(null);
    setResults([]);
    setAverage(null);

    const categorySubjects = {
      exam: subjects.filter(s => s.category === 'exam'),
      assignment: subjects.filter(s => s.category === 'assignment'),
      practical: subjects.filter(s => s.category === 'practical')
    };

    const categoryAverages = {
      exam: 0,
      assignment: 0,
      practical: 0
    };

    Object.entries(categorySubjects).forEach(([category, subjectList]) => {
      const activeSubjects = subjectList.filter(s => s.grade);
      
      if (activeSubjects.length > 0) {
        let categorySum = 0;
        let totalWeight = 0;

        activeSubjects.forEach(subject => {
          const grade = parseFloat(subject.grade);
          const weight = parseFloat(subject.multipleWeight || '1');
          categorySum += grade * weight;
          totalWeight += weight;
        });

        categoryAverages[category as keyof typeof categoryAverages] = 
          totalWeight > 0 ? categorySum / totalWeight : 0;
      }
    });

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

    const individualResults: GradeResult[] = subjects
      .filter(subject => subject.grade)
      .map(subject => ({
        subjectName: subject.name || 'Unbenanntes Fach',
        grade: parseFloat(subject.grade),
        weight: `${subject.multipleWeight}-fach`,
        category: subject.category
      }));

    setResults([...individualResults, ...categoryResults]);
    setAverage(finalAverage);
  };

  const renderSection = (title: string, category: 'exam' | 'assignment' | 'practical', weight: number) => {
    const categorySubjects = subjects.filter(s => s.category === category);

    return (
      <div className="mb-8 material-card">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400">({weight}%)</span>
        </h3>
        <div className="space-y-4">
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
          className="mt-6 material-button bg-primary-500 hover:bg-primary-600 text-sm"
        >
          + Weiteres Fach hinzufügen
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="material-card mb-8">
        <h2 className="text-xl font-bold mb-8 text-gray-800 dark:text-white">Noteneingabe</h2>
        
        {renderSection('Klausuren', 'exam', STIWL_WEIGHTS.exam)}
        {renderSection('Hausarbeiten', 'assignment', STIWL_WEIGHTS.assignment)}
        {renderSection('Praktische Prüfungen', 'practical', STIWL_WEIGHTS.practical)}
        
        <div className="mt-8">
          <button
            onClick={calculateAverage}
            className="material-button bg-green-500 hover:bg-green-600 text-lg w-full sm:w-auto"
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