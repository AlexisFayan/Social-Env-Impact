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
   IMPACT ASSESSMENT DATA
   ═══════════════════════════════════════ */

const impactAssessment = [
  {
    id: 1, step: "Extraction des matières premières", icon: Factory, color: "#b45309",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "Émissions CO₂", kpi: "kg CO₂e / tonne extraite", value: "~1 200 kg CO₂e", direction: "down" as const, detail: "Extraction de cobalt en RDC — objectif : réduire de 30% via énergies renouvelables sur site" },
          { name: "Consommation d'eau", kpi: "m³ / tonne extraite", value: "~50 m³", direction: "down" as const, detail: "Extraction de lithium au Chili — pompage intensif des nappes phréatiques du Salar d'Atacama" },
          { name: "Surface déforestée", kpi: "hectares / an", value: "~800 ha/an", direction: "down" as const, detail: "Mines d'or en Amazonie péruvienne — perte directe de biodiversité et puits de carbone" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Travail des enfants", kpi: "% de la main d'œuvre", value: "~15–20%", direction: "down" as const, detail: "Mines artisanales de cobalt en RDC — 40 000 enfants estimés (UNICEF)" },
          { name: "Accidents du travail", kpi: "incidents / 1 000 travailleurs / an", value: "~25", direction: "down" as const, detail: "Effondrements, exposition aux poussières toxiques, absence d'EPI" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Volatilité des prix", kpi: "variation annuelle (%)", value: "±35%", direction: "down" as const, detail: "Cours du cobalt : 80 000$/t en 2018, 26 000$/t en 2023 — instabilité de la supply chain" },
          { name: "Revenus locaux", kpi: "$/jour/travailleur artisanal", value: "~2–3 $", direction: "up" as const, detail: "Bien en dessous du seuil de pauvreté — aucune redistribution de la valeur ajoutée" },
        ]},
    ]
  },
  {
    id: 2, step: "Transformation & Fabrication", icon: Factory, color: "#c2410c",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "Émissions CO₂ usine", kpi: "tonnes CO₂e / usine / an", value: "~15 000 t", direction: "down" as const, detail: "Usine textile moyenne au Bangladesh — charbon comme énergie primaire" },
          { name: "Pollution des eaux", kpi: "litres d'eau polluée / kg textile", value: "~200 L", direction: "down" as const, detail: "Teintures chimiques rejetées sans traitement — rivières Buriganga, Citarum" },
          { name: "Consommation énergétique", kpi: "kWh / unité produite", value: "~75 kWh", direction: "down" as const, detail: "Fabrication d'un smartphone — objectif : 50% d'énergie renouvelable d'ici 2030" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Salaire horaire", kpi: "$/heure vs seuil de vie décente", value: "0.32 $/h", direction: "up" as const, detail: "Ouvrières textiles au Bangladesh — seuil de vie décente estimé à 0.75$/h (Clean Clothes Campaign)" },
          { name: "Heures supplémentaires", kpi: "heures / semaine au-delà du légal", value: "+20–30h", direction: "down" as const, detail: "Pics saisonniers : semaines de 70–80h, violations systématiques du code du travail" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Part travail dans prix final", kpi: "% du prix de vente retail", value: "~2–4%", direction: "up" as const, detail: "T-shirt vendu 29€ → 0.60€ pour l'ouvrier. La marge reste chez la marque et le distributeur" },
        ]},
    ]
  },
  {
    id: 3, step: "Emballage & Packaging", icon: Package, color: "#0d9488",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "Plastique à usage unique", kpi: "kg plastique / 1 000 colis", value: "~120 kg", direction: "down" as const, detail: "Films plastique, polystyrène, coussins d'air — 91% non recyclé (National Geographic)" },
          { name: "Taux de suremballage", kpi: "% volume vide dans le colis", value: "~40%", direction: "down" as const, detail: "Cartons surdimensionnés Amazon : optimisation algorithmique insuffisante" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Perception consommateur", kpi: "% consommateurs frustrés par le suremballage", value: "~72%", direction: "down" as const, detail: "Enquête Ipsos 2023 — le suremballage est le 2e irritant après le prix de livraison" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Coût emballage / colis", kpi: "€ / colis moyen", value: "~1.20 €", direction: "down" as const, detail: "Dont 0.30€ de taxe REP (Responsabilité Élargie du Producteur) en France" },
          { name: "Taxe éco-contribution", kpi: "€ / tonne d'emballage mise sur le marché", value: "~380 €/t", direction: "up" as const, detail: "Barème CITEO 2024 — incitation financière au réemploi et éco-conception" },
        ]},
    ]
  },
  {
    id: 4, step: "Transport & Logistique", icon: Truck, color: "#2563eb",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "Émissions CO₂ transport", kpi: "g CO₂e / tonne-km", value: "Cargo: 10g, Avion: 600g", direction: "down" as const, detail: "Un iPhone Chine→France par avion ≈ 6 kg CO₂e. Par cargo ≈ 0.1 kg CO₂e" },
          { name: "Pollution maritime (SOx)", kpi: "kg SOx / voyage transocéanique", value: "~5 000 kg", direction: "down" as const, detail: "15 plus gros porte-conteneurs = autant de SOx que 760 millions de voitures" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Conditions des marins", kpi: "mois en mer sans escale", value: "6–9 mois", direction: "down" as const, detail: "COVID a bloqué 400 000 marins en mer au-delà de leur contrat (ITF)" },
          { name: "Accidents routiers livreurs", kpi: "accidents / million km", value: "~4.5", direction: "down" as const, detail: "Pression temporelle, véhicules surchargés, fatigue — 2× la moyenne nationale" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Coût externalités CO₂", kpi: "€ / tonne CO₂ (non facturé)", value: "~100 €/t", direction: "up" as const, detail: "Coût social du carbone non internalisé — la livraison 'gratuite' a un prix caché" },
        ]},
    ]
  },
  {
    id: 5, step: "Distribution & Vente en ligne", icon: ShoppingCart, color: "#7c3aed",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "Énergie data centers", kpi: "kWh / transaction e-commerce", value: "~0.5 kWh", direction: "down" as const, detail: "Recherche produit + paiement + stockage photos — data centers = 1% électricité mondiale" },
          { name: "PUE (Power Usage Effectiveness)", kpi: "ratio énergie totale / IT utile", value: "~1.58", direction: "down" as const, detail: "Moyenne mondiale. Les meilleurs (Google) atteignent 1.10. Objectif : < 1.3" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Greenwashing détecté", kpi: "% de claims environnementaux non vérifiables", value: "~53%", direction: "down" as const, detail: "Étude Commission Européenne 2021 — plus de la moitié des allégations vertes sont vagues ou infondées" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Concentration du marché", kpi: "part de marché top 5 plateformes", value: "~65%", direction: "down" as const, detail: "Amazon, Alibaba, JD.com, Shopee, eBay — disparition progressive du commerce indépendant" },
          { name: "Fermetures commerces locaux", kpi: "nombre / an en France", value: "~11 000", direction: "down" as const, detail: "Taux de vacance commerciale en centre-ville : 12.5% en 2023 (Procos)" },
        ]},
    ]
  },
  {
    id: 6, step: "Livraison au consommateur", icon: Truck, color: "#db2777",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "CO₂ dernier kilomètre", kpi: "g CO₂e / colis livré", value: "~1 050g", direction: "down" as const, detail: "Véhicule thermique en zone urbaine — 30% des tentatives échouent → relivraison" },
          { name: "Taux d'échec 1ère livraison", kpi: "% de colis non remis", value: "~12–18%", direction: "down" as const, detail: "Chaque échec = un nouveau trajet. Coût CO₂ doublé pour ces colis" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Statut des livreurs", kpi: "% auto-entrepreneurs (sans protection)", value: "~85%", direction: "down" as const, detail: "Pas de congés payés, pas de couverture accident, pas de chômage" },
          { name: "Colis par jour par livreur", kpi: "nombre moyen", value: "~180", direction: "down" as const, detail: "Objectif imposé quasi-impossible à tenir en 8h → stress, infractions routières" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Taux de retour e-commerce", kpi: "% des commandes retournées", value: "~30%", direction: "down" as const, detail: "Mode : jusqu'à 50%. Coût moyen d'un retour : 15€. Produits souvent détruits" },
        ]},
    ]
  },
  {
    id: 7, step: "Utilisation par le client", icon: HomeIcon, color: "#059669",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "Durée de vie moyenne", kpi: "années avant remplacement", value: "~2.5 ans", direction: "up" as const, detail: "Smartphone : 2.5 ans. Fast fashion : 3–4 utilisations. Électroménager : 8–11 ans" },
          { name: "Énergie phase d'usage", kpi: "kWh / an / appareil", value: "~15 kWh", direction: "down" as const, detail: "Smartphone : 15 kWh/an. Sèche-linge : 350 kWh/an. TV : 150 kWh/an" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Indice de réparabilité", kpi: "score /10 moyen", value: "6.2 /10", direction: "up" as const, detail: "Obligation française depuis 2021 — pousse les fabricants à améliorer la conception" },
          { name: "Taux de réparation", kpi: "% de pannes réparées vs remplacées", value: "~40%", direction: "up" as const, detail: "Objectif loi AGEC : 60% d'ici 2026. Bonus réparation textile lancé fin 2023" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Coût de réparation vs remplacement", kpi: "ratio réparation / prix neuf", value: "~67%", direction: "down" as const, detail: "Au-delà de 50%, le consommateur préfère racheter neuf — cercle vicieux de l'obsolescence" },
        ]},
    ]
  },
  {
    id: 8, step: "Fin de vie", icon: Trash2, color: "#dc2626",
    impacts: [
      { type: "Environnemental", icon: Leaf, iconColor: "text-green-600",
        indicators: [
          { name: "E-waste généré", kpi: "kg / habitant / an (France)", value: "~21 kg", direction: "down" as const, detail: "France : 1.4M tonnes/an de DEEE. Monde : 62M tonnes en 2022 (+82% en 12 ans)" },
          { name: "Taux de recyclage effectif", kpi: "% des déchets électroniques collectés et recyclés", value: "~20%", direction: "up" as const, detail: "80% non tracé : décharge, export illégal (Ghana, Inde), incinération" },
          { name: "Micro-plastiques dispersés", kpi: "tonnes / an dans les océans (textile)", value: "~500 000 t", direction: "down" as const, detail: "Chaque lavage libère 700 000 microfibres — 35% de la pollution plastique marine" },
        ]},
      { type: "Social", icon: Users, iconColor: "text-blue-600",
        indicators: [
          { name: "Travailleurs informels du recyclage", kpi: "nombre mondial estimé", value: "~20M", direction: "down" as const, detail: "Agbogbloshie (Ghana), Guiyu (Chine) — exposition au plomb, mercure, cadmium" },
          { name: "Espérance de vie trieurs informels", kpi: "années vs population générale", value: "-15 ans", direction: "up" as const, detail: "Cancers, maladies respiratoires, neurologiques — sans accès aux soins" },
        ]},
      { type: "Économique", icon: Coins, iconColor: "text-amber-600",
        indicators: [
          { name: "Valeur matière perdue", kpi: "€ / tonne de DEEE non recyclé", value: "~3 500 €", direction: "up" as const, detail: "Or, argent, palladium, cuivre — 1 tonne de smartphones contient plus d'or qu'1 tonne de minerai" },
          { name: "Coût du traitement déchets", kpi: "€ / tonne (France, filière officielle)", value: "~450 €/t", direction: "down" as const, detail: "Financé par l'éco-participation sur les produits neufs — souvent insuffisant" },
        ]},
    ]
  },
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

function ImpactStepCard({ step }: { step: typeof impactAssessment[0] }) {
  const [open, setOpen] = useState(false);
  const StepIcon = step.icon;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: step.color }}>
          <StepIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">ÉTAPE {step.id}</span>
          </div>
          <span className="font-bold text-gray-900 text-base">{step.step}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:block">{step.impacts.reduce((sum, imp) => sum + imp.indicators.length, 0)} KPIs</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
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
            <div className="px-5 pb-5 space-y-4">
              {step.impacts.map((impact) => {
                const ImpIcon = impact.icon;
                return (
                  <div key={impact.type}>
                    <div className="flex items-center gap-2 mb-3">
                      <ImpIcon className={`w-4 h-4 ${impact.iconColor}`} />
                      <span className="text-sm font-bold text-gray-800">{impact.type}</span>
                    </div>
                    <div className="space-y-2">
                      {impact.indicators.map((ind, j) => (
                        <div key={j} className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-sm text-gray-900">{ind.name}</span>
                                <span className="inline-flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                                  <Gauge className="w-3 h-3" />
                                  {ind.kpi}
                                </span>
                              </div>
                            </div>
                            <div className={`shrink-0 flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-lg ${
                              ind.direction === "down" 
                                ? "bg-red-50 text-red-700" 
                                : "bg-emerald-50 text-emerald-700"
                            }`}>
                              {ind.direction === "down" ? (
                                <TrendingDown className="w-3.5 h-3.5" />
                              ) : (
                                <TrendingUp className="w-3.5 h-3.5" />
                              )}
                              {ind.value}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed mt-1">{ind.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
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

      {/* ── Évaluation d'Impact — KPIs ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-700 mb-6">
              <Target className="w-4 h-4" />
              Évaluation d&apos;Impact — Indicateurs ESG
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-gray-950">Indicateurs &amp; Quantification</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pour chaque étape du cycle de vie, nous définissons des <strong>KPIs mesurables</strong> (environnementaux, sociaux, économiques) avec des valeurs quantifiées basées sur des données réelles.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-10 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 px-2 py-1 rounded bg-red-50 text-red-700 font-medium">
                <TrendingDown className="w-3 h-3" /> Valeur
              </div>
              <span>= impact négatif, à réduire</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 font-medium">
                <TrendingUp className="w-3 h-3" /> Valeur
              </div>
              <span>= indicateur à améliorer / augmenter</span>
            </div>
          </div>

          <div className="space-y-4">
            {impactAssessment.map((step) => (
              <ImpactStepCard key={step.id} step={step} />
            ))}
          </div>

          {/* Methodology note */}
          <div className="mt-10 rounded-2xl border border-green-200 bg-green-50/50 p-6">
            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Méthodologie
            </h3>
            <p className="text-sm text-green-700 leading-relaxed">
              Les indicateurs suivent le cadre <strong>ESG</strong> (Environmental, Social, Governance) et les principes <strong>SMART</strong> (Specific, Measurable, Actionable, Relevant, Time-bound). Les données proviennent de sources institutionnelles : ADEME, UNICEF, Commission Européenne, Global E-waste Monitor, Clean Clothes Campaign, National Geographic, Procos. Chaque KPI est rattaché à une étape spécifique du cycle de vie e-commerce et quantifié avec des ordres de grandeur réalistes.
            </p>
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
