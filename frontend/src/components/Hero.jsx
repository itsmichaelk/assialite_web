import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { heroData } from '../data/mock';
import { CheckCircle, Star, Zap } from 'lucide-react';

const Hero = () => {
  const handleCtaClick = () => {
    // Mock action - will redirect to affiliate link in real implementation
    window.open('https://www.digistore24.com/product/593778?aff=Moneymommys', '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Attention Grabber */}
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30 px-6 py-2 text-sm font-semibold">
            <Zap className="w-4 h-4 mr-2" />
            LIMITED TIME: 90% Commission Rate
          </Badge>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Create & Sell Your
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"> Digital Product </span>
            in Just 7 Days
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join the AI Product Challenge and discover how AI does 90% of the work while you earn 90% affiliate commissions
          </p>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm text-slate-300">10,000+ Success Stories</span>
            </div>
            <div className="flex items-center space-x-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-slate-300 ml-2">4.9/5 Rating</span>
            </div>
          </div>
          
          {/* Price & CTA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto mb-12 border border-white/20">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-3xl text-slate-400 line-through">{heroData.originalPrice}</span>
                <span className="text-5xl font-bold text-green-400">{heroData.price}</span>
              </div>
              <p className="text-slate-300">One-time investment • Lifetime access • 90% commissions</p>
            </div>
            
            <Button 
              onClick={handleCtaClick}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl py-6 px-8 rounded-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {heroData.cta} →
            </Button>
            
            <p className="text-xs text-slate-400 mt-4">✅ Instant access • ✅ 30-day guarantee • ✅ Payment plans available</p>
          </div>
          
          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {heroData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-slate-200">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;