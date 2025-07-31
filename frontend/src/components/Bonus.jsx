import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Gift, Plus } from 'lucide-react';
import { bonusModules } from '../data/mock';

const Bonus = () => {
  const totalBonusValue = bonusModules.reduce((sum, bonus) => sum + parseInt(bonus.value.replace('€', '')), 0);

  return (
    <section id="bonus" className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
            <Gift className="w-4 h-4 mr-2" />
            EXKLUSIVE BONI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Erhalte diese Boni im Wert von €{totalBonusValue}
            <span className="text-green-400"> KOSTENLOS</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Wenn du heute beitrittst, erhältst du diese Premium-Bonus-Module ohne Zusatzkosten
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Main Course Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">7-Day AI Product Challenge</h3>
                  <p className="text-slate-300">Complete step-by-step video course</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-400">€1,001</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Plus Sign */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Bonus Modules */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {bonusModules.map((bonus, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
                      BONUS #{index + 1}
                    </Badge>
                    <h4 className="text-xl font-bold text-white mb-3">{bonus.title}</h4>
                    <p className="text-slate-300 mb-4 text-sm leading-relaxed">{bonus.description}</p>
                    <div className="text-2xl font-bold text-green-400">{bonus.value}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Value Summary */}
          <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg border-green-500/30">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Total Package Value</h3>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="text-3xl text-slate-400 line-through">€{1001 + totalBonusValue}</span>
                  <span className="text-5xl font-bold text-green-400">€1,001</span>
                </div>
                <p className="text-slate-300 mb-8">
                  You save €{totalBonusValue} when you join today!
                </p>
                <button 
                  onClick={() => window.open('https://www.digistore24.com/product/593778?aff=Moneymommys', '_blank')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl py-6 px-12 rounded-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Claim Your Bonuses Now →
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Bonus;