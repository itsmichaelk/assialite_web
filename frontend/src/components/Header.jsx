import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Zap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCtaClick = () => {
    window.open('https://www.digistore24.com/product/593778?aff=Moneymommys', '_blank');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-10 h-10 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">AI Produkt Challenge</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('benefits')} 
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Vorteile
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Erfolgsgeschichten
            </button>
            <button 
              onClick={() => scrollToSection('bonus')} 
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Boni
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={handleCtaClick}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Jetzt starten
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Vorteile
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Erfolgsgeschichten
              </button>
              <button 
                onClick={() => scrollToSection('bonus')} 
                className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Boni
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-left text-slate-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                FAQ
              </button>
              <Button 
                onClick={handleCtaClick}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg mt-4"
              >
                Jetzt starten
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;