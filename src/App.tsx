import React, { useState, useEffect } from 'react';
import GradeCalculator from './components/GradeCalculator';
import { ChevronDown, Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm py-6 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
              Notenrechner
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Berechne deinen gewichteten Notendurchschnitt nach Stiwl vorgaben
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl text-sm md:text-base">
            Gib deine Fächer, Noten und Gewichtungen ein, um deinen Durchschnitt zu berechnen.
          </p>
          <div className="animate-bounce mt-2">
            <ChevronDown className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
        </div>
        
        <GradeCalculator />
      </main>
      
      <footer className="py-6 mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-xs md:text-sm">
          <p>© {new Date().getFullYear()} Notenrechner | Alle Rechte vorbehalten</p>
        </div>
      </footer>
    </div>
  );
}

export default App;