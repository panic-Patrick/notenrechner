import React from 'react';
import { GradeResult, GradeType } from '../types';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResultsPDF from './ResultsPDF';

interface ResultDisplayProps {
  results: GradeResult[];
  average: number | null;
  error: string | null;
  gradeType: GradeType;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, average, error }) => {
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-200 rounded-lg material-shadow animate-fade-in">
        <p className="font-bold">Fehler:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (results.length === 0 || average === null) {
    return null;
  }

  const displayValue = (value: number): string => {
    return value.toFixed(1);
  };

  return (
    <div className="mt-8 material-card animate-fade-in">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Ergebnisse
        </h2>
        <PDFDownloadLink
          document={<ResultsPDF results={results} average={average} />}
          fileName="notenrechner-ergebnisse.pdf"
          className="material-button bg-primary-500 hover:bg-primary-600 flex items-center gap-2"
        >
          {({ loading }) => (
            <>
              <Download className="w-4 h-4" />
              {loading ? 'Generiere PDF...' : 'Als PDF herunterladen'}
            </>
          )}
        </PDFDownloadLink>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Einzelne Bewertungen:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex justify-between items-center material-shadow hover:scale-[1.02] transition-all duration-200"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {result.subjectName || 'Unbenanntes Fach'}:
              </span>
              <div className="text-right">
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {displayValue(result.grade)} <span className="text-sm">({result.weight})</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Gewichteter Durchschnitt:
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 material-shadow px-6 py-3 rounded-lg bg-white dark:bg-gray-700/50">
              {displayValue(average)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;