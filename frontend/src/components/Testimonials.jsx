import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { testimonialsData } from '../data/mock';

const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">
            ERFOLGSGESCHICHTEN
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Echte Menschen, Echte Ergebnisse
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Sieh, wie unsere Teilnehmer ihr Leben mit der AI Produkt Challenge verwandelt haben
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 overflow-hidden">
              <CardContent className="p-8">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </blockquote>
                
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-3 border-slate-200"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                </div>
                
                {/* Earnings Badge */}
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {testimonial.earnings}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Join These Success Stories?
          </p>
          <button 
            onClick={() => window.open('https://www.digistore24.com/product/593778?aff=Moneymommys', '_blank')}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl py-4 px-8 rounded-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Your Success Story Today →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;