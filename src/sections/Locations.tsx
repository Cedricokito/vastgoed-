import { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowRight, TrendingUp, Building, Sun, Landmark, Castle, Mountain, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  dubai: `${import.meta.env.BASE_URL}images/dubai-location.jpg`,
  miami: `${import.meta.env.BASE_URL}images/miami-location.jpg`,
  costadelsol: `${import.meta.env.BASE_URL}images/costadelsol-location.jpg`,
  turkey: `${import.meta.env.BASE_URL}images/turkey-location.jpg`,
  uk: `${import.meta.env.BASE_URL}images/uk-location.jpg`,
  oman: `${import.meta.env.BASE_URL}images/oman-location.jpg`,
};

type Language = 'nl' | 'en' | 'fr';
type CityId = 'dubai' | 'miami' | 'costadelsol' | 'turkey' | 'uk' | 'oman';

const cityInsightContent: Record<CityId, Record<Language, {
  intro: string;
  bullets: string[];
  sourceLabel: string;
}>> = {
  dubai: {
    nl: {
      intro: 'Dubai combineert snelle stadsontwikkeling met een volwassen vastgoedregelgeving. Voor off-plan investeerders is transparantie rond registratie en projecttoezicht essentieel.',
      bullets: [
        'Controleer projectstatus, registratie en regelgeving via de officiële Dubai Land Department kanalen.',
        'Bekijk huur- en servicekosten impact per wijk om netto rendement realistischer te berekenen.',
        'Focus op ontwikkelaars met een sterke opleverhistoriek en duidelijke betaalstructuur.',
      ],
      sourceLabel: 'Officiële bron',
    },
    en: {
      intro: 'Dubai combines rapid urban growth with mature real estate regulation. For off-plan investors, transparency around registration and project oversight is key.',
      bullets: [
        'Validate project status and legal framework via official Dubai Land Department channels.',
        'Model net returns with realistic service charges and rental assumptions per district.',
        'Prioritize developers with strong delivery track records and clear payment structures.',
      ],
      sourceLabel: 'Official source',
    },
    fr: {
      intro: 'Dubaï combine une croissance urbaine rapide avec une réglementation immobilière structurée. Pour l’off-plan, la transparence réglementaire est essentielle.',
      bullets: [
        'Vérifiez le statut des projets et le cadre légal via les canaux officiels du Dubai Land Department.',
        'Intégrez charges et loyers réalistes par quartier pour estimer le rendement net.',
        'Privilégiez les promoteurs avec historique de livraison solide et plan de paiement clair.',
      ],
      sourceLabel: 'Source officielle',
    },
  },
  miami: {
    nl: {
      intro: 'Miami biedt sterke internationale vraag en een actieve luxe-markt. Goede due diligence blijft cruciaal, vooral rond waardering en lokale belastingen.',
      bullets: [
        'Gebruik Miami-Dade Property Appraiser data voor objectieve waardering en historie.',
        'Vergelijk wijken op huurvraag, verzekering en exploitatiekosten.',
        'Kies projecten met duidelijke HOA- en beheersstructuren.',
      ],
      sourceLabel: 'Officiële bron',
    },
    en: {
      intro: 'Miami benefits from global demand and an active luxury market. Strong due diligence remains critical, especially around valuation and local taxes.',
      bullets: [
        'Use Miami-Dade Property Appraiser data for objective valuation and history checks.',
        'Compare districts by rental depth, insurance profile, and operating costs.',
        'Prefer projects with transparent HOA and property management structures.',
      ],
      sourceLabel: 'Official source',
    },
    fr: {
      intro: 'Miami profite d’une demande internationale et d’un marché premium actif. Une due diligence solide reste indispensable.',
      bullets: [
        'Appuyez-vous sur les données du Miami-Dade Property Appraiser pour la valorisation et l’historique.',
        'Comparez les quartiers selon demande locative, assurance et coûts d’exploitation.',
        'Privilégiez les projets avec structure HOA et gestion clairement définies.',
      ],
      sourceLabel: 'Source officielle',
    },
  },
  costadelsol: {
    nl: {
      intro: 'Costa del Sol trekt internationale kopers door klimaat, lifestyle en toerisme. Regionale data en vergunningstrajecten bepalen hier vaak de kwaliteit van een investering.',
      bullets: [
        'Combineer Andalusische investeringsinformatie met nationale prijsdata (INE).',
        'Analyseer lokale huurvraag en seizoensrisico per gemeente.',
        'Controleer stedelijke planning en vergunningen vóór aankoop.',
      ],
      sourceLabel: 'Bronnen',
    },
    en: {
      intro: 'Costa del Sol attracts international buyers through climate, lifestyle, and tourism. Regional planning and permit quality are key investment filters.',
      bullets: [
        'Combine Andalusian investment guidance with national price data (INE).',
        'Assess rental depth and seasonality risk by municipality.',
        'Review planning status and permits before committing.',
      ],
      sourceLabel: 'Sources',
    },
    fr: {
      intro: 'La Costa del Sol attire les acheteurs internationaux grâce au climat, au style de vie et au tourisme. Les autorisations et la planification locale sont déterminantes.',
      bullets: [
        'Croisez les informations d’Invest in Andalucía avec les données de prix nationales (INE).',
        'Évaluez la profondeur locative et la saisonnalité par commune.',
        'Vérifiez l’urbanisme et les permis avant d’investir.',
      ],
      sourceLabel: 'Sources',
    },
  },
  turkey: {
    nl: {
      intro: 'Turkije biedt schaal, strategische ligging en actieve nieuwbouwmarkten. Juridische checks rond eigendom en aankoopvoorwaarden zijn extra belangrijk.',
      bullets: [
        'Gebruik de officiële Investment Office gids voor aankoopvoorwaarden door buitenlanders.',
        'Controleer districtslimieten en eigendomsregistratie vooraf.',
        'Maak valutarisico en exitstrategie onderdeel van je investering.',
      ],
      sourceLabel: 'Officiële bron',
    },
    en: {
      intro: 'Türkiye offers scale, strategic positioning, and active development markets. Legal checks around ownership and acquisition rules are especially important.',
      bullets: [
        'Use the official Investment Office guidance for foreign acquisition rules.',
        'Validate district limits and title registration before committing.',
        'Include FX risk and exit planning in your investment model.',
      ],
      sourceLabel: 'Official source',
    },
    fr: {
      intro: 'La Türkiye offre de l’échelle, une position stratégique et des marchés neufs dynamiques. Les vérifications juridiques sont prioritaires.',
      bullets: [
        'Consultez le guide officiel Invest in Türkiye pour les règles d’acquisition étrangères.',
        'Vérifiez les limites de district et l’enregistrement foncier en amont.',
        'Intégrez le risque de change et la stratégie de sortie dans le modèle.',
      ],
      sourceLabel: 'Source officielle',
    },
  },
  uk: {
    nl: {
      intro: 'De UK-markt staat bekend om rechtszekerheid en transparantie van eigendom. Voor internationale kopers zijn structuur en belastingadvies belangrijk.',
      bullets: [
        'Controleer eigendomsinformatie via HM Land Registry.',
        'Bepaal vooraf de juiste eigendomsvorm en juridische structuur.',
        'Werk met lokaal belasting- en complianceadvies voor netto rendement.',
      ],
      sourceLabel: 'Officiële bron',
    },
    en: {
      intro: 'The UK market is known for legal certainty and transparent title registration. For international buyers, ownership structure and tax planning matter.',
      bullets: [
        'Verify ownership details through HM Land Registry.',
        'Define the right ownership structure before acquisition.',
        'Use local tax and compliance advice to optimize net returns.',
      ],
      sourceLabel: 'Official source',
    },
    fr: {
      intro: 'Le marché UK est reconnu pour sa sécurité juridique et la transparence des titres. Pour les investisseurs internationaux, la structuration est clé.',
      bullets: [
        'Vérifiez les informations de propriété via HM Land Registry.',
        'Définissez la structure de détention adaptée avant l’acquisition.',
        'Appuyez-vous sur un conseil fiscal local pour le rendement net.',
      ],
      sourceLabel: 'Source officielle',
    },
  },
  oman: {
    nl: {
      intro: 'Oman profileert zich als stabiele lange-termijnmarkt met focus op gereguleerde ontwikkeling. Officiële data helpt om transactietrends en regelgeving te beoordelen.',
      bullets: [
        'Volg vastgoedtransacties en e-services via het Ministry of Housing and Urban Planning.',
        'Evalueer locatiekwaliteit (waterfront, infrastructuur, bereikbaarheid) per project.',
        'Check verblijfs- en eigendomsvoorwaarden voor buitenlandse kopers.',
      ],
      sourceLabel: 'Officiële bron',
    },
    en: {
      intro: 'Oman positions itself as a stable long-term market with regulated development. Official data helps validate transaction trends and compliance.',
      bullets: [
        'Track real estate transactions and services via the Ministry of Housing and Urban Planning.',
        'Assess project quality by waterfront access, infrastructure, and connectivity.',
        'Confirm residency and ownership rules for foreign buyers.',
      ],
      sourceLabel: 'Official source',
    },
    fr: {
      intro: 'Oman se positionne comme un marché stable de long terme avec un développement encadré. Les données officielles facilitent l’analyse.',
      bullets: [
        'Suivez les transactions via le Ministry of Housing and Urban Planning.',
        'Évaluez la qualité des emplacements: littoral, infrastructures, connectivité.',
        'Confirmez les règles de résidence et d’acquisition pour étrangers.',
      ],
      sourceLabel: 'Source officielle',
    },
  },
};

const citySourceLinks: Record<CityId, string[]> = {
  dubai: [
    'https://dubailand.gov.ae/en/',
    'https://dubailand.gov.ae/en/rera/',
  ],
  miami: [
    'https://www.miamidadepa.gov/PA/',
    'https://www.miamidadepa.gov/pa/real-estate/home.page',
  ],
  costadelsol: [
    'https://www.investinandalucia.es/en/',
    'https://www.ine.es/en/prensa/ipv_prensa_en.htm',
  ],
  turkey: [
    'https://investinturkey.gov.tr/',
    'https://www.invest.gov.tr/en/sectors/pages/real-estate.aspx',
  ],
  uk: [
    'https://www.gov.uk/guidance/get-information-from-hm-land-registry',
    'https://www.gov.uk/joint-property-ownership/overview',
  ],
  oman: [
    'https://mohup.gov.om/en',
    'https://mohup.gov.om/en/open-data/data/Realestate%20Transaction',
  ],
};

export default function Locations() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<CityId | null>(null);
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
    <>
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
                    <button
                      type="button"
                      onClick={() => setSelectedCity(locKey)}
                      className={`flex items-center gap-2 text-gold font-body font-medium text-sm group/btn transition-all duration-500 ${
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
    <Dialog open={selectedCity !== null} onOpenChange={(open) => !open && setSelectedCity(null)}>
      <DialogContent className="bg-deep-blue border-white/20 text-white max-w-2xl">
        {selectedCity && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-gold">
                {getLocationName(selectedCity)}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5">
              <p className="text-white/80 font-body leading-relaxed">
                {cityInsightContent[selectedCity][language as Language].intro}
              </p>
              <ul className="space-y-3">
                {cityInsightContent[selectedCity][language as Language].bullets.map((item, idx) => (
                  <li key={idx} className="text-white/70 font-body leading-relaxed flex gap-3">
                    <span className="text-gold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-sm text-white/50 mb-2 font-body">
                  {cityInsightContent[selectedCity][language as Language].sourceLabel}
                </p>
                <div className="flex flex-wrap gap-3">
                  {citySourceLinks[selectedCity].map((url) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-body"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {url.replace('https://', '').replace('www.', '')}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}
