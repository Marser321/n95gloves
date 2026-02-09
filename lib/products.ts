import type { ThemeName } from "@/lib/themes";

export type ProductMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductHighlight = {
  title: string;
  copy: string;
};

export type ProductMediaSlots = {
  hero: string;
  detail01: string;
  detail02: string;
  videoPoster?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  theme: ThemeName;
  price: number;
  tags: string[];
  variant: string;
  accent: string;
  image: string;
  mediaSlots: ProductMediaSlots;
  media: ProductMedia[];
  summary: string;
  tagline: string;
  positioning: string;
  idealFor: string;
  playStyle: string;
  surface: string;
  weather: string;
  benefits: string[];
  techHighlights: ProductHighlight[];
  render?: string;
  quickSpecs?: {
    cut: string;
    climate: string;
    weight: string;
    latex: string;
  };
  stats: { grip: number; durability: number };
  featureCopy: {
    dorsal: string;
    palm: string;
    wrist: string;
  };
  includes: string[];
  care: string[];
  faq: ProductFaq[];
};

const createMedia = (slots: ProductMediaSlots): ProductMedia[] => [
  { type: "image", src: slots.hero },
  { type: "image", src: slots.detail01 },
  { type: "image", src: slots.detail02 },
  { type: "video", src: "", poster: slots.videoPoster ?? slots.hero },
];

export const products: Product[] = [
  {
    id: "n95-pro-defender",
    slug: "n95-pro-defender",
    name: "N95 Pro Defender",
    theme: "emerald",
    price: 180,
    tags: ["Nuevo", "Flagship", "Corte Híbrido"],
    variant: "Emerald Command",
    accent: "#2BFF4F",
    image: "/products/generated/n95-pro-defender/hero.jpg",
    mediaSlots: {
      hero: "/products/generated/n95-pro-defender/hero.jpg",
      detail01: "/products/generated/n95-pro-defender/detail-01.jpg",
      detail02: "/products/generated/n95-pro-defender/detail-02.jpg",
      videoPoster: "/products/generated/n95-pro-defender/hero.jpg",
    },
    media: createMedia({
      hero: "/products/generated/n95-pro-defender/hero.jpg",
      detail01: "/products/generated/n95-pro-defender/detail-01.jpg",
      detail02: "/products/generated/n95-pro-defender/detail-02.jpg",
      videoPoster: "/products/generated/n95-pro-defender/hero.jpg",
    }),
    render: "/products/generated/n95-pro-defender/hero.jpg",
    summary:
      "Modelo insignia para arqueros que viven de la atajada difícil: grip brutal, cierre estable y lectura inmediata de balón.",
    tagline: "Agarre de élite para minutos decisivos.",
    positioning:
      "El Pro Defender es la referencia de la línea N95. Está pensado para competir, no para entrenar liviano.",
    idealFor: "Arqueros competitivos que buscan máxima seguridad en mano y salida firme en centros.",
    playStyle: "Dominante, agresivo y con prioridad en bloquear y capturar en tráfico.",
    surface: "Césped natural y sintético premium.",
    weather: "Seco, lluvia liviana y humedad variable.",
    benefits: [
      "Grip inmediato desde el primer uso, sin periodo largo de adaptación.",
      "Zona dorsal reforzada para despejes potentes en balones divididos.",
      "Muñequera de compresión estable para evitar micro-movimientos en impacto.",
    ],
    techHighlights: [
      {
        title: "Látex Supreme Contact 4mm",
        copy: "Compuesto de alto tack con respuesta consistente en césped húmedo y seco.",
      },
      {
        title: "Dorso Hybrid Impact Grid",
        copy: "Paneles estratégicos para absorber choque sin endurecer la mano.",
      },
      {
        title: "Cierre 360 Precision Strap",
        copy: "Ancla de velcro de baja densidad para ajuste firme sin exceso de volumen.",
      },
    ],
    quickSpecs: {
      cut: "Híbrido",
      climate: "Lluvia y calor",
      weight: "215g",
      latex: "Supreme Contact 4mm",
    },
    stats: { grip: 10, durability: 8.4 },
    featureCopy: {
      dorsal: "Neopreno ventilado con placas de impacto para despejes agresivos y controlados.",
      palm: "Látex alemán Supreme Contact 4mm con lectura de balón estable bajo presión.",
      wrist: "Muñequera elástica doble vuelta con tensión progresiva y salida limpia.",
    },
    includes: [
      "1 par N95 Pro Defender en funda protectora premium.",
      "Tarjeta de cuidado post-entreno y protocolo de pre-match.",
      "Acceso a soporte boutique para ajuste y uso recomendado.",
    ],
    care: [
      "Humedecer levemente la palma antes del partido para activar tack.",
      "Enjuagar con agua fría tras cada sesión y secar a la sombra.",
      "Guardar en funda ventilada para preservar elasticidad del látex.",
    ],
    faq: [
      {
        question: "¿Sirve para sintético abrasivo?",
        answer:
          "Sí, pero su fuerte es rendimiento competitivo. En abrasión extrema recomendamos rotarlo con un modelo más duradero.",
      },
      {
        question: "¿Qué talle elegir si me gusta ajuste ceñido?",
        answer:
          "Pedí tu talla habitual. Si preferís más espacio en dedos, subí media talla.",
      },
    ],
  },
  {
    id: "n95-stealth",
    slug: "n95-stealth",
    name: "N95 Stealth",
    theme: "obsidian",
    price: 165,
    tags: ["Híbrido", "Control"],
    variant: "Shadow Black",
    accent: "#E6E8EA",
    image: "/products/generated/n95-stealth/hero.jpg",
    mediaSlots: {
      hero: "/products/generated/n95-stealth/hero.jpg",
      detail01: "/products/generated/n95-stealth/detail-01.jpg",
      detail02: "/products/generated/n95-stealth/detail-02.jpg",
      videoPoster: "/products/generated/n95-stealth/hero.jpg",
    },
    media: createMedia({
      hero: "/products/generated/n95-stealth/hero.jpg",
      detail01: "/products/generated/n95-stealth/detail-01.jpg",
      detail02: "/products/generated/n95-stealth/detail-02.jpg",
      videoPoster: "/products/generated/n95-stealth/hero.jpg",
    }),
    render: "/products/generated/n95-stealth/hero.jpg",
    summary:
      "Perfil táctico para arqueros que priorizan lectura, timing y control limpio de rebote.",
    tagline: "Silencio visual, precisión total.",
    positioning:
      "Stealth es el guante para quien quiere sobriedad estética y sensación quirúrgica en cada recepción.",
    idealFor: "Arqueros de juego posicional que valoran salida ordenada y segunda acción rápida.",
    playStyle: "Técnico, sobrio, con enfoque en blocaje y distribución.",
    surface: "Natural, indoor y sintético de abrasión media.",
    weather: "Noche, clima mixto y entrenos prolongados.",
    benefits: [
      "Cierre speed-strap para muñeca libre sin perder seguridad.",
      "Control de rebote con capa memory foam de absorción.",
      "Estética minimal de bajo ruido visual para foco mental.",
    ],
    techHighlights: [
      {
        title: "Contact 4mm + Memory Layer",
        copy: "Combinación orientada a recepción limpia y reducción de rebote.",
      },
      {
        title: "Stealth Flex Dorsal",
        copy: "Malla respirable con inyección puntual para punch controlado.",
      },
      {
        title: "Speed Strap Entry",
        copy: "Cierre minimalista que mejora libertad de movimiento en salida.",
      },
    ],
    quickSpecs: {
      cut: "Híbrido",
      climate: "Noche / mixto",
      weight: "210g",
      latex: "Contact 4mm",
    },
    stats: { grip: 9.1, durability: 9.2 },
    featureCopy: {
      dorsal: "Malla transpirable con soporte de gel para estabilidad en despeje.",
      palm: "Látex Contact 4mm con capa memory para capturas más limpias.",
      wrist: "Cierre speed-strap minimalista con salida rápida.",
    },
    includes: [
      "1 par N95 Stealth en funda antipolvo.",
      "Guía de activación de palma para clima mixto.",
      "Soporte de talle con seguimiento post-compra.",
    ],
    care: [
      "Activar con micro-humedad previa para máxima adherencia.",
      "Secado horizontal a la sombra luego de uso intensivo.",
      "No exponer al sol directo ni a superficies rugosas sin rotación.",
    ],
    faq: [
      {
        question: "¿Es un guante más rígido o flexible?",
        answer:
          "Tiene flexibilidad alta en dedos y una muñeca libre; es ideal para quien necesita reaccionar rápido.",
      },
      {
        question: "¿Funciona bien para entrenar todos los días?",
        answer:
          "Sí, especialmente en superficie cuidada. Para sintético duro diario conviene alternar con un modelo de desgaste.",
      },
    ],
  },
  {
    id: "n95-crimson",
    slug: "n95-crimson",
    name: "N95 Crimson",
    theme: "crimson",
    price: 170,
    tags: ["Corte Negativo", "Ritmo Alto"],
    variant: "Crimson Flash",
    accent: "#FF4D57",
    image: "/products/generated/n95-crimson/hero.jpg",
    mediaSlots: {
      hero: "/products/generated/n95-crimson/hero.jpg",
      detail01: "/products/generated/n95-crimson/detail-01.jpg",
      detail02: "/products/generated/n95-crimson/detail-02.jpg",
      videoPoster: "/products/generated/n95-crimson/hero.jpg",
    },
    media: createMedia({
      hero: "/products/generated/n95-crimson/hero.jpg",
      detail01: "/products/generated/n95-crimson/detail-01.jpg",
      detail02: "/products/generated/n95-crimson/detail-02.jpg",
      videoPoster: "/products/generated/n95-crimson/hero.jpg",
    }),
    render: "/products/generated/n95-crimson/hero.jpg",
    summary:
      "Corte negativo de contacto directo para reflejos cortos y respuesta explosiva en jugadas de alta velocidad.",
    tagline: "Explosión de reflejo, control pegado a la mano.",
    positioning:
      "Crimson está pensado para arqueros intensos que atacan la jugada y quieren máxima conexión palma-balón.",
    idealFor: "Porteros de reacción corta, achique rápido y blocaje frontal.",
    playStyle: "Explosivo, frontal y con predominio de atajadas a corta distancia.",
    surface: "Natural húmedo y sintético técnico.",
    weather: "Humedad alta y lluvia moderada.",
    benefits: [
      "Corte negativo para sensación ceñida y lectura táctil inmediata.",
      "Compuesto Giga Grip optimizado para micro-humedad.",
      "Entrada sin costuras para transición rápida mano-guante.",
    ],
    techHighlights: [
      {
        title: "Giga Grip Red 4mm",
        copy: "Compuesto de tracción rápida para escenarios de reflejo inmediato.",
      },
      {
        title: "3D Knuckle Texture",
        copy: "Texturizado dorsal para desvíos más controlados en pelota viva.",
      },
      {
        title: "Seamless Compression Entry",
        copy: "Ingreso uniforme que reduce arrugas y mejora sensibilidad.",
      },
    ],
    quickSpecs: {
      cut: "Negativo",
      climate: "Húmedo / mixto",
      weight: "205g",
      latex: "Giga Grip 4mm",
    },
    stats: { grip: 9.6, durability: 8.5 },
    featureCopy: {
      dorsal: "Microfibra con texturizado 3D para despejes reactivos.",
      palm: "Látex Giga Grip 4mm calibrado para humedad y blocaje rápido.",
      wrist: "Entry compresivo sin costuras para ajuste continuo.",
    },
    includes: [
      "1 par N95 Crimson con bolsa protectora.",
      "Rutina de activación de agarre para clima húmedo.",
      "Acceso a asesoría de uso competitivo.",
    ],
    care: [
      "Activar con agua y retirar exceso antes de entrar al campo.",
      "Lavar manual con detergente neutro cada 3 a 4 usos.",
      "No almacenar húmedo para evitar degradación de tack.",
    ],
    faq: [
      {
        question: "¿El corte negativo aprieta más?",
        answer:
          "Sí, se siente más cercano a la mano. Si no te gustan ajustes ceñidos, subí medio talle.",
      },
      {
        question: "¿Rinde en lluvia fuerte?",
        answer:
          "Sí, especialmente con una activación correcta de palma y mantenimiento post-partido.",
      },
    ],
  },
  {
    id: "n95-wall",
    slug: "n95-wall",
    name: "N95 Wall",
    theme: "azure",
    price: 150,
    tags: ["Negativo", "Durabilidad"],
    variant: "Arctic Shield",
    accent: "#56B7FF",
    image: "/products/generated/n95-wall/hero.jpg",
    mediaSlots: {
      hero: "/products/generated/n95-wall/hero.jpg",
      detail01: "/products/generated/n95-wall/detail-01.jpg",
      detail02: "/products/generated/n95-wall/detail-02.jpg",
      videoPoster: "/products/generated/n95-wall/hero.jpg",
    },
    media: createMedia({
      hero: "/products/generated/n95-wall/hero.jpg",
      detail01: "/products/generated/n95-wall/detail-01.jpg",
      detail02: "/products/generated/n95-wall/detail-02.jpg",
      videoPoster: "/products/generated/n95-wall/hero.jpg",
    }),
    render: "/products/generated/n95-wall/hero.jpg",
    summary:
      "El más resistente del lineup: diseñado para sintético abrasivo, volumen alto de entreno y estabilidad constante.",
    tagline: "Durabilidad real para canchas exigentes.",
    positioning:
      "Wall prioriza vida útil sin sacrificar control básico de blocaje. Ideal para carga semanal alta.",
    idealFor: "Arqueros que entrenan diario y compiten en superficies duras.",
    playStyle: "Consistente, de volumen y foco en repetición técnica.",
    surface: "Sintético abrasivo y natural seco.",
    weather: "Frío, viento y sesiones largas.",
    benefits: [
      "Duragrip 4mm para extender vida útil en abrasión.",
      "Dorso con rubber grid para despeje seguro en clima frío.",
      "Peso estable que favorece control en repetición.",
    ],
    techHighlights: [
      {
        title: "Duragrip 4mm",
        copy: "Compuesto orientado a resistencia con tracción consistente.",
      },
      {
        title: "Thermal Grid Backhand",
        copy: "Trama dorsal con apoyo estructural para entreno de alto impacto.",
      },
      {
        title: "Pull-Tab Wrist Entry",
        copy: "Ingreso práctico para rutina diaria y cambios rápidos.",
      },
    ],
    quickSpecs: {
      cut: "Negativo",
      climate: "Frío / sintético abrasivo",
      weight: "225g",
      latex: "Duragrip 4mm",
    },
    stats: { grip: 8.6, durability: 9.6 },
    featureCopy: {
      dorsal: "Zona dorsal con rubber grid que estabiliza despejes en frío.",
      palm: "Duragrip 4mm para sesiones largas en superficies abrasivas.",
      wrist: "Pulsera de malla reforzada con tirador termoadherido.",
    },
    includes: [
      "1 par N95 Wall con funda de transporte.",
      "Checklist de mantenimiento para prolongar durabilidad.",
      "Soporte técnico de rotación y uso por superficie.",
    ],
    care: [
      "Limpiar partículas de caucho luego de cada sesión en sintético.",
      "Evitar fricción innecesaria al levantarte del piso.",
      "Alternar con segundo par en semanas de carga extrema.",
    ],
    faq: [
      {
        question: "¿Pierde mucho grip frente a modelos premium?",
        answer:
          "Mantiene agarre sólido, pero su ventaja principal es la durabilidad sobre superficies agresivas.",
      },
      {
        question: "¿Es pesado para competir?",
        answer:
          "Tiene más estructura, pero sigue siendo cómodo para partido. Está pensado para rendimiento sostenido.",
      },
    ],
  },
  {
    id: "n95-ignite",
    slug: "n95-ignite",
    name: "N95 Ignite",
    theme: "crimson",
    price: 175,
    tags: ["Híbrido", "Explosivo"],
    variant: "Signal Orange",
    accent: "#FF8A1F",
    image: "/products/generated/n95-ignite/hero.jpg",
    mediaSlots: {
      hero: "/products/generated/n95-ignite/hero.jpg",
      detail01: "/products/generated/n95-ignite/detail-01.jpg",
      detail02: "/products/generated/n95-ignite/detail-02.jpg",
      videoPoster: "/products/generated/n95-ignite/hero.jpg",
    },
    media: createMedia({
      hero: "/products/generated/n95-ignite/hero.jpg",
      detail01: "/products/generated/n95-ignite/detail-01.jpg",
      detail02: "/products/generated/n95-ignite/detail-02.jpg",
      videoPoster: "/products/generated/n95-ignite/hero.jpg",
    }),
    render: "/products/generated/n95-ignite/hero.jpg",
    summary:
      "Ligero y enérgico para arqueros reactivos: acelera la mano en blocajes rápidos sin perder punch controlado.",
    tagline: "Respuesta veloz con energía controlada.",
    positioning:
      "Ignite combina peso bajo y estructura inteligente para quien vive del primer reflejo.",
    idealFor: "Arqueros de reflejo, futsal e indoor técnico con ritmo alto.",
    playStyle: "Rápido, agresivo en primer paso y muy reactivo.",
    surface: "Indoor, sintético técnico y natural seco.",
    weather: "Calor y sesiones de alta intensidad.",
    benefits: [
      "Configuración ligera para acelerar reacción de mano.",
      "Canales flex en dorso para movilidad sin rigidez.",
      "Cierre asimétrico que distribuye tensión en muñeca.",
    ],
    techHighlights: [
      {
        title: "Quartz Grip 4mm",
        copy: "Agarre rápido para jugadas cortas y ritmo intenso.",
      },
      {
        title: "TPU Knuckle Shield",
        copy: "Protección dorsal con flex points para impacto controlado.",
      },
      {
        title: "Asymmetric Strap Control",
        copy: "Cierre que estabiliza sin endurecer la articulación.",
      },
    ],
    quickSpecs: {
      cut: "Híbrido",
      climate: "Calor / indoor",
      weight: "208g",
      latex: "Quartz 4mm",
    },
    stats: { grip: 9.4, durability: 8.2 },
    featureCopy: {
      dorsal: "Knuckleshield de TPU con canales flex para reacción rápida.",
      palm: "Quartz 4mm con capa anti-shock para disparos cortos.",
      wrist: "Cierre asimétrico para repartir tensión con comodidad.",
    },
    includes: [
      "1 par N95 Ignite + funda ventilada.",
      "Guía de uso para sesiones indoor y alta temperatura.",
      "Soporte boutique para ajuste de fit deportivo.",
    ],
    care: [
      "En calor fuerte, mantener palma hidratada de forma ligera.",
      "Secar completamente antes de guardar para preservar espuma.",
      "No dejar dentro del bolso cerrado luego de entreno.",
    ],
    faq: [
      {
        question: "¿Es recomendable para arquero de campo completo?",
        answer:
          "Sí, especialmente si priorizás velocidad de mano y reflejo. Para desgaste duro diario, combiná con Wall.",
      },
      {
        question: "¿Qué diferencia tiene frente a Pro Defender?",
        answer:
          "Ignite es más liviano y reactivo; Pro Defender entrega mayor estructura en balones divididos.",
      },
    ],
  },
  {
    id: "n95-aurora",
    slug: "n95-aurora",
    name: "N95 Aurora",
    theme: "ivory",
    price: 160,
    tags: ["Negativo", "Nocturno"],
    variant: "Ivory Pulse",
    accent: "#F4F7FF",
    image: "/products/generated/n95-aurora/hero.jpg",
    mediaSlots: {
      hero: "/products/generated/n95-aurora/hero.jpg",
      detail01: "/products/generated/n95-aurora/detail-01.jpg",
      detail02: "/products/generated/n95-aurora/detail-02.jpg",
      videoPoster: "/products/generated/n95-aurora/hero.jpg",
    },
    media: createMedia({
      hero: "/products/generated/n95-aurora/hero.jpg",
      detail01: "/products/generated/n95-aurora/detail-01.jpg",
      detail02: "/products/generated/n95-aurora/detail-02.jpg",
      videoPoster: "/products/generated/n95-aurora/hero.jpg",
    }),
    render: "/products/generated/n95-aurora/hero.jpg",
    summary:
      "Fit limpio para arquero técnico: excelente lectura nocturna y tacto estable en lluvia ligera.",
    tagline: "Precisión limpia para juego técnico.",
    positioning:
      "Aurora apunta a quien quiere tacto fino, estética luminosa y transición rápida en recepción.",
    idealFor: "Arqueros técnicos que cuidan timing, blocaje y salida en dos tiempos.",
    playStyle: "Fino, cerebral y de lectura.",
    surface: "Natural nocturno y sintético de mantenimiento medio.",
    weather: "Noche, humedad y lluvia suave.",
    benefits: [
      "Grip Aqua Contact orientado a humedad controlada.",
      "Fit ceñido sin exceso de compresión en muñeca.",
      "Detalles reflectivos para mayor lectura visual en baja luz.",
    ],
    techHighlights: [
      {
        title: "Aqua Contact 4mm",
        copy: "Látex calibrado para mantener tracción en humedad constante.",
      },
      {
        title: "Reflective Grip Lines",
        copy: "Detalles funcionales de visibilidad y guía de posición de mano.",
      },
      {
        title: "360 Low-Friction Closure",
        copy: "Cierre envolvente con fricción baja para puesta rápida.",
      },
    ],
    quickSpecs: {
      cut: "Negativo",
      climate: "Noche / lluvia",
      weight: "212g",
      latex: "Aqua Contact 4mm",
    },
    stats: { grip: 9, durability: 8.6 },
    featureCopy: {
      dorsal: "Textil elástico con líneas reflectivas para orientación visual.",
      palm: "Látex Aqua Contact 4mm para noches húmedas y blocaje fino.",
      wrist: "Cierre 360 con lengüeta de baja fricción.",
    },
    includes: [
      "1 par N95 Aurora en funda protectora.",
      "Protocolo de pre-activación para clima húmedo.",
      "Asesoría de talla para ajuste técnico ceñido.",
    ],
    care: [
      "Mantener palma ligeramente húmeda en condiciones nocturnas.",
      "Lavar con agua fría y secar lejos de fuentes de calor.",
      "Guardar sin presión sobre los dedos para conservar estructura.",
    ],
    faq: [
      {
        question: "¿Es demasiado ajustado para mano ancha?",
        answer:
          "Tiene fit técnico. Para mano ancha recomendamos subir medio talle.",
      },
      {
        question: "¿Rinde en partido nocturno con rocío?",
        answer:
          "Sí, fue diseñado para ese contexto. La clave es activarlo con micro-humedad antes del inicio.",
      },
    ],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
