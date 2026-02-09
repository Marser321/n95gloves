export type ProductMedia = {
  type: "image" | "video";
  src: string;
  poster?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  tags: string[];
  variant: string;
  accent: string;
  image: string;
  media: ProductMedia[];
  summary: string;
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
};

export const products: Product[] = [
  {
    id: "n95-pro-defender",
    slug: "n95-pro-defender",
    name: "N95 Pro Defender",
    price: 180,
    tags: ["Nuevo", "Corte Híbrido"],
    variant: "Midnight Lime",
    accent: "#2BFF4F",
    image: "/products/product-01.jpg",
    media: [
      { type: "image", src: "/products/product-01.jpg" },
      { type: "image", src: "/lookbook/lookbook-05.jpg" },
      { type: "image", src: "/lookbook/lookbook-08.jpg" },
      { type: "video", src: "", poster: "/products/product-01.jpg" },
    ],
    render: "/products/product-01.jpg",
    summary:
      "El modelo insignia: grip absoluto, estructura dorsal agresiva y feel boutique para partidos de élite.",
    quickSpecs: {
      cut: "Híbrido",
      climate: "Lluvia y calor",
      weight: "215g",
      latex: "Supreme Contact 4mm",
    },
    stats: { grip: 10, durability: 8 },
    featureCopy: {
      dorsal: "Cuerpo de neopreno ventilado con placas de impacto para despejes agresivos.",
      palm: "Látex alemán de 4mm Supreme Contact, máxima adherencia en lluvia y calor.",
      wrist: "Muñequera elástica doble vuelta con ancla de velcro de baja densidad.",
    },
  },
  {
    id: "n95-stealth",
    slug: "n95-stealth",
    name: "N95 Stealth",
    price: 165,
    tags: ["Híbrido"],
    variant: "Shadow Black",
    accent: "#E6E8EA",
    image: "/products/product-02.jpg",
    media: [
      { type: "image", src: "/products/product-02.jpg" },
      { type: "image", src: "/lookbook/lookbook-06.jpg" },
      { type: "image", src: "/lookbook/lookbook-09.jpg" },
      { type: "video", src: "", poster: "/products/product-02.jpg" },
    ],
    render: "/products/product-02.jpg",
    summary:
      "Edición nocturna y silenciosa: control total en despejes, tacto limpio y cierre minimalista.",
    quickSpecs: {
      cut: "Híbrido",
      climate: "Noche / sintético",
      weight: "210g",
      latex: "Contact 4mm",
    },
    stats: { grip: 9, durability: 9 },
    featureCopy: {
      dorsal: "Malla transpirable con inyección de gel para punch controlado.",
      palm: "Látex Contact 4mm + capa memory foam para absorción.",
      wrist: "Cierre speed-strap minimalista para sentir la muñeca libre.",
    },
  },
  {
    id: "n95-crimson",
    slug: "n95-crimson",
    name: "N95 Crimson",
    price: 170,
    tags: ["Corte Negativo"],
    variant: "Crimson Flash",
    accent: "#FF3B3B",
    image: "/products/product-03.jpg",
    media: [
      { type: "image", src: "/products/product-03.jpg" },
      { type: "image", src: "/lookbook/lookbook-07.jpg" },
      { type: "image", src: "/lookbook/lookbook-10.jpg" },
      { type: "video", src: "", poster: "/products/product-03.jpg" },
    ],
    render: "/products/product-03.jpg",
    summary:
      "Corte negativo con respuesta rápida y sensación pegada a la mano. Ritmo alto, control alto.",
    quickSpecs: {
      cut: "Negativo",
      climate: "Húmedo / mixto",
      weight: "205g",
      latex: "Giga Grip 4mm",
    },
    stats: { grip: 9.5, durability: 8.5 },
    featureCopy: {
      dorsal: "Microfibra con texturizado 3D para desvíos con los nudillos.",
      palm: "Giga Grip rojo 4mm optimizado para humedad.",
      wrist: "Entry sin costuras con compresión uniforme.",
    },
  },
  {
    id: "n95-wall",
    slug: "n95-wall",
    name: "N95 Wall",
    price: 150,
    tags: ["Corte Negativo"],
    variant: "Arctic Fade",
    accent: "#7CC7FF",
    image: "/products/product-04.jpg",
    media: [
      { type: "image", src: "/products/product-04.jpg" },
      { type: "image", src: "/lookbook/lookbook-11.jpg" },
      { type: "image", src: "/lookbook/lookbook-12.jpg" },
      { type: "video", src: "", poster: "/products/product-04.jpg" },
    ],
    render: "/products/product-04.jpg",
    summary:
      "El más resistente para canchas duras. Duragrip estable y dorsal con protección térmica.",
    quickSpecs: {
      cut: "Negativo",
      climate: "Frío / sintético abrasivo",
      weight: "225g",
      latex: "Duragrip 4mm",
    },
    stats: { grip: 8.5, durability: 9.5 },
    featureCopy: {
      dorsal: "Zona dorsal con rubber grid para despejes en frío.",
      palm: "Duragrip 4mm para canchas sintéticas abrasivas.",
      wrist: "Pulsera de malla con tirador termoadherido.",
    },
  },
  {
    id: "n95-ignite",
    slug: "n95-ignite",
    name: "N95 Ignite",
    price: 175,
    tags: ["Nuevo", "Híbrido"],
    variant: "Signal Orange",
    accent: "#FF8A1F",
    image: "/products/product-05.jpg",
    media: [
      { type: "image", src: "/products/product-05.jpg" },
      { type: "image", src: "/lookbook/lookbook-13.jpg" },
      { type: "image", src: "/lookbook/lookbook-14.jpg" },
      { type: "video", src: "", poster: "/products/product-05.jpg" },
    ],
    render: "/products/product-05.jpg",
    summary:
      "Explosivo y ligero, pensado para reflejos rápidos. Sensación ágil con punch controlado.",
    quickSpecs: {
      cut: "Híbrido",
      climate: "Calor / indoor",
      weight: "208g",
      latex: "Quartz 4mm",
    },
    stats: { grip: 9.5, durability: 8 },
    featureCopy: {
      dorsal: "Knuckleshield de TPU con canales flex.",
      palm: "Quartz 4mm con capa anti-shock para balones rápidos.",
      wrist: "Cierre asimétrico para distribuir tensión.",
    },
  },
  {
    id: "n95-aurora",
    slug: "n95-aurora",
    name: "N95 Aurora",
    price: 160,
    tags: ["Corte Negativo"],
    variant: "Aurora Lime",
    accent: "#7CFF7A",
    image: "/products/product-06.jpg",
    media: [
      { type: "image", src: "/products/product-06.jpg" },
      { type: "image", src: "/lookbook/lookbook-15.jpg" },
      { type: "image", src: "/lookbook/lookbook-16.jpg" },
      { type: "video", src: "", poster: "/products/product-06.jpg" },
    ],
    render: "/products/product-06.jpg",
    summary:
      "Fit limpio y luminoso. Materiales elásticos con grip nocturno para porteros técnicos.",
    quickSpecs: {
      cut: "Negativo",
      climate: "Noche / lluvia",
      weight: "212g",
      latex: "Aqua Contact 4mm",
    },
    stats: { grip: 9, durability: 8.5 },
    featureCopy: {
      dorsal: "Textil elástico con grip-lines reflectivas.",
      palm: "Látex Aqua Contact 4mm para noches lluviosas.",
      wrist: "Cierre 360 con lengüeta de baja fricción.",
    },
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
