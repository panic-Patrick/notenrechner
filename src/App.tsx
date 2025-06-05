import React, { useState, useEffect } from 'react';
import GradeCalculator from './components/GradeCalculator';
import PrivacyPolicy from './components/PrivacyPolicy';
import { ChevronDown, Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true; // Set dark mode as default
  });
  const [showPrivacy, setShowPrivacy] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50/30 via-primary-100/30 to-primary-200/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg')] opacity-5 bg-cover bg-center fixed pointer-events-none" />
      
      <header className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 shadow-lg py-6 sticky top-0 z-50 transition-all duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent">
              Notenrechner
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Berechne deinen gewichteten Punktedurchschnitt nach vorgaben des VL2
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="material-button bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 p-3 backdrop-blur-lg"
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
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl text-sm md:text-base">
            Gib deine Fächer, Noten und Gewichtungen ein, um deinen Durchschnitt zu berechnen.
          </p>
          <div className="animate-bounce mt-2">
            <ChevronDown className="h-6 w-6 text-primary-500 dark:text-primary-400" />
          </div>
        </div>
        
        <GradeCalculator />
      </main>
      
      <footer className="py-6 mt-12 backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-t border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} Notenrechner | Alle Rechte vorbehalten |{' '}
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
            >
              Datenschutzerklärung
            </button>
          </p>
        </div>
      </footer>

      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}

export default App;