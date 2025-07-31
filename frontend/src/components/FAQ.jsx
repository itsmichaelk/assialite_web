import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { faqData } from '../data/mock';

const FAQ = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get answers to the most common questions about the AI Product Challenge
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200 rounded-2xl px-6 py-2 hover:shadow-lg transition-shadow bg-slate-50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* CTA after FAQ */}
        <div className="text-center mt-16 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Our support team is here to help you succeed
          </p>
          <button 
            onClick={() => window.open('https://www.digistore24.com/product/593778?aff=Moneymommys', '_blank')}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl py-4 px-8 rounded-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;