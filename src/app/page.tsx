"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
    env: { text: "Déforestation, érosion des sols, pollution des eaux, perte de biodiversité", ex: "Mines de cobalt (RDC), déforestation Amazonie" },
    social: { text: "Travail des enfants, conditions dangereuses, déplacement de populations", ex: "Mines artisanales, exploitation communautés locales" },
    eco: { text: "Dépendance aux ressources non-renouvelables, volatilité des prix", ex: "Concentration géographique des ressources rares" },
  },
  {
    id: 2, title: "Transformation & Fabrication", color: "#c2410c",
    env: { text: "Émissions CO₂, pollution de l'air et de l'eau, consommation d'énergie", ex: "Usines textiles au Bangladesh, électronique en Chine" },
    social: { text: "Conditions de travail précaires, salaires insuffisants, horaires excessifs", ex: "Rana Plaza (2013), usines Foxconn" },
    eco: { text: "Délocalisation, course au moins-disant social", ex: "Fast fashion, électronique low-cost" },
  },
  {
    id: 3, title: "Emballage & Packaging", color: "#0d9488",
    env: { text: "Suremballage, plastique à usage unique, déchets", ex: "Cartons Amazon surdimensionnés, polystyrène" },
    social: { text: "Perception de gaspillage, frustration consommateur", ex: "Unboxing vidéos montrant l'excès d'emballage" },
    eco: { text: "Coût caché répercuté sur le prix, gestion des déchets", ex: "Taxe emballage, filières REP" },
  },
  {
    id: 4, title: "Transport & Logistique", color: "#2563eb",
    env: { text: "Émissions CO₂ (cargo, avion, camion), pollution maritime", ex: "Cargo Chine→Europe ≈ 15 000 km" },
    social: { text: "Conditions des chauffeurs/livreurs, précarité gig economy", ex: "Livreurs Amazon, marins marchands" },
    eco: { text: "Coût du dernier kilomètre, externalités non internalisées", ex: "Livraison gratuite = coût environnemental invisible" },
  },
  {
    id: 5, title: "Distribution & Vente en ligne", color: "#7c3aed",
    env: { text: "Data centers énergivores, consommation électrique serveurs", ex: "AWS, Google Cloud — ~1% électricité mondiale" },
    social: { text: "Opacité de l'information, greenwashing, manipulation des avis", ex: "Labels trompeurs, faux éco-responsable" },
    eco: { text: "Concentration du marché, disparition du commerce local", ex: "Amazon = 40% du e-commerce US" },
  },
  {
    id: 6, title: "Livraison au consommateur", color: "#db2777",
    env: { text: "Derniers km en véhicule thermique, livraisons multiples", ex: "30% d'échec 1ère livraison" },
    social: { text: "Pression sur les livreurs, accidents, précarité", ex: "Micro-entrepreneurs sans protection sociale" },
    eco: { text: "Coût des retours (30% en fashion), gaspillage logistique", ex: "Produits retournés souvent détruits" },
  },
  {
    id: 7, title: "Utilisation par le client", color: "#059669",
    env: { text: "Consommation d'énergie, eau, produits chimiques", ex: "Machine à laver, recharge smartphone" },
    social: { text: "Obsolescence programmée, frustration, surconsommation", ex: "Batteries non remplaçables, modes éphémères" },
    eco: { text: "Coût de possession vs coût d'achat", ex: "Réparation plus chère que le remplacement" },
  },
  {
    id: 8, title: "Fin de vie", color: "#dc2626",
    env: { text: "E-waste, pollution des sols, micro-plastiques", ex: "Agbogbloshie (Ghana), désert Atacama" },
    social: { text: "Recyclage informel dangereux, exposition aux toxiques", ex: "Tri des déchets par des enfants" },
    eco: { text: "Perte de valeur matière, coût du traitement", ex: "Seulement 20% des e-waste recyclés" },
  },
];

const systemicEffects = [
  { title: "Extraction → Santé", steps: ["Extraction minière", "Pollution des eaux", "Santé des communautés", "Coûts de santé"] },
  { title: "Extraction → Pauvreté", steps: ["Travail des enfants", "Déscolarisation", "Pauvreté structurelle", "Cycle perpétuel"] },
  { title: "Fabrication → Climat", steps: ["Émissions CO₂", "Changement climatique", "Événements extrêmes", "Migrations climatiques"] },
  { title: "Fin de vie → Alimentation", steps: ["Micro-plastiques", "Contamination océans", "Chaîne alimentaire", "Santé humaine"] },
];

/* ═══════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════ */

function CircleDiagram() {
  const cx = 380, cy = 380, R = 260;
  const vb = 760;
  const nodeW = 140, nodeH = 56, nodeR = 16;

  const positions = steps.map((s) => {
    const rad = (s.angle * Math.PI) / 180;
    return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) };
  });

  // Curved arrows along the circle between nodes
  const arrows: string[] = [];
  for (let i = 0; i < 8; i++) {
    const from = positions[i];
    const to = positions[(i + 1) % 8];
    // Shorten start/end to avoid overlapping with node rects
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
    // Control point: push outward from center
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const outAngle = Math.atan2(my - cy, mx - cx);
    const bulge = 30;
    const qx = mx + bulge * Math.cos(outAngle);
    const qy = my + bulge * Math.sin(outAngle);
    arrows.push(`M${x1.toFixed(1)},${y1.toFixed(1)} Q${qx.toFixed(1)},${qy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`);
  }

  return (
    <div className="w-full max-w-[720px] mx-auto aspect-square">
      <svg viewBox={`0 0 ${vb} ${vb}`} className="w-full h-full">
        <defs>
          <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
          </marker>
          <filter id="nodeShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="10 6" opacity="0.35" />

        {/* Arrow paths */}
        {arrows.map((d, i) => (
          <path key={`a${i}`} d={d} fill="none" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrowGreen)" opacity="0.5" />
        ))}

        {/* Center circle */}
        <circle cx={cx} cy={cy} r={68} fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
        <text x={cx} y={cy - 10} textAnchor="middle" fontWeight="800" fontSize="28" fill="#111827">&#9851;</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontWeight="700" fontSize="13" fill="#111827">Cycle de Vie</text>
        <text x={cx} y={cy + 26} textAnchor="middle" fontWeight="500" fontSize="10.5" fill="#4b5563">Economie circulaire</text>

        {/* Nodes */}
        {positions.map((pos, i) => {
          const s = steps[i];
          return (
            <g key={`n${i}`} filter="url(#nodeShadow)">
              <rect
                x={pos.x - nodeW / 2}
                y={pos.y - nodeH / 2}
                width={nodeW}
                height={nodeH}
                rx={nodeR}
                fill={s.color}
              />
              {/* Number badge */}
              <circle cx={pos.x - nodeW / 2 + 20} cy={pos.y} r={12} fill="rgba(255,255,255,0.2)" />
              <text
                x={pos.x - nodeW / 2 + 20}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontWeight="800"
                fontSize="12"
                fill="white"
              >
                {s.num}
              </text>
              {/* Label */}
              <text
                x={pos.x + 12}
                y={pos.y - 6}
                textAnchor="middle"
                dominantBaseline="auto"
                fontWeight="700"
                fontSize="12"
                fill="white"
              >
                {s.label}
              </text>
              {/* Subtitle */}
              <text
                x={pos.x + 12}
                y={pos.y + 10}
                textAnchor="middle"
                dominantBaseline="auto"
                fontWeight="400"
                fontSize="9.5"
                fill="rgba(255,255,255,0.92)"
              >
                {s.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function RamCard({ ram }: { ram: typeof ramifications[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm" style={{ background: ram.color }}>
          {ram.id}
        </div>
        <span className="flex-1 font-bold text-gray-900">{ram.title}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Leaf className="w-3.5 h-3.5 text-green-700" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-green-700">Environnemental</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ram.env.text}</p>
                <p className="text-xs text-gray-600 mt-2 italic">{ram.env.ex}</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Users className="w-3.5 h-3.5 text-blue-700" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-blue-700">Social</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ram.social.text}</p>
                <p className="text-xs text-gray-600 mt-2 italic">{ram.social.ex}</p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Coins className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-amber-700">Économique</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{ram.eco.text}</p>
                <p className="text-xs text-gray-600 mt-2 italic">{ram.eco.ex}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-950 text-white py-24 px-6 text-center">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-400/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-teal-400/5 blur-3xl" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Epitech — Social &amp; Environmental Impact
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Cycle de Vie
            <br />
            <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">&amp; Ramifications</span>
            <br />
            <span className="text-white/70">du E-commerce</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Analyse systémique de la chaîne d&apos;approvisionnement — impacts environnementaux, sociaux et économiques à chaque étape du cycle de vie d&apos;un produit.
          </p>
        </div>
      </section>

      {/* ── Problème / Solution ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-center mb-4 text-gray-950">Le Problème &amp; La Solution</h2>
          <p className="text-gray-500 text-center mb-12">Rendre visible l&apos;invisible de la supply chain</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-950">
                <Search className="w-5 h-5 text-gray-800" />
                Le problème
              </h3>
              <p className="text-gray-800 text-sm leading-relaxed mb-3">
                La chaîne d&apos;approvisionnement des produits e-commerce est largement opaque : origine des matières, lieux de fabrication, transport, conditions de travail… tout reste invisible pour le consommateur.
              </p>
              <p className="text-gray-800 text-sm leading-relaxed">
                Même les consommateurs soucieux de l&apos;environnement finissent par décider sur le prix et la livraison, faute d&apos;outils simples.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-gray-950">
                <Lightbulb className="w-5 h-5 text-gray-800" />
                La solution
              </h3>
              <p className="text-gray-800 text-sm leading-relaxed mb-3">
                Une <strong>extension navigateur</strong> qui analyse les fiches produits et affiche directement sur la page :
              </p>
              <ul className="space-y-2 text-sm text-gray-800">
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Estimation de l&apos;impact environnemental (empreinte carbone, labels)</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Indicateurs éthiques (pays de production, labels sociaux, controverses)</li>
                <li className="flex items-start gap-2"><ArrowRight className="w-4 h-4 text-green-600 mt-0.5 shrink-0" /> Recommandations d&apos;alternatives plus responsables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cycle de Vie (Cercle) ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-center mb-4 text-gray-950">Cycle de Vie du Produit</h2>
          <p className="text-gray-600 text-center mb-12">8 étapes circulaires — de l&apos;extraction à la fin de vie et retour matière</p>
          <CircleDiagram />
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold text-sm shadow-lg">
              <Recycle className="w-4 h-4" />
              Retour matière → Économie circulaire → Retour étape 1
            </div>
          </div>
        </div>
      </section>

      {/* ── Ramifications ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-center mb-4 text-gray-950">Ramifications par étape</h2>
          <p className="text-gray-600 text-center mb-12">Impact environnemental, social et économique — cliquez pour développer</p>
          <div className="space-y-4">
            {ramifications.map((ram) => (
              <RamCard key={ram.id} ram={ram} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Effets Systémiques ── */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-center mb-4">Effets Systémiques Croisés</h2>
          <p className="text-gray-300 text-center mb-12">Comment les impacts se propagent — approche system thinking</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemicEffects.map((effect, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <h4 className="text-green-400 font-bold text-sm mb-4">{effect.title}</h4>
                <div className="space-y-2.5">
                  {effect.steps.map((step, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-white/95">
                      {j > 0 && <span className="text-green-500 text-xs">↓</span>}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution Cards ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight text-center mb-4 text-gray-950">Notre Solution Rend Tout Visible</h2>
          <p className="text-gray-600 text-center mb-12">Ce que l&apos;extension affiche au consommateur au moment de l&apos;achat</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: BarChart3, title: "Score Environnemental", desc: "Empreinte carbone estimée sur tout le cycle de vie, présence de labels environnementaux, distance parcourue.", bg: "bg-green-100", iconColor: "text-green-700" },
              { icon: Handshake, title: "Indicateurs Éthiques", desc: "Pays de production, labels sociaux, controverses connues sur la marque, conditions de travail.", bg: "bg-blue-100", iconColor: "text-blue-700" },
              { icon: Zap, title: "Alternatives Responsables", desc: "Suggestions de produits similaires avec un meilleur score d'impact — pour consommer aligné avec ses valeurs.", bg: "bg-amber-100", iconColor: "text-amber-700" },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="rounded-2xl border border-gray-200 bg-white p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-600">Alexis Fayan — Epitech 2026 · Social &amp; Environmental Impact Assessment</p>
      </footer>
    </div>
  );
}
