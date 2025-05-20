import React from 'react';
import { GradeResult } from '../types';

interface ResultDisplayProps {
  results: GradeResult[];
  average: number | null;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, average, error }) => {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded animate-fade-in">
        <p className="font-bold">Fehler:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (results.length === 0 || average === null) {
    return null;
  }

  const getGradeColor = (grade: number): string => {
    if (grade <= 1.5) return 'text-green-600';
    if (grade <= 2.5) return 'text-green-500';
    if (grade <= 3.5) return 'text-yellow-600';
    if (grade <= 4.5) return 'text-orange-500';
    return 'text-red-600';
  };

  return (
    <div className="mt-8 bg-white rounded-lg p-6 shadow-md animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Ergebnisse</h2>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">Einzelne Noten:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {results.map((result, index) => (
            <div key={index} className="py-1 px-3 bg-gray-50 rounded flex justify-between">
              <span className="font-medium">{result.subjectName || 'Unbenanntes Fach'}:</span>
              <span className={`${getGradeColor(result.grade)} font-bold`}>
                {result.grade.toFixed(1)} ({result.weight})
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Gewichteter Durchschnitt:</h3>
          <span className={`text-2xl font-bold ${getGradeColor(average)}`}>
            {average.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;