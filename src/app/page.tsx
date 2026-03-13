"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
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
  Gauge,
  AlertTriangle,
  Globe,
  Download,
  MapPin,
  Database,
  Eye,
  TrendingDown,
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

const upstream = [
  {
    stage: "1. Extraction", color: "#b45309",
    impact: "1 smartphone = 70 kg de roche extraite, mines de cobalt au Congo",
    stat: "70 kg", statLabel: "de matières premières / smartphone", src: "ADEME/FNE 2017",
    extension: "Origine des minerais, certifications RMI, traçabilité cobalt",
  },
  {
    stage: "2. Fabrication", color: "#c2410c",
    impact: "~80% de l'empreinte carbone totale vient de la fabrication en usine",
    stat: "~66 kg CO₂", statLabel: "pour fabriquer 1 iPhone 15", src: "Apple Env. Report 2023",
    extension: "Score carbone usine, conditions travail, pays d'assemblage",
  },
  {
    stage: "3. Emballage", color: "#0d9488",
    impact: "Retrait chargeur = 861 000 t de minerai économisées (cuivre, étain, zinc)",
    stat: "−75%", statLabel: "d'emballage Apple depuis 2015", src: "Apple Env. Report 2023",
    extension: "Type d'emballage, recyclabilité, indice de sobriété",
  },
];

const midstream = [
  {
    stage: "4. Transport", color: "#2563eb",
    impact: "Smartphone expédié par avion depuis Shenzhen — 50× plus polluant que le maritime",
    stats: [
      { value: "~3 kg CO₂", label: "transport dans le cycle de vie", src: "Apple Env. Report 2023" },
      { value: "3%", label: "du CO₂ mondial = transport maritime", src: "IMO 2020" },
    ],
  },
  {
    stage: "5. Distribution", color: "#7c3aed",
    impact: "Pages produit sur data centers, greenwashing labels, 8-10% de retours électronique",
    stats: [
      { value: "53.3%", label: "allégations vertes trompeuses", src: "Commission EU 2021" },
      { value: "8-10%", label: "taux de retour électronique", src: "Statista 2023" },
    ],
  },
];

const downstream = [
  {
    stage: "6. Livraison", color: "#db2777",
    impact: "Camionnette thermique, retour = double impact CO₂ sur toute la chaîne",
    stat: "~500g CO₂", statLabel: "par colis livré (chaîne complète)", src: "ADEME 2022",
    change: "Choix livraison groupée, point relais (−30% CO₂)",
  },
  {
    stage: "7. Utilisation", color: "#059669",
    impact: "Smartphone remplacé tous les 2.5 ans alors qu'il peut durer 5-7 ans",
    stat: "2.5 ans", statLabel: "durée de vie moyenne", src: "ADEME 2023",
    change: "+1 an de durée de vie = −25% d'impact annuel",
  },
  {
    stage: "8. Fin de vie", color: "#dc2626",
    impact: "77.7% non recyclé — 1t de smartphones contient 300g d'or (vs 5g en mine)",
    stat: "22.3%", statLabel: "seulement recyclé correctement", src: "UNITAR 2024",
    change: "Points de collecte, filières certifiées",
  },
];

/* Impact assessment data — grouped by lifecycle zone, each row = Step → Type → Indicator → Value → Impact */
const typeBg: Record<string, string> = { ENV: "bg-green-100 text-green-700", SOC: "bg-blue-100 text-blue-700", ECO: "bg-amber-100 text-amber-700", GEO: "bg-orange-100 text-orange-700" };

const assessmentAmont = [
  { step: "1. Extraction", stepColor: "#b45309", type: "ENV", indicator: "Matières premières pour 1 smartphone", value: "70 kg", impact: "Dont cobalt, lithium, terres rares", src: "ADEME/FNE 2017" },
  { step: "1. Extraction", stepColor: "#b45309", type: "SOC", indicator: "Enfants dans les mines de cobalt (RDC)", value: "~40 000", impact: ">50% du cobalt mondial vient de RDC", src: "UNICEF 2014" },
  { step: "2. Fabrication", stepColor: "#c2410c", type: "ENV", indicator: "CO₂ fabrication d'1 iPhone 15", value: "~66 kg", impact: "= ~80% de l'empreinte carbone totale", src: "Apple Env. Report 2023" },
  { step: "2. Fabrication", stepColor: "#c2410c", type: "SOC", indicator: "Heures/semaine ouvrier assemblage", value: "60h/sem", impact: "Dépassement des limites légales", src: "China Labor Watch 2019" },
  { step: "3. Emballage", stepColor: "#0d9488", type: "ENV", indicator: "Réduction emballage Apple depuis 2015", value: "−75%", impact: "100% fibre recyclée dans le packaging", src: "Apple Env. Report 2023" },
  { step: "3. Emballage", stepColor: "#0d9488", type: "ECO", indicator: "Économie retrait chargeur (Apple)", value: "861 000 t", impact: "Minerai cuivre, étain, zinc non extrait", src: "Apple Env. Report 2021" },
];

const assessmentMidstream = [
  { step: "4. Transport", stepColor: "#2563eb", type: "ENV", indicator: "CO₂ transport dans le cycle de vie", value: "~3 kg", impact: "~5% de l'empreinte totale du smartphone", src: "Apple Env. Report 2023" },
  { step: "4. Transport", stepColor: "#2563eb", type: "GEO", indicator: "CO₂ mondial du transport maritime", value: "3%", impact: "~1 Mrd tonnes CO₂/an", src: "IMO 2020" },
  { step: "4. Transport", stepColor: "#2563eb", type: "ECO", indicator: "Coût social du CO₂ (horizon 2030)", value: "250€/t", impact: "Non répercuté dans le prix du produit", src: "Quinet 2019" },
  { step: "5. Distribution", stepColor: "#7c3aed", type: "ENV", indicator: "Taux de retour électronique", value: "8-10%", impact: "Double transport, reconditionnement", src: "Statista 2023" },
  { step: "5. Distribution", stepColor: "#7c3aed", type: "SOC", indicator: "Greenwashing allégations UE", value: "53.3%", impact: "Consommateurs induits en erreur", src: "Commission EU 2021" },
  { step: "5. Distribution", stepColor: "#7c3aed", type: "GEO", indicator: "Vacance commerciale centres-villes FR", value: "12.5%", impact: "Dévitalisation des cœurs de ville", src: "Procos 2023" },
];

const assessmentAval = [
  { step: "6. Livraison", stepColor: "#db2777", type: "ENV", indicator: "CO₂ par colis livré (chaîne complète)", value: "~500g", impact: "×3 Mrd colis/an FR = 1.5 Mt CO₂", src: "ADEME 2022" },
  { step: "6. Livraison", stepColor: "#db2777", type: "SOC", indicator: "Livreurs plateformes auto-entrepreneurs", value: "~97%", impact: "Aucune protection sociale", src: "DARES 2022" },
  { step: "7. Utilisation", stepColor: "#059669", type: "ENV", indicator: "Durée de vie réelle smartphone", value: "2.5 ans", impact: "+1 an gardé = −25% d'impact/an", src: "ADEME 2023" },
  { step: "7. Utilisation", stepColor: "#059669", type: "SOC", indicator: "Scores réparabilité surévalués", value: "+1.5 pts", impact: "Indice trompeur pour le consommateur", src: "HOP 2023" },
  { step: "8. Fin de vie", stepColor: "#dc2626", type: "ENV", indicator: "E-waste non recyclé correctement", value: "77.7%", impact: "Métaux précieux perdus définitivement", src: "UNITAR 2024" },
  { step: "8. Fin de vie", stepColor: "#dc2626", type: "ECO", indicator: "Or dans 1 tonne de smartphones", value: "300g", impact: "vs 5g/t en mine — 60× plus concentré", src: "UNEP 2013" },
];

const systemicEffects = [
  { title: "Extraction → Santé", steps: ["Extraction minière", "Pollution des eaux", "Santé communautés", "Coûts de santé"], positive: false },
  { title: "Fabrication → Climat", steps: ["Émissions CO₂", "Changement climatique", "Événements extrêmes", "Migrations"], positive: false },
  { title: "Transport → Santé urbaine", steps: ["Camions thermiques", "NOₓ & particules", "Asthme & cardio", "Coût santé publique"], positive: false },
  { title: "Distribution → Territoires", steps: ["E-commerce concentré", "Fermeture boutiques", "Centres-villes vides", "Fracture territoriale"], positive: false },
  { title: "Fin de vie → Alimentation", steps: ["Micro-plastiques", "Contamination océans", "Chaîne alimentaire", "Santé humaine"], positive: false },
  { title: "Extension → Changement ✓", steps: ["Transparence achat", "Choix éclairés", "Pression marché", "Pratiques améliorées"], positive: true },
];

const sourceUrls: Record<string, string> = {
  "ADEME/FNE 2017": "https://www.actu-environnement.com/media/pdf/news-29628-empreinte-cachee-smartphone.pdf",
  "UNICEF 2014": "https://www.unicef.org/drcongo/en/topics/child-labour",
  "Apple Env. Report 2023": "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2023.pdf",
  "Apple Env. Report 2021": "https://www.apple.com/environment/pdf/Apple_Environmental_Progress_Report_2021.pdf",
  "China Labor Watch 2019": "https://chinalaborwatch.org/iphone-11-illegally-produced-in-china-apple-allows-supplier-factory-foxconn-to-violate-labor-laws/",
  "ADEME 2023": "https://agirpourlatransition.ademe.fr/particuliers/mieux-consommer/numerique/prolonger-vie-telephone-portable",
  "ADEME 2022": "https://infos.ademe.fr/article-magazine/limpact-environnemental-du-commerce-en-ligne/",
  "IMO 2020": "https://www.imo.org/en/MediaCentre/HotTopics/Pages/Sulphur-2020.aspx",
  "Quinet 2019": "https://www.strategie.gouv.fr/sites/strategie.gouv.fr/files/atoms/files/dp-valeur-action-pour-climat-fevrier-2019.pdf",
  "Statista 2023": "https://www.statista.com/statistics/871365/reverse-logistics-return-rate-worldwide-by-category/",
  "Commission EU 2021": "https://ec.europa.eu/commission/presscorner/detail/en/ip_21_269",
  "Procos 2023": "https://www.procos.org/",
  "DARES 2022": "https://dares.travail-emploi.gouv.fr/publication/les-travailleurs-de-plateforme-quels-profils-et-quelles-conditions-de-travail",
  "HOP 2023": "https://www.halteobsolescence.org/lindice-de-reparabilite-tient-il-ses-promesses/",
  "UNITAR 2024": "https://ewastemonitor.info/the-global-e-waste-monitor-2024/",
  "UNEP 2013": "https://www.unep.org/resources/report/metal-recycling-opportunities-limits-infrastructure",
  "OECD 2022": "https://www.oecd.org/en/publications/2022/02/global-plastics-outlook_a653d1c9.html",
};

/* ═══════════════════════════════════════
   CIRCLE DIAGRAM — with extension integration zones
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

  // Zone arcs — outer orbit well beyond the nodes
  const arcR = R + 95;
  const arcPath = (a1deg: number, a2deg: number) => {
    const a1 = (a1deg * Math.PI) / 180;
    const a2 = (a2deg * Math.PI) / 180;
    const x1 = cx + arcR * Math.cos(a1);
    const y1 = cy + arcR * Math.sin(a1);
    const x2 = cx + arcR * Math.cos(a2);
    const y2 = cy + arcR * Math.sin(a2);
    const sweep = a2deg - a1deg > 180 ? 1 : 0;
    return `M${x1.toFixed(1)},${y1.toFixed(1)} A${arcR},${arcR} 0 ${sweep},1 ${x2.toFixed(1)},${y2.toFixed(1)}`;
  };

  // Label positions (on the outer orbit arcs)
  const labelR = R + 97;
  const labelPos = (angleDeg: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + labelR * Math.cos(a), y: cy + labelR * Math.sin(a) };
  };

  const upLabel = labelPos(-45);
  const midLabel = labelPos(67.5);
  const downLabel = labelPos(180);

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

      {/* Zone arcs */}
      <path d={arcPath(-90, 0)} fill="none" stroke="#f59e0b" strokeWidth="18" opacity="0.15" strokeLinecap="round" />
      <path d={arcPath(45, 90)} fill="none" stroke="#8b5cf6" strokeWidth="18" opacity="0.15" strokeLinecap="round" />
      <path d={arcPath(135, 225)} fill="none" stroke="#22c55e" strokeWidth="18" opacity="0.15" strokeLinecap="round" />

      {/* Zone labels — positioned along the outer arcs */}
      <text x={upLabel.x} y={upLabel.y - 6} textAnchor="middle" fontWeight="700" fontSize="10" fill="#f59e0b">Collecte données</text>
      <text x={upLabel.x} y={upLabel.y + 7} textAnchor="middle" fontWeight="500" fontSize="8.5" fill="#92400e" opacity="0.7">Étapes 1-3</text>
      <text x={midLabel.x} y={midLabel.y - 6} textAnchor="middle" fontWeight="700" fontSize="10" fill="#8b5cf6">Interception</text>
      <text x={midLabel.x} y={midLabel.y + 7} textAnchor="middle" fontWeight="500" fontSize="8.5" fill="#6d28d9" opacity="0.7">Étapes 4-5</text>
      <text x={downLabel.x} y={downLabel.y - 6} textAnchor="end" fontWeight="700" fontSize="10" fill="#22c55e">Impact comportemental</text>
      <text x={downLabel.x} y={downLabel.y + 7} textAnchor="end" fontWeight="500" fontSize="8.5" fill="#166534" opacity="0.7">Étapes 6-8</text>

      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="10 6" opacity="0.35" />
      {arrows.map((d, i) => (
        <path key={`a${i}`} d={d} fill="none" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrowGreen)" opacity="0.5" />
      ))}

      {/* Center — Extension */}
      <circle cx={cx} cy={cy} r={68} fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      <text x={cx} y={cy - 12} textAnchor="middle" fontWeight="800" fontSize="22" fill="#111827">🔍</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontWeight="700" fontSize="11" fill="#111827">Notre Extension</text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontWeight="500" fontSize="9" fill="#4b5563">Info temps réel</text>

      {/* Nodes */}
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

const TOTAL_SLIDES = 12;

function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden relative ${className}`}>
      {children}
    </div>
  );
}

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
      const style = document.createElement("style");
      style.id = "pdf-export-styles";
      style.textContent = [
        "@page { size: 338.667mm 190.5mm; margin: 0; }",
        "@media print {",
        "  *, *::before, *::after { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }",
        "  html, body { margin:0!important; padding:0!important; background:#000!important; overflow:visible!important; height:auto!important; width:auto!important; }",
        "  .pdf-slide { display:block!important; width:338.667mm!important; height:190.5mm!important; overflow:hidden!important; position:relative!important; page-break-after:always; break-after:page; page-break-inside:avoid; break-inside:avoid; }",
        "  .pdf-slide:last-child { page-break-after:auto; break-after:auto; }",
        "  .pdf-slide .h-screen { height:190.5mm!important; min-height:190.5mm!important; }",
        "  .pdf-slide [class*='backdrop-blur'] { backdrop-filter:none!important; -webkit-backdrop-filter:none!important; background-color:rgba(0,0,0,0.6)!important; }",
        "  .pdf-slide .bg-clip-text { -webkit-background-clip:unset!important; background-clip:unset!important; -webkit-text-fill-color:unset!important; color:#6ee7b7!important; background:none!important; }",
        "  .pdf-slide .text-transparent { color:inherit!important; }",
        "  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0,1fr))!important; }",
        "  .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0,1fr))!important; }",
        "  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0,1fr))!important; }",
        "  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0,1fr))!important; }",
        "  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0,1fr))!important; }",
        "  .sm\\:text-4xl { font-size:2.25rem!important; line-height:2.5rem!important; }",
        "  .sm\\:text-5xl { font-size:3rem!important; line-height:1!important; }",
        "  .lg\\:text-6xl { font-size:3.75rem!important; line-height:1!important; }",
        "  .lg\\:text-7xl { font-size:4.5rem!important; line-height:1!important; }",
        "  .sm\\:px-12 { padding-left:3rem!important; padding-right:3rem!important; }",
        "  .lg\\:px-20 { padding-left:5rem!important; padding-right:5rem!important; }",
        "  .hidden.lg\\:block { display:block!important; }",
        "}",
      ].join("\n");
      document.head.appendChild(style);

      const timer = setTimeout(() => {
        const images = Array.from(document.querySelectorAll(".pdf-slide img"));
        const promises = images.map((img) => {
          const el = img as HTMLImageElement;
          if (el.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            el.onload = () => resolve();
            el.onerror = () => resolve();
          });
        });
        Promise.all(promises).then(() => window.print());
      }, 500);

      const onAfterPrint = () => setPrintMode(false);
      window.addEventListener("afterprint", onAfterPrint);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("afterprint", onAfterPrint);
        style.remove();
      };
    }
  }, [printMode]);

  const slides = [

    /* ══════════════════════════════════════════════
       PART 1 — LE PROJET (slides 0-2)
       ══════════════════════════════════════════════ */

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
      <p className="text-xl text-white/80 mb-4">Extension navigateur — Transparence de la supply chain e-commerce</p>
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
          <div className="text-sm text-white/70">de e-waste générés par an</div>
          <div className="text-[10px] text-white/30 mt-2 italic">
            {sourceUrls["UNITAR 2024"] ? <a href={sourceUrls["UNITAR 2024"]} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 underline">UNITAR/ITU 2024</a> : "UNITAR/ITU 2024"}
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
          <div className="text-5xl font-black text-red-400 mb-2">91%</div>
          <div className="text-sm text-white/70">du plastique jamais recyclé</div>
          <div className="text-[10px] text-white/30 mt-2 italic">
            {sourceUrls["OECD 2022"] ? <a href={sourceUrls["OECD 2022"]} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 underline">OECD 2022</a> : "OECD 2022"}
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
          <div className="text-5xl font-black text-red-400 mb-2">40K</div>
          <div className="text-sm text-white/70">enfants dans les mines de cobalt</div>
          <div className="text-[10px] text-white/30 mt-2 italic">
            {sourceUrls["UNICEF 2014"] ? <a href={sourceUrls["UNICEF 2014"]} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 underline">UNICEF 2014</a> : "UNICEF 2014"}
          </div>
        </div>
      </div>
      <p className="text-white/50 text-sm mt-8 max-w-2xl">
        Le consommateur n&apos;a aucune visibilité sur l&apos;impact réel des produits qu&apos;il achète en ligne.
      </p>
    </ImageSlide>,

    /* ═══ 2 — Notre Solution ═══ */
    <Slide key="solution" className="bg-white">
      <div className="max-w-5xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm font-bold text-green-700 mb-6">
          <Lightbulb className="w-4 h-4" />
          Notre Solution
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">
          Une extension navigateur pour
          <br />
          <span className="text-green-600">rendre visible l&apos;invisible</span>
        </h2>

        {/* How it works flow */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-sm">
          {["Installez l'extension", "Naviguez sur un e-commerce", "Score d'impact affiché", "Choisissez en conscience"].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && <ArrowRight className="w-4 h-4 text-green-400 shrink-0" />}
              <span className="px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 font-medium">{i + 1}. {step}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: "Score Environnemental", desc: "Empreinte carbone, labels, distance parcourue", bg: "bg-green-50", color: "text-green-700" },
            { icon: Handshake, title: "Indicateurs Éthiques", desc: "Pays de production, labels sociaux, controverses", bg: "bg-blue-50", color: "text-blue-700" },
            { icon: Zap, title: "Alternatives Responsables", desc: "Produits similaires avec meilleur score d'impact", bg: "bg-amber-50", color: "text-amber-700" },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="rounded-2xl border border-gray-200 p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-6 h-6 ${c.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>,

    /* ══════════════════════════════════════════════
       PART 2 — CYCLE DE VIE + OÙ L'EXTENSION S'INTÈGRE (slides 3-6)
       ══════════════════════════════════════════════ */

    /* ═══ 3 — Cycle de Vie Intégré ═══ */
    <Slide key="cycle" className="bg-gray-50">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-2">Cycle de Vie &amp; Intégration de l&apos;Extension</h2>
        <p className="text-gray-500 mb-4">8 étapes — 3 zones d&apos;intervention de notre service</p>
        <CircleDiagram />
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-700">
            <Database className="w-3 h-3" /> Collecte données (1-3)
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-700">
            <Eye className="w-3 h-3" /> Interception (4-5)
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-xs font-semibold text-green-700">
            <TrendingDown className="w-3 h-3" /> Impact comportemental (6-8)
          </div>
        </div>
      </div>
    </Slide>,

    /* ═══ 4 — Amont: Données agrégées (Étapes 1-3) ═══ */
    <ImageSlide key="upstream" src="https://images.unsplash.com/photo-1629807473015-41699c4471b5?w=1400&q=80" overlay="bg-black/70">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-sm font-bold text-amber-300 mb-6">
        <Database className="w-4 h-4" />
        Amont — Données que nous agrégeons
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
        Étapes 1-3 : Extraction, Fabrication, Emballage
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mb-6">
        {upstream.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5">
            <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold text-white/90 mb-3" style={{ background: s.color }}>
              {s.stage}
            </div>
            <p className="text-white/80 text-sm mb-3 leading-relaxed">{s.impact}</p>
            <div className="text-2xl font-extrabold text-white">{s.stat}</div>
            <div className="text-xs text-white/50">{s.statLabel}</div>
            <div className="text-[10px] text-white/30 mt-1 italic">
              {sourceUrls[s.src] ? <a href={sourceUrls[s.src]} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 underline">{s.src}</a> : s.src}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="text-[10px] text-amber-400 font-bold uppercase mb-1">Notre extension collecte :</div>
              <p className="text-xs text-white/60">{s.extension}</p>
            </div>
          </div>
        ))}
      </div>
    </ImageSlide>,

    /* ═══ 5 — Point de vente: Interception (Étapes 4-5) ═══ */
    <ImageSlide key="midstream" src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80" overlay="bg-black/70">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-sm font-bold text-purple-300 mb-6">
        <Eye className="w-4 h-4" />
        Point de Vente — Là où l&apos;extension agit
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
        Étapes 4-5 : Transport &amp; Distribution
      </h2>
      <p className="text-white/50 text-sm mb-8 max-w-2xl">L&apos;extension s&apos;active sur la fiche produit et affiche le score d&apos;impact en temps réel</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
        {midstream.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-6">
            <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold text-white/90 mb-3" style={{ background: s.color }}>
              {s.stage}
            </div>
            <p className="text-white/80 text-sm mb-4 leading-relaxed">{s.impact}</p>
            <div className="flex gap-4">
              {s.stats.map((st, j) => (
                <div key={j} className="flex-1 rounded-xl bg-white/5 p-3 text-center">
                  <div className="text-xl font-extrabold text-white">{st.value}</div>
                  <div className="text-[10px] text-white/50 mt-1">{st.label}</div>
                  <div className="text-[9px] text-white/25 mt-1">
                    {sourceUrls[st.src] ? <a href={sourceUrls[st.src]} target="_blank" rel="noopener noreferrer" className="hover:text-white/40 underline">{st.src}</a> : st.src}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Extension activation flow */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        {["Fiche produit détectée", "Requête base de données", "Score calculé", "Overlay affiché"].map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <ArrowRight className="w-3 h-3 text-purple-400" />}
            <span className="px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/20 text-purple-300 font-medium">{step}</span>
          </div>
        ))}
      </div>
    </ImageSlide>,

    /* ═══ 6 — Aval: Changement comportemental (Étapes 6-8) ═══ */
    <ImageSlide key="downstream" src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1400&q=80" overlay="bg-black/70">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-sm font-bold text-green-300 mb-6">
        <TrendingDown className="w-4 h-4" />
        Aval — Le changement que nous provoquons
      </div>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
        Étapes 6-8 : Livraison, Utilisation, Fin de vie
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl mb-6">
        {downstream.map((s, i) => (
          <div key={i} className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5">
            <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold text-white/90 mb-3" style={{ background: s.color }}>
              {s.stage}
            </div>
            <p className="text-white/80 text-sm mb-3 leading-relaxed">{s.impact}</p>
            <div className="text-2xl font-extrabold text-white">{s.stat}</div>
            <div className="text-xs text-white/50">{s.statLabel}</div>
            <div className="text-[10px] text-white/30 mt-1 italic">
              {sourceUrls[s.src] ? <a href={sourceUrls[s.src]} target="_blank" rel="noopener noreferrer" className="hover:text-white/50 underline">{s.src}</a> : s.src}
            </div>
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="text-[10px] text-green-400 font-bold uppercase mb-1">Changement provoqué :</div>
              <p className="text-xs text-white/60">{s.change}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-green-500/10 border border-green-400/20 px-6 py-3">
        <p className="text-green-300 text-sm font-medium">Impact projeté : −15% retours, +1 an durée de vie smartphone, +30% recyclage orienté</p>
      </div>
    </ImageSlide>,

    /* ══════════════════════════════════════════════
       PART 3 — ÉVALUATION D'IMPACT (slides 7-10)
       ══════════════════════════════════════════════ */

    /* ═══ 7 — Évaluation d'impact — Amont (Étapes 1-3) ═══ */
    <Slide key="assess-amont" className="bg-white">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-bold text-amber-700 mb-4">
            <Database className="w-4 h-4" />
            Évaluation d&apos;impact — Amont
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">Étapes 1-3 : Extraction, Fabrication, Emballage</h2>
          <p className="text-sm text-gray-400 mt-2">Cas d&apos;étude : le cycle de vie d&apos;1 smartphone</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold text-[10px]">ENV</span><span className="text-gray-400">Environnemental</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[10px]">SOC</span><span className="text-gray-400">Social</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold text-[10px]">ECO</span><span className="text-gray-400">Économique</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-bold text-[10px]">GEO</span><span className="text-gray-400">Territorial</span></span>
          </div>
        </div>
        <div className="space-y-2.5">
          {assessmentAmont.map((row, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl bg-gray-50 border border-gray-200 px-5 py-3" style={{ borderLeftWidth: 4, borderLeftColor: row.stepColor }}>
              <div className="w-32 shrink-0 text-sm font-bold text-gray-800">{row.step}</div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${typeBg[row.type]}`}>{row.type}</span>
              <div className="flex-1 text-sm text-gray-600">{row.indicator}</div>
              <div className="text-xl font-extrabold text-gray-900 shrink-0 w-28 text-right">{row.value}</div>
              <div className="w-52 shrink-0 text-xs text-gray-500 italic">{row.impact}</div>
              <div className="text-[10px] text-gray-400 shrink-0">
                {sourceUrls[row.src] ? (
                  <a href={sourceUrls[row.src]} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">{row.src}</a>
                ) : row.src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* ═══ 8 — Évaluation d'impact — Point de vente (Étapes 4-5) ═══ */
    <Slide key="assess-mid" className="bg-white">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-sm font-bold text-purple-700 mb-4">
            <Eye className="w-4 h-4" />
            Évaluation d&apos;impact — Point de vente
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">Étapes 4-5 : Transport &amp; Distribution</h2>
          <p className="text-sm text-gray-400 mt-2">Cas d&apos;étude : le cycle de vie d&apos;1 smartphone</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold text-[10px]">ENV</span><span className="text-gray-400">Environnemental</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[10px]">SOC</span><span className="text-gray-400">Social</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold text-[10px]">ECO</span><span className="text-gray-400">Économique</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-bold text-[10px]">GEO</span><span className="text-gray-400">Territorial</span></span>
          </div>
        </div>
        <div className="space-y-2.5">
          {assessmentMidstream.map((row, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl bg-gray-50 border border-gray-200 px-5 py-3" style={{ borderLeftWidth: 4, borderLeftColor: row.stepColor }}>
              <div className="w-32 shrink-0 text-sm font-bold text-gray-800">{row.step}</div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${typeBg[row.type]}`}>{row.type}</span>
              <div className="flex-1 text-sm text-gray-600">{row.indicator}</div>
              <div className="text-xl font-extrabold text-gray-900 shrink-0 w-28 text-right">{row.value}</div>
              <div className="w-52 shrink-0 text-xs text-gray-500 italic">{row.impact}</div>
              <div className="text-[10px] text-gray-400 shrink-0">
                {sourceUrls[row.src] ? (
                  <a href={sourceUrls[row.src]} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">{row.src}</a>
                ) : row.src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* ═══ 9 — Évaluation d'impact — Aval (Étapes 6-8) ═══ */
    <Slide key="assess-aval" className="bg-white">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm font-bold text-green-700 mb-4">
            <TrendingDown className="w-4 h-4" />
            Évaluation d&apos;impact — Aval
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">Étapes 6-8 : Livraison, Utilisation, Fin de vie</h2>
          <p className="text-sm text-gray-400 mt-2">Cas d&apos;étude : le cycle de vie d&apos;1 smartphone</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-bold text-[10px]">ENV</span><span className="text-gray-400">Environnemental</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold text-[10px]">SOC</span><span className="text-gray-400">Social</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold text-[10px]">ECO</span><span className="text-gray-400">Économique</span></span>
            <span className="inline-flex items-center gap-1.5 text-[11px]"><span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-bold text-[10px]">GEO</span><span className="text-gray-400">Territorial</span></span>
          </div>
        </div>
        <div className="space-y-2.5">
          {assessmentAval.map((row, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl bg-gray-50 border border-gray-200 px-5 py-3" style={{ borderLeftWidth: 4, borderLeftColor: row.stepColor }}>
              <div className="w-32 shrink-0 text-sm font-bold text-gray-800">{row.step}</div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${typeBg[row.type]}`}>{row.type}</span>
              <div className="flex-1 text-sm text-gray-600">{row.indicator}</div>
              <div className="text-xl font-extrabold text-gray-900 shrink-0 w-28 text-right">{row.value}</div>
              <div className="w-52 shrink-0 text-xs text-gray-500 italic">{row.impact}</div>
              <div className="text-[10px] text-gray-400 shrink-0">
                {sourceUrls[row.src] ? (
                  <a href={sourceUrls[row.src]} target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 hover:underline">{row.src}</a>
                ) : row.src}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* ═══ 10 — Effets Systémiques ═══ */
    <Slide key="systemic" className="bg-white">
      <div className="max-w-5xl w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm font-bold text-gray-700 mb-6">
          <Globe className="w-4 h-4" />
          Effets Systémiques
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-3">Comment les impacts se propagent</h2>
        <p className="text-gray-500 mb-8 text-sm">5 chaînes causales négatives — et 1 levier positif créé par notre extension</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemicEffects.map((effect, i) => (
            <div key={i} className={`rounded-2xl p-5 text-left ${
              effect.positive
                ? "bg-green-50 border-2 border-green-300"
                : "bg-gray-50 border border-gray-200"
            }`}>
              <h4 className={`font-bold text-base mb-4 ${effect.positive ? "text-green-700" : "text-red-600"}`}>{effect.title}</h4>
              <div className="space-y-2.5">
                {effect.steps.map((step, j) => (
                  <div key={j} className="flex items-center gap-3">
                    {j > 0 ? (
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${effect.positive ? "text-green-500" : "text-red-400"}`} />
                    ) : (
                      <div className={`w-2 h-2 rounded-full shrink-0 ${effect.positive ? "bg-green-500" : "bg-red-400"}`} />
                    )}
                    <span className="text-sm text-gray-800">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>,

    /* ══════════════════════════════════════════════
       CLOSING (slide 11)
       ══════════════════════════════════════════════ */

    /* ═══ 11 — Conclusion ═══ */
    <ImageSlide key="conclusion" src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&q=80" overlay="bg-black/55">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-10">
        Merci !
      </h2>
      <div className="max-w-3xl space-y-4 mb-10">
        {[
          "1 smartphone = 70 kg de matières, ~66 kg CO₂, 2.5 ans de durée de vie — notre extension rend ça visible",
          "En informant au moment de l'achat, on crée un levier de changement systémique",
          "18 KPIs sourcés sur 4 dimensions ESG+ appliqués au cycle de vie d'un produit concret",
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

  const isLight = [2, 3, 7, 8, 9, 10].includes(current);

  if (printMode) {
    return (
      <div style={{ background: "#000", overflow: "visible" }}>
        {slides.map((slide, i) => (
          <div key={i} className="pdf-slide">
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

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all cursor-pointer ${
                i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/50"
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
