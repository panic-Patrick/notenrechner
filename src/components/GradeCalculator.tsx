import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SubjectEntry from './SubjectEntry';
import ResultDisplay from './ResultDisplay';
import { Subject, GradeResult, STIWL_WEIGHTS } from '../types';
import { checkDeficits } from '../utils/gradeUtils';

const GradeCalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [results, setResults] = useState<GradeResult[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gradeType, setGradeType] = useState<'points' | 'grades'>('points');

  useEffect(() => {
    const initialSubjects = [
      ...Array(5).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'exam' as const,
        gradeType
      })),
      ...Array(2).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'assignment' as const,
        gradeType
      })),
      ...Array(2).fill(null).map(() => ({
        id: uuidv4(),
        name: '',
        grade: '',
        weightType: 'multiple' as const,
        multipleWeight: '1',
        percentWeight: '',
        category: 'practical' as const,
        gradeType
      }))
    ];
    setSubjects(initialSubjects);
  }, [gradeType]);

  const handleSubjectChange = (updatedSubject: Subject) => {
    setSubjects(subjects.map(subject => 
      subject.id === updatedSubject.id ? { ...updatedSubject, gradeType } : subject
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
      category,
      gradeType
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
    const deficitCheck = checkDeficits(subjects);
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
        category: subject.category,
        isDeficit: subject.gradeType === 'points' 
          ? parseFloat(subject.grade) <= 4 
          : parseFloat(subject.grade) >= 5
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
              gradeType={gradeType}
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Noteneingabe</h2>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 dark:text-gray-300">Bewertungssystem:</label>
            <select
              value={gradeType}
              onChange={(e) => setGradeType(e.target.value as 'points' | 'grades')}
              className="material-input"
            >
              <option value="points">Punkte (0-15)</option>
              <option value="grades">Noten (1-6)</option>
            </select>
          </div>
        </div>
        
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
        gradeType={gradeType}
      />
    </div>
  );
};

export default GradeCalculator;