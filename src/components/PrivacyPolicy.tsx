import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto material-shadow">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Datenschutzerklärung</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">1. Datenschutz auf einen Blick</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Der Notenrechner wurde mit besonderem Fokus auf Datenschutz entwickelt. Alle Berechnungen und Datenspeicherungen erfolgen ausschließlich lokal in Ihrem Browser.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">2. Keine Datenspeicherung auf Servern</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Es werden keinerlei personenbezogene Daten oder Berechnungsergebnisse auf externen Servern gespeichert. Alle Eingaben und Berechnungen bleiben ausschließlich auf Ihrem Gerät.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">3. Lokale Speicherung</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Die einzige Speicherung, die stattfindet, ist die Einstellung des Dark Mode in Ihrem Browser (localStorage). Diese Einstellung enthält keine personenbezogenen Daten.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">4. Cookies</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Diese Anwendung verwendet keine Cookies oder ähnliche Tracking-Technologien.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">5. Hosting</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Die Anwendung wird auf Netlify gehostet. Dabei werden standardmäßige Server-Logs erstellt, die IP-Adressen und grundlegende Zugriffsinformationen enthalten können. Diese Logs werden nach 30 Tagen automatisch gelöscht.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">6. Ihre Rechte</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Da keine personenbezogenen Daten gespeichert werden, entfallen die üblichen DSGVO-Rechte wie Auskunft, Löschung etc. in diesem Kontext.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">7. Kontakt</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Bei Fragen zum Datenschutz können Sie sich an den Betreiber der Website wenden.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;