import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
  const { t, faqs } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden" id="faq-section">
      {/* Background ambient accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 rounded-full text-amber-400 text-xs sm:text-sm font-semibold">
            <HelpCircle className="h-4 w-4" />
            <span>{t.faq.pill}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.faq.heading}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion Lists */}
        <div className="space-y-4 text-left" id="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-950 rounded-2xl border border-slate-800/80 shadow-md overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4.5 sm:py-5 flex items-center justify-between text-left hover:bg-slate-900 transition-colors focus:outline-none"
                  id={`faq-btn-${index}`}
                >
                  <span className="font-extrabold text-sm sm:text-base leading-tight text-slate-100 pr-4">
                    {faq.q}
                  </span>
                  <span className="bg-slate-900 p-1.5 rounded-lg text-amber-400">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-950/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support CTA footer box */}
        <div className="mt-12 bg-slate-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-100">{t.faq.helpHeading}</h4>
            <p className="text-xs text-slate-400 mt-1">{t.faq.helpDesc}</p>
          </div>
          <a
            href="https://zalo.me/0905123456"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-all uppercase tracking-wider shadow-lg transition"
          >
            {t.faq.zaloCta}
          </a>
        </div>

      </div>
    </section>
  );
}
