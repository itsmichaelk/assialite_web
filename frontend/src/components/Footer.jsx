import React from 'react';
import { Zap, Mail, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-10 h-10 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">AI Produkt Challenge</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Verwandle dein Leben mit KI-gestützter digitaler Produkterstellung. Starte dein Erfolg in nur 7 Tagen.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Schnelllinks</h4>
            <ul className="space-y-2">
              <li><button onClick={() => document.getElementById('benefits')?.scrollIntoView({behavior: 'smooth'})} className="text-slate-400 hover:text-white transition-colors">Vorteile</button></li>
              <li><button onClick={() => document.getElementById('testimonials')?.scrollIntoView({behavior: 'smooth'})} className="text-slate-400 hover:text-white transition-colors">Erfolgsgeschichten</button></li>
              <li><button onClick={() => document.getElementById('bonus')?.scrollIntoView({behavior: 'smooth'})} className="text-slate-400 hover:text-white transition-colors">Boni</button></li>
              <li><button onClick={() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})} className="text-slate-400 hover:text-white transition-colors">FAQ</button></li>
            </ul>
          </div>
          
          {/* Features */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Was du erhältst</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span>7-Tage Challenge</span>
              </li>
              <li className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-green-400" />
                <span>KI Automatisierung</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>90% Provision</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-green-400" />
                <span>Lebenslanger Support</span>
              </li>
            </ul>
          </div>
          
          {/* CTA */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Bereit zum Start?</h4>
            <p className="text-slate-400 mb-4">Schließe dich tausenden erfolgreichen Teilnehmern an.</p>
            <button 
              onClick={() => window.open('https://www.digistore24.com/product/593778?aff=Moneymommys', '_blank')}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 w-full"
            >
              Jetzt starten →
            </button>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-slate-400">
                © 2025 AI Produkt Challenge. Alle Rechte vorbehalten. | 
                <span className="text-green-400 ml-1">Powered by Dominik Greger</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Haftungsausschluss: Ergebnisse können variieren. Erfolg hängt von individueller Anstrengung und Marktbedingungen ab.
              </p>
            </div>
            
            {/* Legal Links */}
            <div className="flex space-x-6">
              <Link 
                to="/impressum" 
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Impressum
              </Link>
              <Link 
                to="/datenschutz" 
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;