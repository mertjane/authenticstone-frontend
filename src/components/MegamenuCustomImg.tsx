import { motion, type Variants} from "framer-motion";

const MegamenuCustomImg = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  return (
    <motion.div
      className="flex gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="h-[415px] w-[350px] mb-22" variants={itemVariants}>
        <div className="h-full w-full overflow-hidden group cursor-pointer">
          <img
            className="object-cover h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            src="/images/megamenu1.jpeg"
            alt="Custom Stonework"
          />
        </div>
        {/* hidden */}
        <div className="text-center py-2">
          <p className="text-2xl font-[var(--font-regular)] text-amber-800 transition-colors duration-300">
            Natural Stone Features
          </p>
          <p className="font-[var(--font-light)] leading-tight pt-1.5">
            Transform your property with premium natural stone walls, patios,
            and walkways
          </p>
        </div>
      </motion.div>
      <motion.div className="h-[415px] w-[350px]" variants={itemVariants}>
        <div className="h-full w-full overflow-hidden group cursor-pointer">
          <img
            className="object-cover h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            src="/images/megamenu2.jpeg"
            alt="Custom Stonework"
          />
        </div>
        {/* hidden */}
        <div className="text-center py-2">
          <p className="text-2xl font-[var(--font-regular)] text-amber-800 transition-colors duration-300">
            Custom Kitchen Surfaces
          </p>
          <p className="font-[var(--font-light)] leading-tight pt-1.5">
            Premium granite, marble & quartz countertops fabricated to
            perfection
          </p>
        </div>
      </motion.div>
      <motion.div className="h-[415px] w-[350px]" variants={itemVariants}>
        <div className="h-full w-full overflow-hidden group cursor-pointer">
          <img
            className="object-cover h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-110"
            src="/images/megamenu3.jpeg"
            alt="Custom Stonework"
          />
        </div>
        {/* hidden */}
        <div className="text-center py-2">
          <p className="text-2xl font-[var(--font-regular)] text-amber-800 transition-colors duration-300">
            Outdoor Living Spaces
          </p>
          <p className="font-[var(--font-light)] leading-tight pt-1.5">
            Create stunning outdoor environments with custom stone fire pits and
            features
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MegamenuCustomImg;
