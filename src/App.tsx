import React from 'react';
import GradeCalculator from './components/GradeCalculator';
import { ChevronDown } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Notenrechner
          </h1>
          <p className="mt-1 text-gray-600">
            Berechne deinen gewichteten Notendurchschnitt nach Stiwl vorgaben
          </p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <p className="text-gray-700 mb-4 max-w-2xl">
            Gib deine Fächer, Noten und Gewichtungen ein, um deinen Durchschnitt zu berechnen. 
            Du kannst zwischen mehrfacher Gewichtung und prozentualer Gewichtung wählen.
          </p>
          <div className="animate-bounce mt-2">
            <ChevronDown className="h-6 w-6 text-blue-500" />
          </div>
        </div>
        
        <GradeCalculator />
      </main>
      
      <footer className="py-6 mt-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Notenrechner | Alle Rechte vorbehalten</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
