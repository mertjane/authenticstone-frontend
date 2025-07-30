import Hero from './Hero';
import { type Slide } from '../types/carousel.types';

export const carouselSlides: Slide[] = [
  {
    imageURL: "/images/marbleTiles.avif",
    subtitle: "marble inspiration",
    title: "Magic with marble",
    description:
      "Discover the magic of marble. At Authentic Stone, we turn raw materials into refined surfaces – celebrating texture, tone, timeless beauty in every tile. Bring your space to life with elegance only marble can provide.",
    link: "/collections/stone-collection/marble-tiles",
  },
  {
    imageURL: "/images/limestoneTiles.avif",
    subtitle: "limestone living",
    title: "Luxury with limestone",
    description:
      "Elevate your environment with the natural charm of limestone. Its warm tones and organic textures create serene spaces that balance modern design with timeless elegance. Discover the soft sophistication limestone brings to any setting.",
    link: "/collections/stone-collection/limestone-tiles",
  },
  {
    imageURL: "/images/chequerboardTiles.avif",
    subtitle: "style that Lasts",
    title: "Marble Chequerboard Tiles",
    description:
      "Elevate your interiors with the timeless elegance of chequerboard marble tiles — a bold yet classic design that never goes out of style. Perfectly balancing dark and light marble tones, this pattern evokes grand European halls and stately homes, now reimagined for contemporary living. Luxurious, striking, and enduring — this is tradition with an edge.",
    link: "/collections/design-pattern-collection/chequerboard-tiles",
  },
  {
    imageURL: "/images/herringboneTiles.avif",
    subtitle: "classic marble look",
    title: "Herringbone Perfection",
    description:
      "Order high-quality herringbone marble tiles for kitchens, bathrooms & beyond.",
    link: "/collections/design-pattern-collection/herringbone-tiles",
  },
];

interface CarouselProps {
  autoSlideInterval?: number;
}

const Carousel = ({ autoSlideInterval = 10000 }: CarouselProps) => {
  return (
    <Hero 
      slides={carouselSlides}
      autoSlideInterval={autoSlideInterval} 
    />
  );
};

export default Carousel; 