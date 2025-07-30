import { useEffect } from "react";

type PageProps = {
  content: string;
  title: string;
};

const ContactPage = ({ content}: PageProps) => {
  useEffect(() => {
    const loadGoogleMaps = () => {
      const existingScript = document.getElementById("googleMaps");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src =
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAAk6maQP5wA410ycUnWJZ0OvDIhWdjerI";
        script.id = "googleMaps";
        script.async = true;
        script.defer = true;

        // run initMap after script loads
        script.onload = () => {
          initMap();
        };

        document.body.appendChild(script);
      } else {
        // Script already present, ensure google is ready
        if (window.google && window.google.maps) {
          initMap();
        } else {
          // Retry a bit later if google isn't ready yet
          const interval = setInterval(() => {
            if (window.google && window.google.maps) {
              clearInterval(interval);
              initMap();
            }
          }, 100);
        }
      }
    };

    const initMap = () => {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) return;

      const location = { lat: 50.7975764, lng: 0.0523944 };
      const map = new window.google.maps.Map(mapContainer, {
        zoom: 14,
        center: location,
      });

      new window.google.maps.Marker({
        position: location,
        map: map,
      });
    };

    loadGoogleMaps();
  }, []);
  return (
    <div className="container text-center flex items-center justify-center min-h-max md:p-10 p-4 gap-8">
      {/* <h1 className="text-5xl font-bold mb-6">{title}</h1> */}
      <div
        className="contact-wrapper w-full md:px-0 text-xl flex flex-col items-center justify-center gap-4 font-[var(--font-light)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ContactPage;
