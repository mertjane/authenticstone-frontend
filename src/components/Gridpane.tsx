
import { Link } from "react-router";
import homeVideo from "../assets/home-video.mp4";
import sampleImage from "../assets/images/4250572.jpg";
/* import { imageUrl, videoUrl } from "../constants/ImageMappings"; */

const Gridpane = () => {
  return (
    <div className="w-full h-auto md:h-screen grid px-4 py-10 md:px-10 md:py-20 grid-cols-6 grid-rows-6 gap-4">
      <div className="col-span-6 row-span-3 md:col-span-3 md:row-span-6 border-5 border-slate-950 p-8 md:p-10 ">
        <span className="flex font-bold">
          <h1 className="text-5xl md:text-[4.5em]">Pure</h1>
          <h1 className="text-5xl md:text-[4.5em] pl-3 italic">Stone</h1>
        </span>
        <span className="flex font-bold ml-4">
          <h1 className="text-5xl md:text-[4.5em]">Pure</h1>
          <h1 className="text-5xl md:text-[4.5em] pl-3 italic">Elegance</h1>
        </span>
        <p className="mt-6 md:mt-8 text-sm font-thin md:text-lg">
          Discover our pure natural stone tiles and bespoke pieces quarried and
          manufactured in ten different countries. Each piece tells a story of
          nature's artistry, with identical slabs of blocks in consistent
          batches imported directly to our UK stock.
        </p>
        <Link
          to='/colour/whites'
          className="uppercase relative text-xl font-[var(--font-light)] top-4 md:top-18 underline underline-offset-[10px] decoration-[1px] hover:decoration-[#666666]"
        >
          shop now
        </Link>
      </div>
      <div className="col-span-6 row-span-3 md:col-span-3 md:row-span-3 md:col-start-4 ">
        <video
          src={homeVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="hidden md:flex md:col-span-3 md:row-span-3 md:col-start-4 md:row-start-4 ">
        <img
          loading="lazy"
          src={sampleImage}
          alt="Travertine"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Gridpane;
