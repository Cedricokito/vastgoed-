import { Instagram, Linkedin, Facebook, Twitter, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: t('nav.home'), href: '#' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.locations'), href: '#locations' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const locations = [
    { label: language === 'fr' ? 'Dubaï' : 'Dubai', href: '#locations' },
    { label: 'Miami', href: '#locations' },
    { label: 'Costa del Sol', href: '#locations' },
    { label: language === 'en' ? 'Turkey' : language === 'fr' ? 'Turquie' : 'Turkije', href: '#locations' },
    { label: language === 'en' ? 'United Kingdom' : language === 'fr' ? 'Royaume-Uni' : 'Verenigd Koninkrijk', href: '#locations' },
    { label: 'Oman', href: '#locations' },
  ];

  const resources = [
    { label: language === 'en' ? 'Investment Guide' : language === 'fr' ? 'Guide d\'Investissement' : 'Investeringsgids', href: '#' },
    { label: language === 'en' ? 'Market Reports' : language === 'fr' ? 'Rapports de Marché' : 'Marktrapporten', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Blog', href: '#' },
  ];

  return (
    <footer className="relative w-full bg-deep-blue pt-20 pb-8 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img 
          src="images/whitestar-logo-enhanced.png" 
          alt=""
          className="w-[500px] h-[500px] opacity-[0.08]"
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex justify-center mb-8">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                  <div className="absolute inset-0 bg-gold/50 rounded-full blur-3xl scale-150" />
                  <img 
                    src="images/whitestar-logo-enhanced.png" 
                    alt="Whitestar Capital"
                    className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.8)]"
                  />
                </div>
              </div>
              <p className="text-white/50 font-body text-sm leading-relaxed mb-6 max-w-xs text-center lg:text-left">
                {t('footer.description')}
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 justify-center lg:justify-start">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg text-white mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-white/50 hover:text-gold font-body text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-display text-lg text-white mb-4">{t('footer.locations')}</h4>
              <ul className="space-y-3">
                {locations.map((location, index) => (
                  <li key={index}>
                    <a 
                      href={location.href}
                      className="text-white/50 hover:text-gold font-body text-sm transition-colors duration-300"
                    >
                      {location.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-display text-lg text-white mb-4">{t('footer.resources')}</h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={resource.href}
                      className="text-white/50 hover:text-gold font-body text-sm transition-colors duration-300"
                    >
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-span-2 md:col-span-2 lg:col-span-1">
              <h4 className="font-display text-lg text-white mb-4">{t('footer.newsletter')}</h4>
              <p className="text-white/50 font-body text-sm mb-4">
                {t('footer.newsletterText')}
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 bg-white/5 border border-white/20 rounded-sm px-4 py-2 text-white text-sm font-body placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-light text-dark-blue px-4 py-2 rounded-sm font-body font-semibold text-sm transition-colors"
                >
                  {t('footer.subscribe')}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/40 font-body text-sm">
              {t('footer.copyright')}
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-white/40 hover:text-gold font-body text-sm transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-white/40 hover:text-gold font-body text-sm transition-colors">
                {t('footer.terms')}
              </a>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-dark-blue transition-colors duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
