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
      <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200 rounded-lg backdrop-blur-sm animate-fade-in">
        <p className="font-bold">Fehler:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (results.length === 0 || average === null) {
    return null;
  }

  const getGradeColor = (grade: number): string => {
    if (grade <= 1.5) return 'text-green-600 dark:text-green-400';
    if (grade <= 2.5) return 'text-green-500 dark:text-green-300';
    if (grade <= 3.5) return 'text-yellow-600 dark:text-yellow-400';
    if (grade <= 4.5) return 'text-orange-500 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="mt-8 bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 shadow-lg animate-fade-in transition-all duration-200 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Ergebnisse
      </h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Einzelne Noten:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center backdrop-blur-sm hover:scale-[1.02] transition-all duration-200"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {result.subjectName || 'Unbenanntes Fach'}:
              </span>
              <span className={`${getGradeColor(result.grade)} font-bold text-lg`}>
                {result.grade.toFixed(1)} <span className="text-sm">({result.weight})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Gewichteter Durchschnitt:
          </h3>
          <span className={`text-3xl font-bold ${getGradeColor(average)} transition-all duration-200`}>
            {average.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;