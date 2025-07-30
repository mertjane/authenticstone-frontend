import newArrivalImage from "/images/newArrivalImage.avif";
import marbleImage from "/images/marbleImage.avif";
import outdoorImage from "/images/outdoorImage.avif";
import classicImage from "/images/classicImage.avif";
import clearenceImage from "/images/clearenceImage.avif";
import { Link } from "react-router";
/* import { imageUrl } from "../constants/ImageMappings"; */

const GridpaneLarge = () => {
  return (
    <div className="md:h-max h-[450px] w-full grid px-0 py-6 md:px-10 md:py-10 select-none relative">
      <div className="h-max overflow-x-auto md:overflow-visible w-full md:h-full">
        <div className="flex overflow-x-scroll relative md:grid md:grid-cols-9 md:grid-rows-6 gap-4 w-full h-full">
          <div className="min-w-[70%] md:min-w-full order-[0] md:order-none md:col-span-3 md:row-span-4 relative cursor-pointer group">
            <img
              src={`${newArrivalImage}`}
              alt="New Arrivals"
              loading="lazy"
              decoding="async"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute h-full w-full top-0 flex flex-col gap-8 items-center justify-center">
              <h1 className="text-[#ffffff] text-4xl md:text-[3.2em]">
                New Arrivals
              </h1>
              <Link
                to="/new-arrivals"
                className="text-[#ffffff] text-sm md:text-[1em] font-thin tracking-widest uppercase underline underline-offset-[8px] decoration-[1px] decoration-white transition-colors duration-300 hover:decoration-orange-400"
              >
                shop now
              </Link>
            </div>
          </div>
          <div className="order-[-1] p-8 min-w-[70%] md:min-w-full md:col-span-3 md:row-span-2 md:col-start-1 md:row-start-5 bg-[#111111]">
            <p className="text-md font-thin md:text-[17px] uppercase text-[#ffffff] mb-4">
              looking to browse
            </p>
            <h2 className="text-[#ffffff] text-5xl md:text-[3em]">
              Explore our <br />
              <em>full collection</em>
            </h2>

            <Link
              to="/stone-collection/all-products"
              className="relative top-18 md:top-4 uppercase border-3 border-slate-100 px-4 py-2 text-xs md:text-[17px] md:px-12 md:py-4 text-[#ffffff] duration-300  hover:text-slate-950 hover:bg-[#ffffff] "
            >
              shop all tiles
            </Link>
          </div>
          <div className="min-w-[70%] md:min-w-full md:col-span-3 md:row-span-3 md:col-start-4 md:row-start-1 group overflow-hidden relative cursor-pointer">
            <img
              src={`${marbleImage}`}
              alt="Stone Mosaic Tiles"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute h-full w-full top-0 flex flex-col gap-8 items-center justify-center">
              <h1 className="text-[#ffffff] text-4xl md:text-[3.2em]">
                Stone Mosaic Tiles
              </h1>
              <Link
                to="/collections/stone-collection/stone-mosaic-tiles"
                className="text-[#ffffff] text-sm md:text-[1em] font-thin tracking-widest uppercase underline underline-offset-[8px] decoration-[1px] decoration-white transition-colors duration-300 hover:decoration-orange-400"
              >
                shop now
              </Link>
            </div>
          </div>
          <div className="min-w-[70%] md:min-w-full md:col-span-3 md:row-span-3 md:col-start-4 md:row-start-4 group overflow-hidden relative cursor-pointer">
            <img
              src={`${classicImage}`}
              alt="Stone Slabs"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute h-full w-full top-0 flex flex-col gap-8 items-center justify-center">
              <h1 className="text-[#ffffff] text-4xl md:text-[3.2em]">
                Stone Slabs
              </h1>
              <Link
                to="/collections/slabs"
                className="text-[#ffffff] text-sm md:text-[1em] font-thin tracking-widest uppercase underline underline-offset-[8px] decoration-[1px] decoration-white transition-colors duration-300 hover:decoration-orange-400"
              >
                shop now
              </Link>
            </div>
          </div>
          <div className="min-w-[70%] md:min-w-full md:col-span-3 md:row-span-3 md:col-start-7 md:row-start-1 group overflow-hidden relative cursor-pointer">
            <img
              src={`${outdoorImage}`}
              alt="Bathroom Tiles"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute h-full w-full top-0 flex flex-col gap-8 items-center justify-center">
              <h1 className="text-[#ffffff] text-4xl md:text-[3.2em]">
                Bathroom Tiles
              </h1>
              <Link
                to="/room-type-usage/bathroom"
                className="text-[#ffffff] text-sm md:text-[1em] font-thin tracking-widest uppercase underline underline-offset-[8px] decoration-[1px] decoration-white transition-colors duration-300 hover:decoration-orange-400"
              >
                shop now
              </Link>
            </div>
          </div>
          <div className="min-w-[70%] md:min-w-full md:col-span-3 md:row-span-3 md:col-start-7 md:row-start-4 group overflow-hidden relative cursor-pointer">
            <img
              src={`${clearenceImage}`}
              alt="Herringbone Tiles"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="absolute h-full w-full top-0 flex flex-col gap-8 items-center justify-center">
              <h1 className="text-[#ffffff] text-4xl md:text-[3.2em]">
                Herringbone Tiles
              </h1>
              <Link
                to="/collections/design-pattern-collection/herringbone-tiles"
                className="text-[#ffffff] text-sm md:text-[1em] font-thin tracking-widest uppercase underline underline-offset-[8px] decoration-[1px] decoration-white transition-colors duration-300 hover:decoration-orange-400"
              >
                shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridpaneLarge;
