import React from 'react';
import * as Icons from 'lucide-react';
import { benefitsData } from '../data/mock';

const Benefits = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Warum die AI Produkt Challenge wählen?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Entdecke die einzigartigen Vorteile, die dies zur profitabelsten Gelegenheit im digitalen Marketing machen
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => {
            const IconComponent = Icons[benefit.icon];
            
            return (
              <div 
                key={index}
                className="group bg-slate-50 rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100"
              >
                <div className="bg-gradient-to-br from-blue-500 to-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;