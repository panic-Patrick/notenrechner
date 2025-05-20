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
    onChange({
      ...subject,
      [name]: value
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-md">
      <input
        type="text"
        name="name"
        value={subject.name}
        onChange={handleChange}
        placeholder="Fach"
        className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      <input
        type="number"
        name="grade"
        value={subject.grade}
        onChange={handleChange}
        placeholder="Note"
        min="1"
        max="6"
        step="0.1"
        className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <select
        name="percentWeight"
        value={subject.percentWeight}
        onChange={handleChange}
        className="w-28 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">Gewichtung</option>
        <option value="20">20%</option>
        <option value="25">25%</option>
        <option value="30">30%</option>
        <option value="35">35%</option>
        <option value="40">40%</option>
        <option value="50">50%</option>
      </select>
      
      {isRemovable && (
        <button
          onClick={onRemove}
          className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
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