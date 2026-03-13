"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Leaf,
  Users,
  Coins,
  Sparkles,
  ArrowRight,
  Recycle,
  Search,
  Lightbulb,
  BarChart3,
  Handshake,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  Gauge,
  Factory,
  Truck,
  Package,
  ShoppingCart,
  Home as HomeIcon,
  Trash2,
  AlertTriangle,
  Globe,
  Download,
  MapPin,
} from "lucide-react";

/* ═══════════════════════════════════════
   DATA
   ═══════════════════════════════════════ */

const steps = [
  { num: 1, label: "Extraction", sub: "matières premières", color: "#b45309", angle: -90 },
  { num: 2, label: "Transformation", sub: "& Fabrication", color: "#c2410c", angle: -45 },
  { num: 3, label: "Emballage", sub: "& Packaging", color: "#0d9488", angle: 0 },
  { num: 4, label: "Transport", sub: "& Logistique", color: "#2563eb", angle: 45 },
  { num: 5, label: "Distribution", sub: "& Vente en ligne", color: "#7c3aed", angle: 90 },
  { num: 6, label: "Livraison", sub: "au consommateur", color: "#db2777", angle: 135 },
  { num: 7, label: "Utilisation", sub: "par le client", color: "#059669", angle: 180 },
  { num: 8, label: "Fin de vie", sub: "Recyclage / Décharge", color: "#dc2626", angle: 225 },
];

const ramifications = [
  {
    id: 1, title: "Extraction des matières premières", color: "#b45309",
    img: "https://images.unsplash.com/photo-1629807473015-41699c4471b5?w=1400&q=80",
    env: { text: "Déforestation, érosion des sols, pollution des nappes phréatiques, perte de biodiversité", ex: "Mines de cobalt au Katanga (RDC), déforestation Amazonie pour l'or" },
    social: { text: "Travail des enfants, conditions dangereuses, déplacement de populations autochtones", ex: "40 000 enfants dans les mines artisanales de RDC" },
    eco: { text: "Dépendance aux ressources non-renouvelables, volatilité extrême des prix", ex: "80% du cobalt mondial concentré en RDC" },
    geo: { text: "Sols rendus stériles, rivières contaminées, écosystèmes locaux détruits sur des km²", ex: "Katanga (RDC), Cerro de Pasco (Pérou), Norilsk (Russie)" },
    kpis: [
      { label: "CO₂ cuivre", value: "2 500 kg/t", impact: "≈ 1 voiture pendant 1 an par tonne", src: "IEA 2023", cat: "ENV" },
      { label: "Travail enfants RDC", value: "~40 000", impact: "Génération privée de scolarisation", src: "UNICEF 2014", cat: "SOC" },
      { label: "Volatilité cobalt", value: "±70%", impact: "Instabilité économique pays producteurs", src: "LME 2018-2023", cat: "ECO" },
      { label: "Terres dégradées mines", value: "~33Mha", impact: "≈ surface de la Pologne inexploitable", src: "UNEP 2019", cat: "GEO" },
    ],
  },
  {
    id: 2, title: "Transformation & Fabrication", color: "#c2410c",
    img: "https://images.unsplash.com/photo-1574184383650-5f859b6793c5?w=1400&q=80",
    env: { text: "Émissions CO₂, pollution de l'air et de l'eau, consommation massive d'énergie", ex: "Usines textiles au Bangladesh, fonderies en Chine" },
    social: { text: "Conditions de travail précaires, salaires sous le seuil de pauvreté, horaires excessifs", ex: "Rana Plaza 1 134 morts (2013), suicides usines Foxconn" },
    eco: { text: "Délocalisation, course au moins-disant social et fiscal", ex: "Fast fashion : cycle design-vente en 2 semaines" },
    geo: { text: "Smog urbain chronique, rivières colorées par les teintures, zones inhabitables", ex: "Delta Rivière des Perles (Chine), Dhaka (Bangladesh)" },
    kpis: [
      { label: "Salaire ouvrier textile", value: "0.32$/h", impact: "Sous le seuil de pauvreté local", src: "CCC 2023", cat: "SOC" },
      { label: "Heures sup.", value: "+20-30h/sem", impact: "Épuisement physique chronique", src: "ILO Better Work", cat: "SOC" },
      { label: "Part travail/prix", value: "2-4%", impact: "Aucune marge d'épargne pour l'ouvrier", src: "Oxfam 2017", cat: "ECO" },
      { label: "Pollution eau industrie", value: "20%", impact: "1/5 des eaux usées mondiales = textile", src: "Banque Mondiale 2019", cat: "GEO" },
    ],
  },
  {
    id: 3, title: "Emballage & Packaging", color: "#0d9488",
    img: "https://images.unsplash.com/photo-1573376671096-e1fce2d1f19d?w=1400&q=80",
    env: { text: "Suremballage, plastique à usage unique, production de déchets non recyclables", ex: "Cartons Amazon surdimensionnés, calages polystyrène" },
    social: { text: "Perception de gaspillage, frustration consommateur, perte de confiance", ex: "Vidéos unboxing virales dénonçant l'excès d'emballage" },
    eco: { text: "Coût caché répercuté sur le prix final, coût de gestion des déchets", ex: "Taxe emballage, filières REP en France" },
    geo: { text: "Décharges saturées, pollution des littoraux et océans par le plastique", ex: "Great Pacific Garbage Patch, plages d'Asie du Sud-Est" },
    kpis: [
      { label: "Plastique non recyclé", value: "91%", impact: "Accumulation permanente dans l'environnement", src: "OECD 2022", cat: "ENV" },
      { label: "Volume vide/colis", value: "~40%", impact: "40% du transport = du vide inutile", src: "DS Smith 2020", cat: "ECO" },
      { label: "Frustration conso.", value: "62%", impact: "Perte de confiance envers les marques", src: "DS Smith 2020", cat: "SOC" },
      { label: "Plastique océans/an", value: "11Mt", impact: "Contamination chaîne alimentaire marine", src: "UNEP 2021", cat: "GEO" },
    ],
  },
  {
    id: 4, title: "Transport & Logistique", color: "#2563eb",
    img: "https://images.unsplash.com/photo-1614571272828-2d8289ff8fc0?w=1400&q=80",
    env: { text: "Émissions CO₂ massives (cargo, avion, camion), pollution maritime au soufre", ex: "Cargo Chine→Europe ≈ 15 000 km, fret aérien express" },
    social: { text: "Conditions des chauffeurs routiers et marins, précarité de la gig economy", ex: "Marins bloqués en mer pendant COVID, chauffeurs isolés" },
    eco: { text: "Coût du dernier kilomètre, externalités environnementales non internalisées", ex: "Livraison 'gratuite' = coût environnemental invisible" },
    geo: { text: "Congestion portuaire, pollution de l'air dans les corridors logistiques", ex: "Rotterdam, détroit de Malacca, autoroutes A1/A6 France" },
    kpis: [
      { label: "CO₂ avion cargo", value: "602g/t-km", impact: "50× plus polluant que le cargo maritime", src: "ADEME 2023", cat: "ENV" },
      { label: "Marins bloqués COVID", value: "400 000", impact: "Crises de santé mentale en mer", src: "ITF 2020", cat: "SOC" },
      { label: "Coût social CO₂", value: "100€/t", impact: "Non répercuté dans le prix produit", src: "Quinet 2019", cat: "ECO" },
      { label: "SO₂ transport maritime", value: "13%", impact: "Pluies acides sur les zones côtières", src: "IMO 2020", cat: "GEO" },
    ],
  },
  {
    id: 5, title: "Distribution & Vente en ligne", color: "#7c3aed",
    img: "https://images.unsplash.com/photo-1662890459081-87e680bb1b00?w=1400&q=80",
    env: { text: "Data centers énergivores, consommation électrique et en eau des serveurs", ex: "AWS, Google Cloud — ~1% de l'électricité mondiale" },
    social: { text: "Opacité de l'information, greenwashing, manipulation des avis consommateurs", ex: "53% des allégations 'vertes' sont trompeuses (UE)" },
    eco: { text: "Concentration du marché, disparition du commerce de proximité", ex: "Amazon = 40% du e-commerce US, 50% en Europe" },
    geo: { text: "Data centers pompant l'eau locale en zones rurales, désertification des centres-villes", ex: "Data centers Google Oregon : 21 Mrd litres d'eau/an" },
    kpis: [
      { label: "Greenwashing UE", value: "53.3%", impact: "Consommateurs induits en erreur", src: "Commission EU 2021", cat: "SOC" },
      { label: "Part top 5 e-commerce", value: "~63%", impact: "Oligopole étouffant la concurrence", src: "eMarketer 2023", cat: "ECO" },
      { label: "Fermetures commerces FR", value: "~11 000/an", impact: "Désertification des centres-villes", src: "Procos 2023", cat: "GEO" },
      { label: "Eau data centers Google", value: "21 Mrd L", impact: "Stress hydrique communautés voisines", src: "Google Env. Report 2024", cat: "ENV" },
    ],
  },
  {
    id: 6, title: "Livraison au consommateur", color: "#db2777",
    img: "https://images.unsplash.com/photo-1620455800201-7f00aeef12ed?w=1400&q=80",
    env: { text: "Derniers km en véhicule thermique, livraisons échouées et tentatives multiples", ex: "30% d'échec 1ère livraison = trajets doublés" },
    social: { text: "Pression sur les livreurs, accidents, précarité sans protection sociale", ex: "Micro-entrepreneurs sans congés ni assurance" },
    eco: { text: "Coût des retours (30-50% en fashion), produits retournés souvent détruits", ex: "Amazon détruit ~30% des produits retournés" },
    geo: { text: "Congestion urbaine par les camionnettes, pollution de l'air en centre-ville", ex: "Paris, Londres : +30% véhicules de livraison d'ici 2030" },
    kpis: [
      { label: "CO₂/colis urbain", value: "~500g", impact: "×3 Mrd colis/an FR = 1.5Mt CO₂", src: "ADEME 2022", cat: "ENV" },
      { label: "Auto-entrepreneurs", value: "~75%", impact: "Aucune protection sociale ni chômage", src: "DARES 2022", cat: "SOC" },
      { label: "Retours mode", value: "30-50%", impact: "Gaspillage logistique et destruction", src: "KPMG 2023", cat: "ECO" },
      { label: "Congestion urbaine", value: "+30%", impact: "Temps perdu et pollution pour tous", src: "WEF 2020", cat: "GEO" },
    ],
  },
  {
    id: 7, title: "Utilisation par le client", color: "#059669",
    img: "https://images.unsplash.com/photo-1612831661941-254341b885e9?w=1400&q=80",
    env: { text: "Consommation d'énergie, eau, produits chimiques au quotidien", ex: "Machine à laver : 50L/cycle, recharge smartphone 365×/an" },
    social: { text: "Obsolescence programmée, frustration, spirale de surconsommation", ex: "Batteries non remplaçables, mises à jour qui ralentissent" },
    eco: { text: "Coût de possession supérieur au coût d'achat, réparation découragée", ex: "Réparation plus chère que le remplacement" },
    geo: { text: "Déchets ménagers en augmentation, saturation des déchèteries municipales", ex: "580 kg de déchets/habitant/an en France" },
    kpis: [
      { label: "Durée de vie tél.", value: "2.5 ans", impact: "Remplacement 4× plus rapide que nécessaire", src: "ADEME 2023", cat: "ENV" },
      { label: "Réparabilité moy.", value: "6.2/10", impact: "Majorité des produits difficiles à réparer", src: "HOP 2023", cat: "SOC" },
      { label: "Réparation/neuf", value: "~60%", impact: "Incitation économique au remplacement", src: "ADEME 2022", cat: "ECO" },
      { label: "Déchets ménagers FR", value: "580 kg/hab", impact: "Saturation infrastructures de traitement", src: "Eurostat 2022", cat: "GEO" },
    ],
  },
  {
    id: 8, title: "Fin de vie", color: "#dc2626",
    img: "https://images.unsplash.com/photo-1624218811362-481d87e6c351?w=1400&q=80",
    env: { text: "E-waste, pollution des sols par métaux lourds, micro-plastiques", ex: "Agbogbloshie (Ghana), désert d'Atacama (Chili)" },
    social: { text: "Recyclage informel dangereux, exposition aux toxiques sans protection", ex: "Enfants triant les déchets électroniques à mains nues" },
    eco: { text: "Perte de valeur matière, coût de traitement supérieur à la valeur récupérée", ex: "Seulement 22% des e-waste correctement recyclés" },
    geo: { text: "Export illégal de déchets vers l'Afrique de l'Ouest, contamination sols et eaux", ex: "Agbogbloshie (Ghana), Lagos (Nigeria), Guiyu (Chine)" },
    kpis: [
      { label: "E-waste monde", value: "62Mt/an", impact: "+21% en 5 ans, croissance continue", src: "UNITAR/ITU 2024", cat: "ENV" },
      { label: "Taux recyclé", value: "22.3%", impact: "78% finit en décharge ou incinération", src: "UNITAR 2024", cat: "ECO" },
      { label: "Valeur perdue", value: "~57 Mrd$", impact: "Métaux précieux enfouis non récupérés", src: "UNEP 2019", cat: "ECO" },
      { label: "Export e-waste Afrique", value: "~1Mt/an", impact: "Contamination sols et eaux locales", src: "BAN 2021", cat: "GEO" },
    ],
  },
];

const systemicEffects = [
  { title: "Extraction → Santé", steps: ["Extraction minière", "Pollution des eaux", "Santé des communautés", "Coûts de santé"] },
  { title: "Extraction → Pauvreté", steps: ["Travail des enfants", "Déscolarisation", "Pauvreté structurelle", "Cycle perpétuel"] },
  { title: "Fabrication → Climat", steps: ["Émissions CO₂", "Changement climatique", "Événements extrêmes", "Migrations climatiques"] },
  { title: "Transport → Santé urbaine", steps: ["Camions thermiques", "NOₓ & particules fines", "Asthme & cardio", "Coût santé publique"] },
  { title: "Distribution → Commerce local", steps: ["Concentration e-commerce", "Fermeture boutiques", "Désertification centres", "Fracture territoriale"] },
  { title: "Fin de vie → Alimentation", steps: ["Micro-plastiques", "Contamination océans", "Chaîne alimentaire", "Santé humaine"] },
];

const sourceUrls: Record<string, string> = {
  "IEA 2023": "https://www.iea.org/reports/energy-technology-perspectives-2023",
  "UNICEF 2014": "https://www.unicef.org/drcongo/en/topics/child-labour",
  "LME 2018-2023": "https://www.lme.com/metals/ev/lme-cobalt",
  "CCC 2023": "https://cleanclothes.org/campaigns/bmwc",
  "ILO Better Work": "https://betterwork.org/reports-and-publications/",
  "Oxfam 2017": "https://www.oxfam.org.au/what-she-makes/",
  "OECD 2022": "https://www.oecd.org/en/publications/2022/02/global-plastics-outlook_a653d1c9.html",
  "DS Smith 2020": "https://www.dssmith.com/EmptySpaceEnglish",
  "ADEME 2023": "https://base-empreinte.ademe.fr/",
  "ADEME 2022": "https://base-empreinte.ademe.fr/",
  "ITF 2020": "https://www.itfglobal.org/en/news/crew-change-crisis-risks-becoming-forced-labour-epidemic-tragedy-hits-six-month-mark-world",
  "Quinet 2019": "https://www.strategie.gouv.fr/sites/strategie.gouv.fr/files/atoms/files/dp-valeur-action-pour-climat-fevrier-2019.pdf",
  "Commission EU 2021": "https://ec.europa.eu/commission/presscorner/detail/en/ip_21_269",
  "eMarketer 2023": "https://www.insiderintelligence.com/",
  "Procos 2023": "https://www.procos.org/",
  "DARES 2022": "https://dares.travail-emploi.gouv.fr/publication/les-travailleurs-de-plateforme-quels-profils-et-quelles-conditions-de-travail",
  "KPMG 2023": "https://assets.kpmg.com/content/dam/kpmg/ie/pdf/2021/05/ie-front-row-seeing-fashions-future.pdf",
  "HOP 2023": "https://www.halteobsolescence.org/lindice-de-reparabilite-tient-il-ses-promesses/",
  "UNITAR/ITU 2024": "https://ewastemonitor.info/the-global-e-waste-monitor-2024/",
  "UNITAR 2024": "https://ewastemonitor.info/the-global-e-waste-monitor-2024/",
  "UNEP 2019": "https://ewastemonitor.info/gem-2020/",
  "UNEP 2021": "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution",
  "Banque Mondiale 2019": "https://www.worldbank.org/en/news/feature/2019/09/23/costo-de-la-contaminacion-de-la-industria-textil",
  "IMO 2020": "https://www.imo.org/en/MediaCentre/HotTopics/Pages/Sulphur-2020.aspx",
  "Google Env. Report 2024": "https://sustainability.google/reports/google-2024-environmental-report/",
  "WEF 2020": "https://www.weforum.org/reports/the-future-of-the-last-mile-ecosystem/",
  "Eurostat 2022": "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Municipal_waste_statistics",
  "BAN 2021": "https://www.ban.org/news/2021/1/7/ban-report-export-of-e-waste",
};

/* ═══════════════════════════════════════
   CIRCLE DIAGRAM
   ═══════════════════════════════════════ */

function CircleDiagram() {
  const cx = 380, cy = 380, R = 260;
  const vb = 760;
  const nodeW = 140, nodeH = 56, nodeR = 16;

  const positions = steps.map((s) => {
    const rad = (s.angle * Math.PI) / 180;
    return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  });

  const arrows: string[] = [];
  for (let i = 0; i < 8; i++) {
    const from = positions[i];
    const to = positions[(i + 1) % 8];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const nx = dx / dist;
    const ny = dy / dist;
    const gap = 46;
    const x1 = from.x + nx * gap;
    const y1 = from.y + ny * gap;
    const x2 = to.x - nx * gap;
    const y2 = to.y - ny * gap;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const outAngle = Math.atan2(my - cy, mx - cx);
    const bulge = 30;
    const qx = mx + bulge * Math.cos(outAngle);
    const qy = my + bulge * Math.sin(outAngle);
    arrows.push(`M${x1.toFixed(1)},${y1.toFixed(1)} Q${qx.toFixed(1)},${qy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`);
  }

  return (
    <svg viewBox={`0 0 ${vb} ${vb}`} className="w-full h-full max-h-[65vh]">
      <defs>
        <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
        </marker>
        <filter id="nodeShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.12" />
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="10 6" opacity="0.35" />
      {arrows.map((d, i) => (
        <path key={`a${i}`} d={d} fill="none" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrowGreen)" opacity="0.5" />
      ))}
      <circle cx={cx} cy={cy} r={68} fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      <text x={cx} y={cy - 10} textAnchor="middle" fontWeight="800" fontSize="28" fill="#111827">&#9851;</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontWeight="700" fontSize="13" fill="#111827">Cycle de Vie</text>
      <text x={cx} y={cy + 26} textAnchor="middle" fontWeight="500" fontSize="10.5" fill="#4b5563">Economie circulaire</text>
      {positions.map((pos, i) => {
        const s = steps[i];
        return (
          <g key={`n${i}`} filter="url(#nodeShadow)">
            <rect x={pos.x - nodeW / 2} y={pos.y - nodeH / 2} width={nodeW} height={nodeH} rx={nodeR} fill={s.color} />
            <circle cx={pos.x - nodeW / 2 + 20} cy={pos.y} r={12} fill="rgba(255,255,255,0.2)" />
            <text x={pos.x - nodeW / 2 + 20} y={pos.y} textAnchor="middle" dominantBaseline="central" fontWeight="800" fontSize="12" fill="white">{s.num}</text>
            <text x={pos.x + 12} y={pos.y - 6} textAnchor="middle" dominantBaseline="auto" fontWeight="700" fontSize="12" fill="white">{s.label}</text>
            <text x={pos.x + 12} y={pos.y + 10} textAnchor="middle" dominantBaseline="auto" fontWeight="400" fontSize="9.5" fill="rgba(255,255,255,0.92)">{s.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════
   SLIDE LAYOUTS
   ═══════════════════════════════════════ */

const TOTAL_SLIDES = 16;

/* ── Slide wrapper ── */
function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden relative ${className}`}>
      {children}
    </div>
  );
}

/* ── Image background slide ── */
function ImageSlide({ src, overlay = "bg-black/60", children }: { src: string; overlay?: string; children: React.ReactNode }) {
  return (
    <Slide>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${src})` }} />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl text-center">
        {children}
      </div>
    </Slide>
  );
}

const catColors: Record<string, string> = { ENV: "bg-green-500", SOC: "bg-blue-500", ECO: "bg-amber-500", GEO: "bg-orange-500" };

/* ── Step slide (for each cycle step) ── */
function StepSlide({ ram }: { ram: typeof ramifications[0] }) {
  return (
    <ImageSlide src={ram.img} overlay="bg-black/65">
      {/* Watermark number */}
      <div className="absolute top-6 right-10 text-[180px] font-black text-white/5 leading-none select-none hidden lg:block">
        {String(ram.id).padStart(2, "0")}
      </div>

      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white/90 mb-3" style={{ background: ram.color }}>
            Étape {ram.id}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{ram.title}</h2>
        </div>

        {/* 2×2 impact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Environnemental</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-1">{ram.env.text}</p>
            <p className="text-white/50 text-xs italic">{ram.env.ex}</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Social</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-1">{ram.social.text}</p>
            <p className="text-white/50 text-xs italic">{ram.social.ex}</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Économique</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-1">{ram.eco.text}</p>
            <p className="text-white/50 text-xs italic">{ram.eco.ex}</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wide">Géographie locale</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-1">{ram.geo.text}</p>
            <p className="text-white/50 text-xs italic">{ram.geo.ex}</p>
          </div>
        </div>

        {/* KPIs row */}
        <div className="flex flex-wrap justify-center gap-3">
          {ram.kpis.map((kpi, i) => (
            <div key={i} className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-2.5 text-center min-w-[140px]">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className={`w-2 h-2 rounded-full ${catColors[kpi.cat]}`} />
                <span className="text-[10px] font-bold text-white/40 uppercase">{kpi.cat}</span>
              </div>
              <div className="text-xl font-extrabold text-white">{kpi.value}</div>
              <div className="text-xs text-white/60 mt-0.5">{kpi.label}</div>
              <div className="text-[10px] text-white/40 mt-1 italic leading-tight">{kpi.impact}</div>
              <div className="text-[9px] text-white/25 mt-1">
                {sourceUrls[kpi.src] ? (
                  <a href={sourceUrls[kpi.src]} target="_blank" rel="noopener noreferrer" className="hover:text-white/40 hover:underline transition-colors">{kpi.src}</a>
                ) : kpi.src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ImageSlide>
  );
}

/* ═══════════════════════════════════════
   MAIN PRESENTATION
   ═══════════════════════════════════════ */

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [printMode, setPrintMode] = useState(false);

  const goNext = useCallback(() => setCurrent((p) => Math.min(p + 1, TOTAL_SLIDES - 1)), []);
  const goPrev = useCallback(() => setCurrent((p) => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (printMode) {
      const timer = setTimeout(() => window.print(), 600);
      const onAfterPrint = () => setPrintMode(false);
      window.addEventListener("afterprint", onAfterPrint);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("afterprint", onAfterPrint);
      };
    }
  }, [printMode]);

  const slides = [
    /* ═══ 0 — Title ═══ */
    <ImageSlide key="title" src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80" overlay="bg-black/55">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-medium text-white/90 backdrop-blur-sm mb-8">
        <Sparkles className="w-4 h-4" />
        Epitech 2026 — Social &amp; Environmental Impact
      </div>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
        Évaluation d&apos;Impact
        <br />
        <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">Social &amp; Environnemental</span>
      </h1>
      <p className="text-xl text-white/80 mb-10">Supply Chain E-commerce — Cycle de Vie &amp; Ramifications</p>
      <div className="flex items-center gap-3 text-white/60 text-sm">
        <span className="px-3 py-1.5 rounded-full bg-white/10 font-medium">Groupe 7</span>
        <span>Yoann · Alexis · Clément · Quentin</span>
      </div>
    </ImageSlide>,

    /* ═══ 1 — Le Problème ═══ */
    <ImageSlide key="problem" src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1400&q=80" overlay="bg-black/70">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-sm font-bold text-red-300 mb-8">
        <AlertTriangle className="w-4 h-4" />
        Le Problème
      </div>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-12">
        Une supply chain <span className="text-red-400">invisible</span> et dévastatrice
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
          <div className="text-5xl font-black text-red-400 mb-2">62Mt</div>
          <div className="text-sm text-white/70">de e-waste générés par an dans le monde</div>
          <a href="https://ewastemonitor.info/the-global-e-waste-monitor-2024/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/30 mt-2 italic hover:text-white/50 hover:underline transition-colors block">Global E-waste Monitor, UNITAR/ITU 2024</a>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
          <div className="text-5xl font-black text-red-400 mb-2">91%</div>
          <div className="text-sm text-white/70">du plastique n&apos;est jamais recyclé</div>
          <a href="https://www.oecd.org/en/publications/2022/02/global-plastics-outlook_a653d1c9.html" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/30 mt-2 italic hover:text-white/50 hover:underline transition-colors block">OECD Global Plastics Outlook 2022</a>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
          <div className="text-5xl font-black text-red-400 mb-2">40K</div>
          <div className="text-sm text-white/70">enfants dans les mines de cobalt (RDC)</div>
          <div className="text-[10px] text-white/30 mt-2 italic"><a href="https://www.unicef.org/drcongo/en/topics/child-labour" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 hover:underline transition-colors">UNICEF 2014</a>, <a href="https://www.amnesty.org/en/documents/afr62/3183/2016/en/" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 hover:underline transition-colors">Amnesty International 2016</a></div>
        </div>
      </div>
      <p className="text-white/50 text-sm mt-8 max-w-2xl">
        Le consommateur n&apos;a aucune visibilité sur l&apos;origine, les conditions de fabrication et l&apos;impact réel des produits qu&apos;il achète en ligne.
      </p>
    </ImageSlide>,

    /* ═══ 2 — Notre Projet ═══ */
    <Slide key="project" className="bg-white">
      <div className="max-w-5xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm font-bold text-green-700 mb-8">
          <Lightbulb className="w-4 h-4" />
          Notre Solution
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">
          Une extension navigateur pour
          <br />
          <span className="text-green-600">rendre visible l&apos;invisible</span>
        </h2>
        <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
          Analyse les fiches produits et affiche directement l&apos;impact environnemental, social et les alternatives responsables.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: "Score Environnemental", desc: "Empreinte carbone estimée, labels, distance parcourue", bg: "bg-green-50", color: "text-green-700" },
            { icon: Handshake, title: "Indicateurs Éthiques", desc: "Pays de production, labels sociaux, controverses", bg: "bg-blue-50", color: "text-blue-700" },
            { icon: Zap, title: "Alternatives Responsables", desc: "Produits similaires avec un meilleur score d'impact", bg: "bg-amber-50", color: "text-amber-700" },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-5`}>
                  <Icon className={`w-7 h-7 ${c.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>,

    /* ═══ 3 — Cycle de Vie ═══ */
    <Slide key="cycle" className="bg-gray-50">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-2">Cycle de Vie du Produit E-commerce</h2>
        <p className="text-gray-500 mb-6">8 étapes circulaires — de l&apos;extraction à la fin de vie et retour matière</p>
        <CircleDiagram />
        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold text-sm shadow-lg">
            <Recycle className="w-4 h-4" />
            Retour matière → Économie circulaire
          </div>
        </div>
      </div>
    </Slide>,

    /* ═══ 4-11 — Steps ═══ */
    ...ramifications.map((ram) => <StepSlide key={`step-${ram.id}`} ram={ram} />),

    /* ═══ 12 — Effets Systémiques ═══ */
    <Slide key="systemic" className="bg-gray-950">
      <div className="max-w-5xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-green-400 mb-8">
          <Globe className="w-4 h-4" />
          System Thinking
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">Effets Systémiques Croisés</h2>
        <p className="text-gray-400 mb-12">Comment les impacts se propagent à travers les systèmes</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemicEffects.map((effect, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm text-left">
              <h4 className="text-green-400 font-bold text-base mb-5">{effect.title}</h4>
              <div className="space-y-3">
                {effect.steps.map((step, j) => (
                  <div key={j} className="flex items-center gap-3">
                    {j > 0 && <ArrowRight className="w-3 h-3 text-green-500 shrink-0" />}
                    {j === 0 && <div className="w-3" />}
                    <span className="text-sm text-white/90">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* ═══ 13 — Méthodologie ═══ */
    <Slide key="methodology" className="bg-white">
      <div className="max-w-4xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm font-bold text-green-700 mb-8">
          <Target className="w-4 h-4" />
          Méthodologie
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight mb-12">
          Indicateurs <span className="text-green-600">ESG</span> &amp; Quantification
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl border border-gray-200 p-8 text-center">
            <div className="text-5xl font-black text-green-600 mb-2">32</div>
            <div className="text-sm text-gray-500 font-medium">KPIs quantifiés avec impact</div>
            <div className="text-xs text-gray-400 mt-1">Chaque indicateur → conséquence chiffrée</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-8 text-center">
            <div className="text-5xl font-black text-green-600 mb-2">8 × 4</div>
            <div className="text-sm text-gray-500 font-medium">Étapes × Dimensions d&apos;impact</div>
            <div className="text-xs text-gray-400 mt-1">ENV · SOC · ÉCO · GÉO</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-8 text-center">
            <div className="text-5xl font-black text-green-600 mb-2">ESG+</div>
            <div className="text-sm text-gray-500 font-medium">Cadre élargi avec géographie</div>
            <div className="text-xs text-gray-400 mt-1">Environmental, Social, Governance + Territorial</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
          <div className="rounded-xl bg-gray-50 p-5">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Gauge className="w-4 h-4 text-green-600" /> Principes SMART</h4>
            <p className="text-sm text-gray-600">Specific, Measurable, Actionable, Relevant, Time-bound — chaque indicateur est concret et vérifiable.</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-5">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Search className="w-4 h-4 text-green-600" /> Sources principales</h4>
            <p className="text-sm text-gray-600">UNITAR/ITU, OECD, ADEME, UNICEF, Amnesty Int., Commission EU, ILO, Oxfam, Banque Mondiale, UNEP, IMO, Google Env. Report, WEF, Eurostat, Basel Action Network, Procos, KPMG, DARES, HOP.</p>
          </div>
        </div>
      </div>
    </Slide>,

    /* ═══ 14 — Sources ═══ */
    <Slide key="sources" className="bg-gray-950">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-10 text-center">Sources &amp; Références</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {[
            { ref: "UNITAR/ITU", detail: "Global E-waste Monitor 2024 — 62Mt e-waste, 22.3% recyclés", url: "https://ewastemonitor.info/the-global-e-waste-monitor-2024/" },
            { ref: "OECD", detail: "Global Plastics Outlook 2022 — 91% plastique non recyclé", url: "https://www.oecd.org/en/publications/2022/02/global-plastics-outlook_a653d1c9.html" },
            { ref: "UNICEF", detail: "Rapport travail des enfants RDC 2014 — ~40 000 enfants dans les mines", url: "https://www.unicef.org/drcongo/en/topics/child-labour" },
            { ref: "Amnesty International", detail: "\"This is what we die for\" 2016 — cobalt supply chain", url: "https://www.amnesty.org/en/documents/afr62/3183/2016/en/" },
            { ref: "ADEME", detail: "Base Carbone 2023 — facteurs d'émission transport, durée de vie produits", url: "https://base-empreinte.ademe.fr/" },
            { ref: "Clean Clothes Campaign", detail: "Salaires textiles Bangladesh 2023 — 0.32$/h, seuil décent 0.75$/h", url: "https://cleanclothes.org/campaigns/bmwc" },
            { ref: "ILO / Better Work", detail: "Conditions de travail usines textiles, heures supplémentaires", url: "https://betterwork.org/reports-and-publications/" },
            { ref: "Oxfam", detail: "\"What She Makes\" 2017 — 2-4% du prix retail va à l'ouvrier", url: "https://www.oxfam.org.au/what-she-makes/" },
            { ref: "Commission Européenne", detail: "Screening environmental claims 2021 — 53.3% greenwashing", url: "https://ec.europa.eu/commission/presscorner/detail/en/ip_21_269" },
            { ref: "DS Smith", detail: "Packaging survey 2020 — 40% volume vide, 62% frustration consommateurs", url: "https://www.dssmith.com/EmptySpaceEnglish" },
            { ref: "Procos", detail: "Vacance commerciale France 2023 — ~11 000 fermetures/an", url: "https://www.procos.org/" },
            { ref: "eMarketer", detail: "Global e-commerce market share 2023 — top 5 = ~63%", url: "https://www.insiderintelligence.com/" },
            { ref: "DARES", detail: "Statut livreurs plateformes France 2022 — ~75% auto-entrepreneurs", url: "https://dares.travail-emploi.gouv.fr/publication/les-travailleurs-de-plateforme-quels-profils-et-quelles-conditions-de-travail" },
            { ref: "KPMG", detail: "E-commerce returns 2023 — 30-50% retours en mode", url: "https://assets.kpmg.com/content/dam/kpmg/ie/pdf/2021/05/ie-front-row-seeing-fashions-future.pdf" },
            { ref: "ITF", detail: "International Transport Workers' Federation — 400 000 marins bloqués (COVID 2020)", url: "https://www.itfglobal.org/en/news/crew-change-crisis-risks-becoming-forced-labour-epidemic-tragedy-hits-six-month-mark-world" },
            { ref: "Quinet", detail: "Commission Quinet 2019 — valeur tutélaire du carbone : 100€/tCO₂", url: "https://www.strategie.gouv.fr/sites/strategie.gouv.fr/files/atoms/files/dp-valeur-action-pour-climat-fevrier-2019.pdf" },
            { ref: "IEA", detail: "International Energy Agency 2023 — émissions extraction cuivre : ~2 500 kg CO₂e/t", url: "https://www.iea.org/reports/energy-technology-perspectives-2023" },
            { ref: "LME", detail: "London Metal Exchange — cours du cobalt 2018-2023, variation ±70%", url: "https://www.lme.com/metals/ev/lme-cobalt" },
            { ref: "HOP", detail: "Halte à l'Obsolescence Programmée 2023 — indice réparabilité moyen 6.2/10", url: "https://www.halteobsolescence.org/lindice-de-reparabilite-tient-il-ses-promesses/" },
            { ref: "IUCN", detail: "Primary microplastics in the oceans 2017 — 500 000 t/an (textile)", url: "https://portals.iucn.org/library/node/46622" },
            { ref: "UNEP", detail: "Recyclable metals value 2019 — valeur matière perdue ~57 Mrd$/an", url: "https://ewastemonitor.info/gem-2020/" },
            { ref: "UNEP", detail: "Marine litter & plastic pollution 2021 — 11Mt plastique/an dans les océans", url: "https://www.unep.org/resources/pollution-solution-global-assessment-marine-litter-and-plastic-pollution" },
            { ref: "Banque Mondiale", detail: "Pollution industrielle eau 2019 — 20% due au textile", url: "https://www.worldbank.org/en/news/feature/2019/09/23/costo-de-la-contaminacion-de-la-industria-textil" },
            { ref: "IMO", detail: "Réglementation soufre maritime 2020 — 13% SO₂ mondial", url: "https://www.imo.org/en/MediaCentre/HotTopics/Pages/Sulphur-2020.aspx" },
            { ref: "Google", detail: "Environmental Report 2024 — 21 Mrd L d'eau pour data centers", url: "https://sustainability.google/reports/google-2024-environmental-report/" },
            { ref: "WEF", detail: "Future of Last-Mile Ecosystem 2020 — +30% congestion urbaine", url: "https://www.weforum.org/reports/the-future-of-the-last-mile-ecosystem/" },
            { ref: "Eurostat", detail: "Déchets municipaux 2022 — 580 kg/habitant/an en France", url: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Municipal_waste_statistics" },
            { ref: "Basel Action Network", detail: "Export e-waste vers l'Afrique 2021 — ~1Mt/an", url: "https://www.ban.org/news/2021/1/7/ban-report-export-of-e-waste" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 py-1.5 border-b border-white/5">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold shrink-0 w-44 text-right hover:text-green-300 hover:underline transition-colors">{s.ref}</a>
              <span className="text-white/60">{s.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* ═══ 15 — Conclusion ═══ */
    <ImageSlide key="conclusion" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=80" overlay="bg-black/55">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-10">
        Merci !
      </h2>
      <div className="max-w-3xl space-y-4 mb-12">
        {[
          "La supply chain e-commerce a des impacts majeurs à chaque étape — environnementaux, sociaux et économiques",
          "La transparence est la clé : rendre ces impacts visibles au moment de l'achat change les comportements",
          "Des solutions existent : extension navigateur, indicateurs ESG, économie circulaire",
        ].map((msg, i) => (
          <div key={i} className="flex items-start gap-3 text-left">
            <ArrowRight className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
            <p className="text-white/90 text-lg">{msg}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-8 py-5 inline-flex flex-col items-center">
        <p className="text-white/60 text-sm mb-2">Groupe 7</p>
        <p className="text-white font-bold text-lg">Yoann · Alexis · Clément · Quentin</p>
        <p className="text-white/50 text-sm mt-1">Epitech 2026</p>
      </div>
      <p className="text-white/40 text-lg mt-8 font-medium">Des questions ?</p>
    </ImageSlide>,
  ];

  // Slides with light backgrounds where nav must use dark colors
  const isLight = [2, 3, 13].includes(current);

  /* ── Print mode: render all slides stacked with page breaks ── */
  if (printMode) {
    return (
      <div className="print-container bg-black">
        {slides.map((slide, i) => (
          <div key={i} className="print-slide-page">
            {slide}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-black relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="h-full w-full"
        >
          {slides[current]}
        </motion.div>
      </AnimatePresence>

      {/* PDF export button */}
      <button
        onClick={() => setPrintMode(true)}
        className={`fixed top-4 left-4 z-50 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
          isLight
            ? "bg-gray-900/10 hover:bg-gray-900/20 border border-gray-900/10 text-gray-900"
            : "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
        }`}
        title="Exporter en PDF"
      >
        <Download className="w-4 h-4" />
      </button>

      {/* Navigation arrows */}
      {current > 0 && (
        <button
          onClick={goPrev}
          className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
            isLight
              ? "bg-gray-900/10 hover:bg-gray-900/20 border border-gray-900/10 text-gray-900"
              : "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {current < TOTAL_SLIDES - 1 && (
        <button
          onClick={goNext}
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
            isLight
              ? "bg-gray-900/10 hover:bg-gray-900/20 border border-gray-900/10 text-gray-900"
              : "bg-white/10 hover:bg-white/20 border border-white/10 text-white"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Slide counter + dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all cursor-pointer ${
                i === current
                  ? `w-6 h-2 ${isLight ? "bg-gray-900" : "bg-white"}`
                  : `w-2 h-2 ${isLight ? "bg-gray-900/30 hover:bg-gray-900/50" : "bg-white/30 hover:bg-white/50"}`
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-mono ml-2 ${isLight ? "text-gray-900/40" : "text-white/40"}`}>
          {current + 1} / {TOTAL_SLIDES}
        </span>
      </div>
    </div>
  );
}
