import React from 'react';
import { Subject } from '../types';

interface SubjectEntryProps {
  subject: Subject;
  onChange: (updatedSubject: Subject) => void;
  onRemove: () => void;
  isRemovable: boolean;
}

const SubjectEntry: React.FC<SubjectEntryProps> = ({ 
  subject, 
  onChange, 
  onRemove,
  isRemovable
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...subject, [name]: value });
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
      <div className="w-full sm:w-2/5">
        <input
          type="text"
          name="name"
          value={subject.name}
          onChange={handleChange}
          placeholder="Fach"
          className={inputClasses}
        />
      </div>
      
      <div className="w-full sm:w-1/5">
        <input
          type="number"
          name="grade"
          value={subject.grade}
          onChange={handleChange}
          placeholder="Note"
          min="1"
          max="6"
          step="0.1"
          className={inputClasses}
        />
      </div>

      <div className="w-full sm:w-1/5">
        <select
          name="multipleWeight"
          value={subject.multipleWeight}
          onChange={handleChange}
          className={inputClasses}
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
          className="w-full sm:w-auto p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors duration-200 flex items-center justify-center"
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