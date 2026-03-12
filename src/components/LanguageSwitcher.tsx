import { useLanguage } from '../context/LanguageContext';

const languages = [
  { code: 'nl', label: 'NL', flag: '🇳🇱' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
] as const;

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'nl' | 'en' | 'fr')}
          className={`px-3 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-300 ${
            language === lang.code
              ? 'bg-gold text-dark-blue'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
