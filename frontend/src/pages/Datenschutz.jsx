import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Datenschutz = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="container mx-auto px-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zur Startseite</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">Datenerfassung auf dieser Website</h3>
            <p className="mb-4">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>

            <p className="mb-4">
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
              z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>

            <p className="mb-6">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
              IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder 
              Uhrzeit des Seitenaufrufs).
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Hosting</h2>
            <p className="mb-6">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:<br />
              <strong>[Name Ihres Hosting-Anbieters]</strong><br />
              Die Server befinden sich in Deutschland/EU. Weitere Details finden Sie in der Datenschutzerklärung 
              des Hosting-Anbieters.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Datenschutz</h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre 
              personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie 
              dieser Datenschutzerklärung.
            </p>

            <p className="mb-6">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene 
              Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung 
              erläutert, welche Daten wir erheben und wofür wir sie nutzen.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">Hinweis zur verantwortlichen Stelle</h3>
            <div className="bg-slate-50 p-6 rounded-lg mb-6">
              <p className="mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <p className="mb-2"><strong>[Ihr vollständiger Name]</strong></p>
              <p className="mb-2">[Ihre Straße und Hausnummer]</p>
              <p className="mb-2">[PLZ] [Ihre Stadt]</p>
              <p className="mb-2">Deutschland</p>
              <p className="mb-2">E-Mail: [Ihre E-Mail-Adresse]</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Server-Log-Dateien</h3>
            <p className="mb-4">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
              die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc ml-6 mb-6">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Affiliate Marketing</h2>
            <p className="mb-4">
              Diese Website nimmt am Affiliate-Marketing teil. Dabei werden Produkte und Dienstleistungen von 
              Drittanbietern beworben. Wenn Sie über unsere Links einen Kauf tätigen, erhalten wir möglicherweise 
              eine Provision.
            </p>
            <p className="mb-6">
              Die beworbenen Produkte werden über externe Anbieter wie Digistore24 abgewickelt. Beim Kaufvorgang 
              werden Ihre Daten direkt an den jeweiligen Anbieter übertragen und dort nach deren Datenschutzbestimmungen 
              verarbeitet.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Ihre Rechte</h2>
            <p className="mb-4">Sie haben folgende Rechte:</p>
            <ul className="list-disc ml-6 mb-6">
              <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
              <li>Recht auf Berichtigung unrichtiger Daten</li>
              <li>Recht auf Löschung Ihrer Daten</li>
              <li>Recht auf Einschränkung der Datenverarbeitung</li>
              <li>Recht auf Datenübertragbarkeit</li>
              <li>Recht auf Widerspruch gegen die Datenverarbeitung</li>
              <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Kontakt</h2>
            <p className="mb-6">
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br />
              <strong>E-Mail:</strong> [Ihre E-Mail-Adresse]
            </p>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-8">
              <p className="text-yellow-800 font-semibold mb-2">⚠️ Wichtiger Hinweis:</p>
              <p className="text-yellow-700">
                Diese Datenschutzerklärung ist ein Grundgerüst. Bitte ersetzen Sie alle Platzhalter durch Ihre 
                tatsächlichen Angaben und passen Sie den Text an Ihre spezifischen Datenverarbeitungsaktivitäten an. 
                Bei Unsicherheiten konsultieren Sie einen Rechtsanwalt für Datenschutzrecht.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;