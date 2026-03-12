import { useEffect, useRef, useState } from 'react';
import { 
  TrendingDown, 
  Calendar, 
  TrendingUp, 
  Palette, 
  Sparkles, 
  Receipt,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const benefitIcons = [
  TrendingDown,
  Calendar,
  TrendingUp,
  Palette,
  Sparkles,
  Receipt,
];

const benefitKeys = [
  'lowerPrice',
  'flexible',
  'appreciation',
  'customization',
  'amenities',
  'tax',
];

const benefitStats = [
  { stat: '10-30%', labelKey: 'statLabel' },
  { stat: '20/60/20', labelKey: 'statLabel' },
  { stat: '8-12%', labelKey: 'statLabel' },
  { stat: '100%', labelKey: 'statLabel' },
  { stat: '5★', labelKey: 'statLabel' },
  { stat: '0%', labelKey: 'statLabel' },
];

export default function Benefits() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="benefits"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-deep-blue overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div 
              className={`flex items-center justify-center gap-3 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold text-sm tracking-[0.3em] uppercase font-body font-medium">
                {t('benefits.label')}
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>

            <h2 
              className={`font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('benefits.title1')}{' '}
              <span className="text-gold">{t('benefits.title2')}</span>{' '}
              {t('benefits.title3')}
            </h2>

            <p 
              className={`text-white/60 font-body font-light max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('benefits.description')}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitKeys.map((key, index) => {
              const Icon = benefitIcons[index];
              const statData = benefitStats[index];
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={index}
                  className={`group relative p-6 lg:p-8 bg-white/[0.03] border border-white/10 rounded-sm cursor-pointer transition-all duration-500 hover-lift ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gold/5 rounded-sm transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Stat */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-sm bg-gold/10 flex items-center justify-center transition-all duration-500 ${
                        isHovered ? 'bg-gold/20 scale-110' : ''
                      }`}>
                        <Icon className="w-7 h-7 text-gold" />
                      </div>
                      
                      <div className="text-right">
                        <div className="font-display text-2xl text-gold">{statData.stat}</div>
                        <div className="text-white/40 text-xs font-body">{t(`benefits.items.${key}.${statData.labelKey}`)}</div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                      {t(`benefits.items.${key}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 font-body font-light text-sm leading-relaxed mb-4">
                      {t(`benefits.items.${key}.description`)}
                    </p>

                    {/* Learn More Link */}
                    <div className={`flex items-center gap-2 text-gold text-sm font-body transition-all duration-500 ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}>
                      <span>Meer info</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 overflow-hidden transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute top-0 right-0 w-px h-8 bg-gold/50" />
                    <div className="absolute top-0 right-0 w-8 h-px bg-gold/50" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div 
            className={`mt-16 text-center transition-all duration-700 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-white/50 font-body text-sm mb-4">
              {t('benefits.ctaText')}
            </p>
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-dark-blue font-semibold px-8 py-4 rounded-sm transition-all duration-300 hover:shadow-glow"
            >
              {t('benefits.ctaBtn')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
