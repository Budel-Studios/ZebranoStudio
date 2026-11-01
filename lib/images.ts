/**
 * Mood images from Robbert's Lovable design (november 2026). AI-generated in
 * his Lovable project — interiors and details that show the style, not
 * finished Zebrano projects. See docs/beelden.md.
 */
export type Img = { src: string; alt: string };

export const IMAGES = {
  heroTaats: { src: "/images/hero-taatsdeur.jpg", alt: "Taatsdeur van notenhout in een lichte hal" },
  doorTaats: { src: "/images/door-taats.jpg", alt: "Detail van een lange greep op een deur van notenhout" },
  doorSchuif: { src: "/images/door-schuif.jpg", alt: "Eikenhouten schuifdeur aan een rail in een woonkamer" },
  doorDraai: { src: "/images/door-draai.jpg", alt: "Dubbele houten draaideuren die openstaan naar een zitkamer" },
  doorWandvlak: { src: "/images/door-wandvlak.jpg", alt: "Wandvlakke deur, strak opgenomen in een lichte wand" },
  doorRoomdivider: {
    src: "/images/door-roomdivider.jpg",
    alt: "Roomdivider van glas met zwarte profielen tussen keuken en eetplek",
  },
  colGlas: { src: "/images/col-glas.jpg", alt: "Glazen taatsdeur met structuurglas in een lichte hal" },
  colFineer: { src: "/images/col-fineer.jpg", alt: "Vellen houtfineer in noten en zebrano" },
  col3d: { src: "/images/col-3d.jpg", alt: "Houten deur met verticale ribbels in reliëf" },
  colAtelier: { src: "/images/col-atelier.jpg", alt: "Vakman schuurt een deur van notenhout" },
} satisfies Record<string, Img>;
