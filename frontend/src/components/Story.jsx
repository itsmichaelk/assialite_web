import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, TrendingUp } from 'lucide-react';

const Story = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">
              MEINE GESCHICHTE
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Das bin ich
            </h2>
          </div>
          
          <Card className="overflow-hidden shadow-2xl border-0">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=600&fit=crop&crop=face" 
                    alt="Meine Geschichte"
                    className="w-full h-full object-cover min-h-[500px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Content Section */}
                <div className="p-12 flex flex-col justify-center bg-white">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Von finanziellen Sorgen zur finanziellen Freiheit
                    </h3>
                  </div>
                  
                  <div className="space-y-6 text-slate-700 leading-relaxed">
                    <p className="text-lg">
                      Ich kenne das Gefühl, nachts wach zu liegen und sich Sorgen über die Rechnungen zu machen. 
                      Monatelang kämpfte ich damit, meiner Familie das Leben zu bieten, das sie verdient.
                    </p>
                    
                    <p className="text-lg">
                      Trotz harter Arbeit reichte das Geld einfach nie aus. Jeder Monat war ein Kampf, 
                      und ich fühlte mich wie ein Versager als Familienvater.
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                      <p className="text-lg font-semibold text-slate-800 mb-2">
                        Dann entdeckte ich die AI Produkt Challenge...
                      </p>
                      <p className="text-lg">
                        In nur 7 Tagen veränderte sich alles. Die KI machte die schwere Arbeit, 
                        und ich konnte endlich das Einkommen erzielen, von dem ich geträumt hatte.
                      </p>
                    </div>
                    
                    <p className="text-lg">
                      Heute kann ich nicht nur alle Rechnungen bezahlen, sondern meiner Familie 
                      auch die Extras bieten, die das Leben lebenswert machen. Diese Challenge 
                      hat mein Leben völlig verändert.
                    </p>
                    
                    <div className="flex items-center space-x-4 pt-6">
                      <div className="flex items-center space-x-2 text-green-600">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-semibold">Über €8.000/Monat</span>
                      </div>
                      <div className="flex items-center space-x-2 text-red-500">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="font-semibold">Glückliche Familie</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <p className="text-slate-600 italic">
                      "Wenn ich es schaffen konnte, kannst du es auch. Lass mich dir zeigen, 
                      wie auch du dein Leben verändern kannst."
                    </p>
                    <div className="mt-4">
                      <p className="font-bold text-slate-900">— Dein AI Challenge Mentor</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">
                Bereit für deine eigene Erfolgsgeschichte?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Du musst nicht länger kämpfen. Die AI Produkt Challenge kann auch dein Leben verändern.
              </p>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-yellow-300 font-semibold">
                  💡 Ratenzahlung: Starte noch heute, zahle nach ersten Erfolgen ab!
                </p>
              </div>
              <button 
                onClick={() => window.open('https://www.digistore24.com/product/593778?aff=Moneymommys', '_blank')}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl py-6 px-12 rounded-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Meine Erfolgsgeschichte starten →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;