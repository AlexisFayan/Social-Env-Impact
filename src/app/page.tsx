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
    img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1400&q=80",
    env: { text: "Déforestation, érosion des sols, pollution des eaux, perte de biodiversité", ex: "Mines de cobalt (RDC), déforestation Amazonie" },
    social: { text: "Travail des enfants, conditions dangereuses, déplacement de populations", ex: "Mines artisanales, exploitation communautés locales" },
    eco: { text: "Dépendance aux ressources non-renouvelables, volatilité des prix", ex: "Concentration géographique des ressources rares" },
    kpis: [{ label: "CO₂", value: "1 200 kg/t" }, { label: "Travail enfants", value: "15-20%" }, { label: "Volatilité prix", value: "±35%" }],
  },
  {
    id: 2, title: "Transformation & Fabrication", color: "#c2410c",
    img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1400&q=80",
    env: { text: "Émissions CO₂, pollution de l'air et de l'eau, consommation d'énergie", ex: "Usines textiles au Bangladesh, électronique en Chine" },
    social: { text: "Conditions de travail précaires, salaires insuffisants, horaires excessifs", ex: "Rana Plaza (2013), usines Foxconn" },
    eco: { text: "Délocalisation, course au moins-disant social", ex: "Fast fashion, électronique low-cost" },
    kpis: [{ label: "Salaire ouvrier", value: "0.32$/h" }, { label: "Heures sup.", value: "+20-30h/sem" }, { label: "Part travail", value: "2-4% du prix" }],
  },
  {
    id: 3, title: "Emballage & Packaging", color: "#0d9488",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1400&q=80",
    env: { text: "Suremballage, plastique à usage unique, déchets", ex: "Cartons Amazon surdimensionnés, polystyrène" },
    social: { text: "Perception de gaspillage, frustration consommateur", ex: "Unboxing vidéos montrant l'excès d'emballage" },
    eco: { text: "Coût caché répercuté sur le prix, gestion des déchets", ex: "Taxe emballage, filières REP" },
    kpis: [{ label: "Plastique non recyclé", value: "91%" }, { label: "Volume vide/colis", value: "~40%" }, { label: "Frustration conso.", value: "72%" }],
  },
  {
    id: 4, title: "Transport & Logistique", color: "#2563eb",
    img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1400&q=80",
    env: { text: "Émissions CO₂ (cargo, avion, camion), pollution maritime", ex: "Cargo Chine→Europe ≈ 15 000 km" },
    social: { text: "Conditions des chauffeurs/livreurs, précarité gig economy", ex: "Livreurs Amazon, marins marchands" },
    eco: { text: "Coût du dernier kilomètre, externalités non internalisées", ex: "Livraison gratuite = coût environnemental invisible" },
    kpis: [{ label: "CO₂ avion", value: "600g/t-km" }, { label: "Marins bloqués", value: "400 000" }, { label: "Coût CO₂ caché", value: "100€/t" }],
  },
  {
    id: 5, title: "Distribution & Vente en ligne", color: "#7c3aed",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
    env: { text: "Data centers énergivores, consommation électrique serveurs", ex: "AWS, Google Cloud — ~1% électricité mondiale" },
    social: { text: "Opacité de l'information, greenwashing, manipulation des avis", ex: "Labels trompeurs, faux éco-responsable" },
    eco: { text: "Concentration du marché, disparition du commerce local", ex: "Amazon = 40% du e-commerce US" },
    kpis: [{ label: "Greenwashing", value: "53% des claims" }, { label: "Part top 5", value: "65% du marché" }, { label: "Fermetures/an FR", value: "11 000" }],
  },
  {
    id: 6, title: "Livraison au consommateur", color: "#db2777",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&q=80",
    env: { text: "Derniers km en véhicule thermique, livraisons multiples", ex: "30% d'échec 1ère livraison" },
    social: { text: "Pression sur les livreurs, accidents, précarité", ex: "Micro-entrepreneurs sans protection sociale" },
    eco: { text: "Coût des retours (30% en fashion), gaspillage logistique", ex: "Produits retournés souvent détruits" },
    kpis: [{ label: "CO₂/colis", value: "1 050g" }, { label: "Auto-entrepreneurs", value: "85%" }, { label: "Retours mode", value: "30-50%" }],
  },
  {
    id: 7, title: "Utilisation par le client", color: "#059669",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80",
    env: { text: "Consommation d'énergie, eau, produits chimiques", ex: "Machine à laver, recharge smartphone" },
    social: { text: "Obsolescence programmée, frustration, surconsommation", ex: "Batteries non remplaçables, modes éphémères" },
    eco: { text: "Coût de possession vs coût d'achat", ex: "Réparation plus chère que le remplacement" },
    kpis: [{ label: "Durée de vie tel.", value: "2.5 ans" }, { label: "Réparabilité", value: "6.2/10" }, { label: "Réparation/neuf", value: "67% du prix" }],
  },
  {
    id: 8, title: "Fin de vie", color: "#dc2626",
    img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1400&q=80",
    env: { text: "E-waste, pollution des sols, micro-plastiques", ex: "Agbogbloshie (Ghana), désert Atacama" },
    social: { text: "Recyclage informel dangereux, exposition aux toxiques", ex: "Tri des déchets par des enfants" },
    eco: { text: "Perte de valeur matière, coût du traitement", ex: "Seulement 20% des e-waste recyclés" },
    kpis: [{ label: "E-waste monde", value: "62M tonnes" }, { label: "Recyclé", value: "seulement 20%" }, { label: "Valeur perdue", value: "3 500€/t" }],
  },
];

const systemicEffects = [
  { title: "Extraction → Santé", steps: ["Extraction minière", "Pollution des eaux", "Santé des communautés", "Coûts de santé"] },
  { title: "Extraction → Pauvreté", steps: ["Travail des enfants", "Déscolarisation", "Pauvreté structurelle", "Cycle perpétuel"] },
  { title: "Fabrication → Climat", steps: ["Émissions CO₂", "Changement climatique", "Événements extrêmes", "Migrations climatiques"] },
  { title: "Fin de vie → Alimentation", steps: ["Micro-plastiques", "Contamination océans", "Chaîne alimentaire", "Santé humaine"] },
];

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

const TOTAL_SLIDES = 15;

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
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold text-white/90 mb-4" style={{ background: ram.color }}>
            Étape {ram.id}
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{ram.title}</h2>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-sm font-bold text-green-400 uppercase tracking-wide">Environnemental</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-2">{ram.env.text}</p>
            <p className="text-white/50 text-xs italic">{ram.env.ex}</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-bold text-blue-400 uppercase tracking-wide">Social</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-2">{ram.social.text}</p>
            <p className="text-white/50 text-xs italic">{ram.social.ex}</p>
          </div>
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-amber-400 uppercase tracking-wide">Économique</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-2">{ram.eco.text}</p>
            <p className="text-white/50 text-xs italic">{ram.eco.ex}</p>
          </div>
        </div>

        {/* KPIs row */}
        <div className="flex flex-wrap justify-center gap-4">
          {ram.kpis.map((kpi, i) => (
            <div key={i} className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-6 py-3 text-center">
              <div className="text-2xl font-extrabold text-white">{kpi.value}</div>
              <div className="text-xs text-white/60 mt-0.5">{kpi.label}</div>
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
          <div className="text-5xl font-black text-red-400 mb-2">62M</div>
          <div className="text-sm text-white/70">tonnes de e-waste par an dans le monde</div>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
          <div className="text-5xl font-black text-red-400 mb-2">91%</div>
          <div className="text-sm text-white/70">du plastique n&apos;est jamais recyclé</div>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center">
          <div className="text-5xl font-black text-red-400 mb-2">40K</div>
          <div className="text-sm text-white/70">enfants dans les mines de cobalt (RDC)</div>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemicEffects.map((effect, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm text-left">
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
            <div className="text-5xl font-black text-green-600 mb-2">~50</div>
            <div className="text-sm text-gray-500 font-medium">KPIs quantifiés</div>
            <div className="text-xs text-gray-400 mt-1">Environnement, Social, Économie</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-8 text-center">
            <div className="text-5xl font-black text-green-600 mb-2">8</div>
            <div className="text-sm text-gray-500 font-medium">Étapes du cycle évaluées</div>
            <div className="text-xs text-gray-400 mt-1">Extraction → Fin de vie</div>
          </div>
          <div className="rounded-2xl border border-gray-200 p-8 text-center">
            <div className="text-5xl font-black text-green-600 mb-2">ESG</div>
            <div className="text-sm text-gray-500 font-medium">Cadre d&apos;évaluation</div>
            <div className="text-xs text-gray-400 mt-1">Environmental, Social, Governance</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
          <div className="rounded-xl bg-gray-50 p-5">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Gauge className="w-4 h-4 text-green-600" /> Principes SMART</h4>
            <p className="text-sm text-gray-600">Specific, Measurable, Actionable, Relevant, Time-bound — chaque indicateur est concret et vérifiable.</p>
          </div>
          <div className="rounded-xl bg-gray-50 p-5">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Search className="w-4 h-4 text-green-600" /> Sources</h4>
            <p className="text-sm text-gray-600">ADEME, UNICEF, Commission Européenne, Global E-waste Monitor, Clean Clothes Campaign, Procos, CITEO.</p>
          </div>
        </div>
      </div>
    </Slide>,

    /* ═══ 14 — Conclusion ═══ */
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

      {/* Navigation arrows */}
      {current > 0 && (
        <button
          onClick={goPrev}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {current < TOTAL_SLIDES - 1 && (
        <button
          onClick={goNext}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer"
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
                i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <span className="text-white/40 text-xs font-mono ml-2">
          {current + 1} / {TOTAL_SLIDES}
        </span>
      </div>
    </div>
  );
}
