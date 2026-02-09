export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  tags: string[];
  variant: string;
  image: string;
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
    image: "/products/product-01.jpg",
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
    image: "/products/product-02.jpg",
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
    image: "/products/product-03.jpg",
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
    image: "/products/product-04.jpg",
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
    image: "/products/product-05.jpg",
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
    image: "/products/product-06.jpg",
    stats: { grip: 9, durability: 8.5 },
    featureCopy: {
      dorsal: "Textil elástico con grip-lines reflectivas.",
      palm: "Látex Aqua Contact 4mm para noches lluviosas.",
      wrist: "Cierre 360 con lengüeta de baja fricción.",
    },
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
