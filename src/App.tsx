import React, { useState, useEffect } from 'react';
import GradeCalculator from './components/GradeCalculator';
import PrivacyPolicy from './components/PrivacyPolicy';
import { ChevronDown, Moon, Sun, Eye } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [highContrastMode, setHighContrastMode] = useState(() => {
    const savedMode = localStorage.getItem('highContrastMode');
    return savedMode ? JSON.parse(savedMode) : false;
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

  useEffect(() => {
    if (highContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrastMode', JSON.stringify(highContrastMode));
  }, [highContrastMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (highContrastMode) setHighContrastMode(false);
  };

  const toggleHighContrastMode = () => {
    setHighContrastMode(!highContrastMode);
    if (darkMode) setDarkMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 high-contrast:from-white high-contrast:to-white transition-colors duration-200">
      <header className="bg-white/90 dark:bg-gray-800/90 high-contrast:bg-black backdrop-blur-sm shadow-md py-6 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-200 high-contrast:from-white high-contrast:to-white bg-clip-text text-transparent">
              Punkterechner
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300 high-contrast:text-white text-sm md:text-base">
              Berechne deinen gewichteten Punktedurchschnitt nach vorgaben des VL2
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleHighContrastMode}
              className="material-button bg-gray-100 dark:bg-gray-700 high-contrast:bg-white high-contrast:border-2 high-contrast:border-black hover:bg-gray-200 dark:hover:bg-gray-600 p-3"
              aria-label="Toggle high contrast mode"
            >
              <Eye className="h-5 w-5 text-gray-600 dark:text-gray-300 high-contrast:text-black" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="material-button bg-gray-100 dark:bg-gray-700 high-contrast:bg-white high-contrast:border-2 high-contrast:border-black hover:bg-gray-200 dark:hover:bg-gray-600 p-3"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="text-gray-700 dark:text-gray-300 high-contrast:text-black mb-4 max-w-2xl text-sm md:text-base">
            Gib deine Fächer, Punkte und Gewichtungen ein, um deinen Durchschnitt zu berechnen.
          </p>
          <div className="animate-bounce mt-2">
            <ChevronDown className="h-6 w-6 text-primary-500 dark:text-primary-400 high-contrast:text-black" />
          </div>
        </div>
        
        <GradeCalculator />
      </main>
      
      <footer className="py-6 mt-12 bg-white/90 dark:bg-gray-800/90 high-contrast:bg-black backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 high-contrast:border-black transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 high-contrast:text-white text-xs md:text-sm">
            © {new Date().getFullYear()} Punkterechner | Alle Rechte vorbehalten |{' '}
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 high-contrast:text-white high-contrast:underline underline"
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