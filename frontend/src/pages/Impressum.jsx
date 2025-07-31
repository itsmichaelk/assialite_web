import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Impressum = () => {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Impressum</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Angaben gemäß § 5 TMG</h2>
            
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="mb-2"><strong>[Ihr vollständiger Name]</strong></p>
              <p className="mb-2">[Ihre Straße und Hausnummer]</p>
              <p className="mb-2">[PLZ] [Ihre Stadt]</p>
              <p className="mb-2">Deutschland</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Kontakt</h2>
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="mb-2"><strong>E-Mail:</strong> [Ihre E-Mail-Adresse]</p>
              <p className="mb-2"><strong>Telefon:</strong> [Ihre Telefonnummer] (optional)</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Umsatzsteuer-ID</h2>
            <p className="mb-6">
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
              <strong>[Ihre USt-IdNr.]</strong> (falls vorhanden)
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="mb-2"><strong>[Ihr vollständiger Name]</strong></p>
              <p className="mb-2">[Ihre Straße und Hausnummer]</p>
              <p className="mb-2">[PLZ] [Ihre Stadt]</p>
              <p className="mb-2">Deutschland</p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">EU-Streitschlichtung</h2>
            <p className="mb-6">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mb-6">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="mb-6">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Haftung für Inhalte</h2>
            <p className="mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mb-6">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der 
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen 
              werden wir diese Inhalte umgehend entfernen.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Haftung für Links</h2>
            <p className="mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
            <p className="mb-6">
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche 
              Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. 
              Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mt-8">
              <p className="text-yellow-800 font-semibold mb-2">⚠️ Wichtiger Hinweis:</p>
              <p className="text-yellow-700">
                Bitte ersetzen Sie alle Platzhalter in eckigen Klammern [wie diese] durch Ihre tatsächlichen 
                Angaben. Ein vollständiges Impressum ist rechtlich vorgeschrieben für alle gewerblichen Websites in Deutschland.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;