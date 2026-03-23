import { useEffect, useRef, useState } from 'react';
import { MapPin, Bed, Bath, Square, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const projectData = [
  {
    id: 1,
    key: 'dubai',
    image: 'images/project-dubai.jpg',
    developer: 'London Gate',
    featured: true,
  },
  {
    id: 2,
    key: 'miami',
    image: 'images/project-miami.jpg',
    developer: 'JDS Development',
    featured: true,
  },
  {
    id: 3,
    key: 'spain',
    image: 'images/project-costadelsol.jpg',
    developer: 'Zenith Developments',
    featured: false,
  },
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projectData.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

  const currentProject = projectData[activeIndex];

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-dark-blue overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue via-deep-blue to-dark-blue" />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${currentProject.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(100px)',
            transition: 'background-image 0.8s ease-out',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
            <div>
              <div 
                className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold text-sm tracking-[0.3em] uppercase font-body font-medium">
                  {t('projects.label')}
                </span>
              </div>

              <h2 
                className={`font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {t('projects.title1')}{' '}
                <span className="text-gold">{t('projects.title2')}</span>
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div 
              className={`flex gap-3 mt-6 lg:mt-0 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <button 
                onClick={prevProject}
                className="w-12 h-12 border border-white/20 rounded-sm flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextProject}
                className="w-12 h-12 border border-white/20 rounded-sm flex items-center justify-center text-white hover:border-gold hover:text-gold transition-colors duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Project Display */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div 
              className={`relative transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="relative overflow-hidden rounded-sm">
                <img 
                  src={currentProject.image}
                  alt={t(`projects.${currentProject.key}.name`)}
                  className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/60 to-transparent" />

                {currentProject.featured && (
                  <div className="absolute top-4 left-4 bg-gold text-dark-blue px-4 py-2 text-sm font-body font-semibold rounded-sm">
                    {t('projects.featured')}
                  </div>
                )}

                <div className="absolute bottom-4 right-4 bg-dark-blue/90 backdrop-blur-sm text-white px-6 py-3 rounded-sm">
                  <div className="text-gold font-display text-xl">
                    {language === 'nl' && currentProject.key === 'dubai' && 'Vanaf AED 2.5M'}
                    {language === 'nl' && currentProject.key === 'miami' && 'Vanaf $2M'}
                    {language === 'nl' && currentProject.key === 'spain' && 'Vanaf €499K'}
                    {language === 'en' && currentProject.key === 'dubai' && 'From AED 2.5M'}
                    {language === 'en' && currentProject.key === 'miami' && 'From $2M'}
                    {language === 'en' && currentProject.key === 'spain' && 'From €499K'}
                    {language === 'fr' && currentProject.key === 'dubai' && 'À partir de AED 2.5M'}
                    {language === 'fr' && currentProject.key === 'miami' && 'À partir de $2M'}
                    {language === 'fr' && currentProject.key === 'spain' && 'À partir de €499K'}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 w-full h-full border border-gold/30 rounded-sm -z-10" />
            </div>

            {/* Content */}
            <div 
              className={`transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="text-gold text-sm font-body tracking-wider uppercase mb-3">
                {t('projects.by')} {currentProject.developer}
              </div>

              <h3 className="font-display text-3xl lg:text-4xl text-white mb-4">
                {t(`projects.${currentProject.key}.name`)}
              </h3>

              <div className="flex items-center gap-2 text-white/60 mb-6">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="font-body text-sm">{t(`projects.${currentProject.key}.location`)}</span>
              </div>

              <p className="text-white/70 font-body font-light leading-relaxed mb-8">
                {t(`projects.${currentProject.key}.description`)}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/5 rounded-sm">
                  <Bed className="w-5 h-5 text-gold mx-auto mb-2" />
                  <span className="text-white/70 text-sm font-body">1-4 BR</span>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-sm">
                  <Bath className="w-5 h-5 text-gold mx-auto mb-2" />
                  <span className="text-white/70 text-sm font-body">2-5 Bath</span>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-sm">
                  <Square className="w-5 h-5 text-gold mx-auto mb-2" />
                  <span className="text-white/70 text-sm font-body">800-4000 sqft</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <div className="text-white/50 text-sm font-body mb-1">{t('projects.completion')}</div>
                  <div className="text-white font-display text-xl">2027</div>
                </div>

                <button className="flex items-center gap-2 bg-gold hover:bg-gold-light text-dark-blue font-semibold px-6 py-3 rounded-sm transition-all duration-300 hover:shadow-glow ml-auto">
                  {t('projects.infoBtn')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {projectData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === activeIndex 
                    ? 'w-12 bg-gold' 
                    : 'w-6 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {projectData.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setActiveIndex(index)}
                className={`group cursor-pointer p-4 bg-white/5 border rounded-sm transition-all duration-500 hover-lift ${
                  index === activeIndex 
                    ? 'border-gold bg-white/10' 
                    : 'border-white/10 hover:border-gold/50'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={project.image}
                    alt={t(`projects.${project.key}.name`)}
                    className="w-20 h-20 object-cover rounded-sm"
                  />
                  <div>
                    <h4 className="font-display text-lg text-white group-hover:text-gold transition-colors">
                      {t(`projects.${project.key}.name`)}
                    </h4>
                    <p className="text-white/50 text-sm font-body">{t(`projects.${project.key}.location`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
