import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, TrendingUp, Percent, Building2, Users, Globe, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const benefits = [
    { icon: Percent, text: t('hero.benefit1') },
    { icon: TrendingUp, text: t('hero.benefit2') },
    { icon: Building2, text: t('hero.benefit3') },
    { icon: Globe, text: t('hero.benefit4') },
    { icon: Users, text: t('hero.benefit5') },
    { icon: Shield, text: t('hero.benefit6') },
    { icon: Sparkles, text: t('hero.benefit7') },
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        const parallaxValue = scrollY * 0.3;
        imageRef.current.style.transform = `translateY(${parallaxValue}px) scale(${1 + scrollY * 0.0002})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full transition-transform duration-100"
        style={{ willChange: 'transform' }}
      >
        <img 
          src="images/hero-bg.jpg" 
          alt="Luxury Architecture"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/60 via-dark-blue/70 to-dark-blue" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/80 via-transparent to-dark-blue/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Logo */}
              <div 
                className={`flex justify-center lg:justify-start mb-10 transition-all duration-1000 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 bg-gold/50 rounded-full blur-3xl scale-150" />
                  <img 
                    src="images/whitestar-logo-enhanced.png" 
                    alt="Whitestar Capital"
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.9)]"
                  />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                <span 
                  className={`block transition-all duration-1000 delay-500 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  {t('hero.title1')}
                </span>
                <span 
                  className={`block text-gold transition-all duration-1000 delay-600 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  {t('hero.title2')}
                </span>
                <span 
                  className={`block text-2xl sm:text-3xl md:text-4xl text-white/80 mt-2 transition-all duration-1000 delay-700 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  {t('hero.subtitle')}
                </span>
              </h1>

              {/* Subtitle */}
              <p 
                className={`text-white/70 text-lg font-body font-light mb-8 transition-all duration-1000 delay-800 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {t('hero.description')}
              </p>

              {/* CTA Buttons */}
              <div 
                className={`flex flex-wrap gap-4 transition-all duration-1000 delay-900 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <Button 
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-dark-blue font-semibold px-8 py-6 text-base rounded-sm transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
                  onClick={scrollToAbout}
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {t('hero.exploreBtn')}
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base rounded-sm backdrop-blur-sm transition-all duration-300"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('hero.contactBtn')}
                </Button>
              </div>
            </div>

            {/* Right Content - Benefits */}
            <div 
              className={`hidden lg:block transition-all duration-1000 delay-1000 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-8">
                <h3 className="font-display text-xl text-gold mb-6">
                  {t('hero.benefitsTitle')}
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div 
                        key={index}
                        className={`flex items-center gap-4 transition-all duration-700 ${
                          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}
                        style={{ transitionDelay: `${1100 + index * 100}ms` }}
                      >
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-white/90 font-body">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <button 
          onClick={scrollToAbout}
          className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors duration-300 animate-bounce"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-px h-32 bg-gradient-to-b from-gold/50 to-transparent hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-32 h-px bg-gradient-to-r from-gold/50 to-transparent hidden lg:block" />
    </section>
  );
}
