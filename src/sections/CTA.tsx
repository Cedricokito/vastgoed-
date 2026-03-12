import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '../context/LanguageContext';

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 lg:py-48 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/cta-bg.jpg" 
          alt="Luxury Building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-blue/70 via-dark-blue/80 to-dark-blue" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/60 via-transparent to-dark-blue/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div 
            className={`flex justify-center mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-gold/50 rounded-full blur-3xl scale-150" />
              <img 
                src="/images/whitestar-logo-enhanced.png" 
                alt="Whitestar Capital"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.9)]"
              />
            </div>
          </div>

          {/* Label */}
          <div 
            className={`flex items-center justify-center gap-3 mb-8 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-12 h-[1px] bg-gold" />
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-body font-medium">
              {t('cta.label')}
            </span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>

          {/* Title */}
          <h2 
            className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('cta.title1')}{' '}
            <span className="text-gold">{t('cta.title2')}</span>
            <br />{t('cta.title3')}
          </h2>

          {/* Description */}
          <p 
            className={`text-white/70 font-body font-light text-lg max-w-2xl mx-auto mb-10 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {t('cta.description')}
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-dark-blue font-semibold px-10 py-6 text-base rounded-sm transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('cta.contactBtn')}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-blue border-white/10 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl text-gold">
                    {t('dialog.title')}
                  </DialogTitle>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm font-body mb-1 block">{t('dialog.firstName')}</label>
                      <Input 
                        placeholder="" 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div>
                      <label className="text-white/70 text-sm font-body mb-1 block">{t('dialog.lastName')}</label>
                      <Input 
                        placeholder="" 
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm font-body mb-1 block">{t('dialog.email')}</label>
                    <Input 
                      type="email"
                      placeholder="" 
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm font-body mb-1 block">{t('dialog.phone')}</label>
                    <Input 
                      type="tel"
                      placeholder="" 
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm font-body mb-1 block">{t('dialog.message')}</label>
                    <Textarea 
                      placeholder={t('dialog.messagePlaceholder')} 
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-dark-blue font-semibold py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setDialogOpen(false);
                    }}
                  >
                    {t('dialog.submit')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 px-10 py-6 text-base rounded-sm backdrop-blur-sm transition-all duration-300"
              onClick={() => window.open('tel:+31641399918')}
            >
              <Phone className="w-5 h-5 mr-2" />
              {t('cta.callBtn')}
            </Button>
          </div>

          {/* Contact Info */}
          <div 
            className={`flex flex-wrap justify-center gap-8 lg:gap-16 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <div className="text-white/50 text-sm font-body">{t('cta.phone')}</div>
                <div className="text-white font-body">+31 6 4139 9918</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <div className="text-white/50 text-sm font-body">{t('cta.email')}</div>
                <div className="text-white font-body">info@whitestarcapital.nl</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <div className="text-white/50 text-sm font-body">{t('cta.whatsapp')}</div>
                <div className="text-white font-body">+31 6 4139 9918</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
