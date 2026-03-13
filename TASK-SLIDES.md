# TASK: Refaire le site en format Slides/Présentation

## Objectif
Transformer la page actuelle (scroll long) en une **présentation par slides** plein écran. Le site sera projeté/présenté lors d'un rendu scolaire.

## Groupe
**Groupe 7** — Yoann, Alexis, Clément, Quentin
Cours : Social & Environmental Impact Assessment — Epitech 2026

## Contraintes techniques
- **Modifier UNIQUEMENT `src/app/page.tsx`** (tout est dans ce fichier)
- Stack : Next.js 16 + Tailwind CSS v4 + Framer Motion + Lucide React
- `"use client"` en haut du fichier
- **ATTENTION Tailwind v4** : pas de `group/name` syntax
- `npm run build` doit passer sans erreur
- Ne PAS ajouter de nouvelles dépendances (npm packages)
- Ne PAS utiliser `Home` comme nom d'export (conflit avec lucide `Home` icon) — utiliser `export default function Presentation()`
- Importer `Home as HomeIcon` de lucide-react

## Design des slides
- Chaque slide = plein écran (100vh), centré verticalement
- Navigation : flèches clavier (← →) + flèches visuelles en bas + indicateur de slide (dots)
- Transitions entre slides : animation Framer Motion (fade + léger slide)
- Design : fond blanc par défaut, certains slides avec fond dark ou gradient
- **Responsive** : doit bien rendre sur un écran de projection (16:9) ET sur mobile
- Police grande et lisible (c'est une présentation, pas un article)
- **Numéro de slide visible** en bas (ex: "3 / 15")

## Images (Unsplash)
Utiliser des images Unsplash en arrière-plan ou en illustration. Format URL : `https://images.unsplash.com/photo-XXXX?w=1200&q=80`

Images suggérées (chercher les bonnes URLs) :
- Mine/extraction : `https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80`
- Usine/fabrication : `https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&q=80`
- Emballage/cartons : `https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80`
- Transport/cargo : `https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1200&q=80`
- Data center : `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80`
- Livraison : `https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80`
- E-waste/déchets : `https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80`
- Forêt/nature : `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80`
- Océan/pollution : `https://images.unsplash.com/photo-1484291470158-b8f8d608850d?w=1200&q=80`
- Extension navigateur/tech : `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80`

Pour les images en background de slide, utiliser : `style={{ backgroundImage: 'url(...)' }}` avec `bg-cover bg-center` et un overlay sombre `bg-black/60` pour la lisibilité du texte.

## Structure des slides (ordre)

### Slide 1 — Titre
- Fond : gradient vert foncé (comme le hero actuel)
- Titre : "Évaluation d'Impact Social & Environnemental"
- Sous-titre : "Supply Chain E-commerce"
- Groupe 7 : Yoann, Alexis, Clément, Quentin
- Epitech 2026
- Image de fond subtile (forêt)

### Slide 2 — Le Problème
- Le problème de la supply chain opaque
- Stats clés en gros : "62M tonnes de e-waste/an", "91% du plastique non recyclé", "40 000 enfants dans les mines de cobalt"
- Image de fond (e-waste ou pollution)

### Slide 3 — Notre Projet
- Extension navigateur pour rendre visible l'invisible
- 3 fonctionnalités : Score Environnemental, Indicateurs Éthiques, Alternatives Responsables
- Design propre avec icônes

### Slide 4 — Cycle de Vie (le diagramme SVG circulaire)
- Le CircleDiagram existant centré en plein écran
- Titre au-dessus : "Cycle de Vie du Produit E-commerce"
- Garder le composant CircleDiagram tel quel (il marche bien)

### Slides 5-12 — Une slide par étape du cycle (8 slides)
Pour chaque étape :
- Numéro + Titre de l'étape en gros
- Image de fond pertinente (semi-transparente)
- 3 colonnes : Environnemental | Social | Économique (reprendre les données de `ramifications`)
- 2-3 KPIs clés (les plus impactants de `impactAssessment`) avec la valeur en gros

### Slide 13 — Effets Systémiques
- Les 4 chaînes causales (extraction→santé, etc.)
- Fond sombre
- Flèches visuelles entre les étapes

### Slide 14 — Indicateurs & Méthodologie
- Résumé de l'approche ESG + SMART
- Nombre total de KPIs quantifiés
- Sources principales citées
- Cadre méthodologique

### Slide 15 — Conclusion & Questions
- Messages clés (2-3 bullet points)
- "Merci — Questions ?"
- Noms du groupe
- Image de fond (nature/espoir)

## Données à conserver
TOUTES les données existantes dans le fichier doivent être conservées :
- `steps` array (8 étapes)
- `ramifications` array (8 items avec env/social/eco)
- `systemicEffects` array (4 effets)
- `impactAssessment` array (8 items avec tous les KPIs)
- `CircleDiagram` component (garder exactement tel quel)

## Navigation
```tsx
const [currentSlide, setCurrentSlide] = useState(0);

// Keyboard navigation
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") setCurrentSlide(prev => Math.max(prev - 1, 0));
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, []);
```

## Style des slides d'étapes (5-12)
Chaque slide d'étape devrait avoir :
- Le numéro de l'étape en très gros (style watermark) en arrière-plan
- Le titre de l'étape
- Image de fond avec overlay
- Grille 3 colonnes (Env/Social/Eco) avec les ramifications
- En dessous ou en overlay : 2-3 KPIs clés avec valeur en gros chiffre

## IMPORTANT
- Ne PAS laisser des composants/fonctions inutilisés (RamCard, ImpactStepCard peuvent être retirés ou adaptés)
- Le fichier final doit être propre, pas de code mort
- Bien tester que les animations de transition entre slides sont fluides
- Les images background doivent avoir `object-cover` pour bien couvrir
