import React from 'react';
import { Subject, GradeType } from '../types';

interface SubjectEntryProps {
  subject: Subject;
  onChange: (updatedSubject: Subject) => void;
  onRemove: () => void;
  isRemovable: boolean;
  gradeType: GradeType;
}

const SubjectEntry: React.FC<SubjectEntryProps> = ({ 
  subject, 
  onChange, 
  onRemove,
  isRemovable,
  gradeType
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...subject, [name]: value });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 material-shadow hover:scale-[1.01] transition-all duration-300">
      <div className="w-full sm:w-2/5">
        <input
          type="text"
          name="name"
          value={subject.name}
          onChange={handleChange}
          placeholder="Fach"
          className="material-input"
        />
      </div>
      
      <div className="w-full sm:w-1/5">
        <input
          type="number"
          name="grade"
          value={subject.grade}
          onChange={handleChange}
          placeholder={gradeType === 'points' ? 'Punkte (0-15)' : 'Note (1-6)'}
          min={gradeType === 'points' ? "0" : "1"}
          max={gradeType === 'points' ? "15" : "6"}
          step="0.1"
          className="material-input"
        />
      </div>

      <div className="w-full sm:w-1/5">
        <select
          name="multipleWeight"
          value={subject.multipleWeight}
          onChange={handleChange}
          className="material-input"
        >
          <option value="1">1-fach</option>
          <option value="2">2-fach</option>
          <option value="3">3-fach</option>
          <option value="4">4-fach</option>
        </select>
      </div>
      
      {isRemovable && (
        <button
          onClick={onRemove}
          className="w-full sm:w-auto p-3 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full material-button bg-white dark:bg-gray-800 flex items-center justify-center"
          aria-label="Fach entfernen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SubjectEntry;