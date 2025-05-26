import React from 'react';
import { GradeResult } from '../types';
import { Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResultsPDF from './ResultsPDF';
import { checkDeficits } from '../utils/gradeUtils';

interface ResultDisplayProps {
  results: GradeResult[];
  average: number | null;
  error: string | null;
  gradeType: 'points' | 'grades';
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, average, error, gradeType }) => {
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

  const deficitCheck = checkDeficits(results.map(r => ({
    id: '',
    name: r.subjectName,
    grade: r.grade.toString(),
    weightType: 'multiple',
    multipleWeight: '1',
    percentWeight: '',
    gradeType
  })));

  const statusColors = {
    success: 'bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700 dark:text-green-200',
    warning: 'bg-yellow-100 dark:bg-yellow-900/50 border-yellow-500 text-yellow-700 dark:text-yellow-200',
    error: 'bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700 dark:text-red-200'
  };

  return (
    <div className="mt-8 material-card animate-fade-in">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Ergebnisse
        </h2>
        <PDFDownloadLink
          document={<ResultsPDF results={results} average={average} deficitCheck={deficitCheck} />}
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

      <div className={`p-4 rounded-lg border-l-4 mb-6 ${statusColors[deficitCheck.status]}`}>
        <p className="font-bold">{deficitCheck.message}</p>
        {deficitCheck.deficitCount > 0 && (
          <p className="mt-2 text-sm">
            Anzahl der Defizite: {deficitCheck.deficitCount}
          </p>
        )}
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">Einzelne Noten:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((result, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg flex justify-between items-center material-shadow hover:scale-[1.02] transition-all duration-200 ${
                result.isDeficit ? 'bg-red-50 dark:bg-red-900/30' : 'bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {result.subjectName || 'Unbenanntes Fach'}:
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {result.grade.toFixed(1)} <span className="text-sm">({result.weight})</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Gewichteter Durchschnitt:
          </h3>
          <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 material-shadow px-6 py-3 rounded-lg bg-white dark:bg-gray-700/50">
            {average.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;