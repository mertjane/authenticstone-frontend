import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const FAQ_DATA = [
  {
    title: "Product Variation?",
    description:
      "We always advise you to see as much of your product of choice as possible before purchasing any. If it inapt possible for you to visit our showroom to give a look at our products, then we would be glad to send swatch samples or images to you. However, it is important to note that samples and images are to guide only and unfortunately are not able display all possible tonal and texture variations.",
  },
  {
    title: "Stock availability & payment?",
    description:
      "Please make sure that all measurements are double checked before you place your order. We would advise you to include an extra10% to enable for any cutting, minor imperfections, breakage and natural discrepancies. If you would like to return of excess material including any ancillary products, unfortunately we cannot accept.",
  },
  {
    title: "When will my delivery take place?",
    description:
      "Standard deliveries take place any time between 9.00 am and 5.30 pm. Please be advised that unfortunately it is not possible for us to provide an ETA on standard deliveries, even on the morning of your transfer. Should you require a more accurate timescale, then morning (9.00am – 1.00pm) and afternoon (12.00pm – 5.30pm) or timed deliveries can be an option for a small extra charge.\n\nPlease advise us if a timed delivery is needed when you are making your order so we can make arrangement accordingly.",
  },
  {
    title: "How will my transfer take place?",
    description:
      "Transfers of your products are generally made (kerbside to the nearest accessible point) using a vehicle for large heavy goods with a mechanical tail-lift and pallet truck. Please keep us noted in dvance of any possible access concerns such as steep gradients, gravel driveways, overhanging trees and so on. In this case, we would aspire to use one of our own fleet of vehicles to deliver your dispatch that have been specially adapted to overcome these types of possible access restrictions.\n\nHowever it should be noted that these are often in high demand so it may take longer time for delivery on our own specialised vehicles. Someone needs to be available to accept, sign for and safely store the products as it is needed. Unfortunately, the driver cannot unpack your products and move them from the place of delivery. Orders will be shrink wrapped for protection, but please try to move the materials undercover as soon as possible and ensure all ancillary products are stored to avoid damage by frost or rain.\n\nIt is important that you fill us in with the correct contact number if we need to call you before the delivery. If a delivery fails because of incomplete or incorrect information being supplied, or if we are unable to contact you, then additional charges may be required. Neither party wishes this to be the case, so your hep on this issue would be appreciated.",
  },
  {
    title: "What should I do in the case of my order arrives damaged?",
    description:
      "The general condition of your order should be inspected and any obvious damage should be noted. Please make sure that the outer packaging is opened carefully so that inspection of the material can be successfully made. Please do not sign as “unchecked” as this may invalidate any future claims. Please let us know about any concerns as soon as possible and in your relevant timescale, (see Terms and Conditions). With the greater part of orders, we will equip extra materials over and above quantities that you purchased  details of this are stated on your paperwork.\n\nMinor edge chipping and slight imperfections are normal and often tiles that are slightly damaged can be used in cuts. We recommend you to order a 10% allowance above and beyond your actual requirements to make space for potential cuts and wastage.",
  },
  {
    title: "How should I unpack my dispatch?",
    description:
      "The shrink-wrap should be cut and open very carefully making sure that you do not cause any damage of the packaged products and all ancillary items need to be stored in dry conditions & should not be allowed to freeze. Any aiding wooden braces need to be gently levered apart and banding needs to only be cut when the products are fully supported to avoid unnecessary breakage.\n\nTiles should always be stacked and stored vertically (on edge) but definitely not on a surface that hard because it may cause edge chipping. Any present securing and protective film or spacers need to be kept between the faces of the tiles. This will help to prevent any possible scratching when you move your products. Stone tiles are generally packed when they are wet and do not dry out till they are unpacked. For this reason, it is possible for some of your stone is to appear darker in shade until it dries completely.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container text-center flex flex-col items-center justify-start min-h-max md:p-20 py-10 px-5 gap-8">
      <h1 className="text-5xl mb-6">Frequently Asked Questions</h1>
      {FAQ_DATA.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border-b border-[#e5e5e5] flex flex-col items-start md:max-w-3/4 w-full"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between text-left text-2xl font-[var(--font-regular)]"
            >
              <h3 className="md:text-3xl text-2xl mb-3">{item.title}</h3>
              {isOpen ? (
                <GoChevronUp className="text-2xl text-gray-600" />
              ) : (
                <GoChevronDown className="text-2xl text-gray-600" />
              )}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[1000px] mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="whitespace-pre-line text-start mb-4 md:text-xl text-lg font-[var(--font-light)]">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
