export type GloveCut = "rollfinger" | "negativo" | "hibrido";

export type GloveConfig = {
  cut: GloveCut;
  text: string;
};

export const labCuts: Array<{
  id: GloveCut;
  name: string;
  description: string;
  image: string;
}> = [
  {
    id: "rollfinger",
    name: "Rollfinger",
    description: "Mas volumen, contacto total con el balon.",
    image: "/products/product-01.jpg",
  },
  {
    id: "negativo",
    name: "Negativo",
    description: "Ajuste fino, sensación de precisión.",
    image: "/products/product-03.jpg",
  },
  {
    id: "hibrido",
    name: "Hibrido",
    description: "Balance entre control y comodidad.",
    image: "/products/product-05.jpg",
  },
];
