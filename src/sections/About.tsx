import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Shield, Clock, Wallet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const stats = [
    { value: '60%', label: t('about.stat1'), icon: TrendingUp },
    { value: '25%', label: t('about.stat2'), icon: Shield },
    { value: '€400K', label: t('about.stat3'), icon: Wallet },
    { value: '8-12%', label: t('about.stat4'), icon: Clock },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(current);
            return newCounters;
          });
        }, duration / steps);
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      }
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      }
    };

    const imageContainer = imageRef.current;
    if (imageContainer) {
      imageContainer.addEventListener('mousemove', handleMouseMove);
      imageContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener('mousemove', handleMouseMove);
        imageContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-dark-blue overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              {/* Section Label */}
              <div 
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold text-sm tracking-[0.3em] uppercase font-body font-medium">
                  {t('about.label')}
                </span>
              </div>

              {/* Title */}
              <h2 
                className={`font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {t('about.title1')}{' '}
                <span className="text-gold">{t('about.title2')}</span>{' '}
                {t('about.title3')}
              </h2>

              {/* Description */}
              <div 
                className={`space-y-4 mb-10 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <p className="text-white/70 font-body font-light leading-relaxed">
                  {t('about.description1')}
                </p>
                <p className="text-white/70 font-body font-light leading-relaxed">
                  {t('about.description2')}
                </p>
              </div>

              {/* Stats Grid */}
              <div 
                className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const displayValue = stat.value.includes('%') 
                    ? `${counters[index]}%` 
                    : stat.value.includes('€') 
                      ? `€${counters[index]}K` 
                      : `${counters[index]}%`;
                  
                  return (
                    <div 
                      key={index}
                      className="group p-5 bg-white/5 border border-white/10 rounded-sm hover:border-gold/50 hover:bg-white/10 transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 text-gold mb-3" />
                      <div className="font-display text-2xl sm:text-3xl text-white mb-1">
                        {displayValue}
                      </div>
                      <div className="text-white/50 text-sm font-body">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div 
                ref={imageRef}
                className={`relative transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ 
                  transition: 'transform 0.1s ease-out, opacity 0.7s ease-out, scale 0.7s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-sm">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/about-building.jpg`}
                    alt="Modern Architecture"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/50 to-transparent" />
                </div>

                {/* Decorative Frame */}
                <div className="absolute -top-4 -right-4 w-full h-full border border-gold/30 rounded-sm -z-10" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gold/30 rounded-sm -z-10" />

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-gold text-dark-blue px-6 py-4 rounded-sm shadow-glow">
                  <div className="font-display text-2xl">{t('about.badge1')}</div>
                  <div className="text-sm font-body font-medium">{t('about.badge2')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
