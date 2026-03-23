import { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowRight, TrendingUp, Building, Sun, Landmark, Castle, Mountain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const locationData = [
  {
    id: 'dubai',
    icon: Building,
    color: 'from-amber-500/20 to-orange-600/20',
  },
  {
    id: 'miami',
    icon: TrendingUp,
    color: 'from-blue-500/20 to-cyan-600/20',
  },
  {
    id: 'costadelsol',
    icon: Sun,
    color: 'from-yellow-500/20 to-amber-600/20',
  },
  {
    id: 'turkey',
    icon: Castle,
    color: 'from-red-500/20 to-orange-600/20',
  },
  {
    id: 'uk',
    icon: Landmark,
    color: 'from-purple-500/20 to-blue-600/20',
  },
  {
    id: 'oman',
    icon: Mountain,
    color: 'from-emerald-500/20 to-teal-600/20',
  },
];

const locationImages: Record<string, string> = {
  dubai: 'images/dubai-location.jpg',
  miami: 'images/miami-location.jpg',
  costadelsol: 'images/costadelsol-location.jpg',
  turkey: 'images/turkey-location.jpg',
  uk: 'images/uk-location.jpg',
  oman: 'images/oman-location.jpg',
};

export default function Locations() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

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

  const getLocationName = (id: string) => {
    const names: Record<string, Record<string, string>> = {
      dubai: { nl: 'Dubai', en: 'Dubai', fr: 'Dubaï' },
      miami: { nl: 'Miami', en: 'Miami', fr: 'Miami' },
      costadelsol: { nl: 'Costa del Sol', en: 'Costa del Sol', fr: 'Costa del Sol' },
      turkey: { nl: 'Turkije', en: 'Turkey', fr: 'Turquie' },
      uk: { nl: 'Verenigd Koninkrijk', en: 'United Kingdom', fr: 'Royaume-Uni' },
      oman: { nl: 'Oman', en: 'Oman', fr: 'Oman' },
    };
    return names[id]?.[language] || names[id]?.en || id;
  };

  return (
    <section 
      id="locations"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-dark-blue overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-blue via-deep-blue to-dark-blue" />

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
                {t('locations.label')}
              </span>
              <div className="w-12 h-[1px] bg-gold" />
            </div>

            <h2 
              className={`font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('locations.title1')}{' '}
              <span className="text-gold">{t('locations.title2')}</span>
            </h2>

            <p 
              className={`text-white/60 font-body font-light max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t('locations.description')}
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {locationData.map((location, index) => {
              const Icon = location.icon;
              const isActive = activeIndex === index;
              const locKey = location.id as 'dubai' | 'miami' | 'costadelsol' | 'turkey' | 'uk' | 'oman';

              return (
                <div
                  key={location.id}
                  className={`group relative overflow-hidden rounded-sm cursor-pointer transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Background Image */}
                  <div className="relative h-[450px] lg:h-[500px] overflow-hidden">
                    <img 
                      src={locationImages[location.id]}
                      alt={getLocationName(location.id)}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isActive ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/60 to-transparent transition-opacity duration-500 ${
                      isActive ? 'opacity-90' : 'opacity-70'
                    }`} />
                    
                    {/* Color Tint */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${location.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-end">
                    {/* Icon & Tagline */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-gold text-xs font-body tracking-wider uppercase">
                        {t(`locations.${locKey}.tagline`)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl lg:text-3xl text-white mb-3">
                      {getLocationName(location.id)}
                    </h3>

                    {/* Description - Shows on hover */}
                    <p className={`text-white/70 font-body font-light text-sm mb-4 transition-all duration-500 ${
                      isActive ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0'
                    } overflow-hidden`}>
                      {t(`locations.${locKey}.description`)}
                    </p>

                    {/* Highlights */}
                    <div className={`flex flex-wrap gap-2 mb-4 transition-all duration-500 delay-100 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      {[0, 1, 2].map((hIndex) => (
                        <span 
                          key={hIndex}
                          className="text-xs text-white/70 bg-white/10 px-3 py-1 rounded-full font-body"
                        >
                          {t(`locations.${locKey}.highlights.${hIndex}`)}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button className={`flex items-center gap-2 text-gold font-body font-medium text-sm group/btn transition-all duration-500 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <MapPin className="w-4 h-4" />
                      {t('locations.explore')} {getLocationName(location.id)}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Border Effect */}
                  <div className={`absolute inset-0 border-2 rounded-sm transition-colors duration-500 ${
                    isActive ? 'border-gold/50' : 'border-transparent'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
