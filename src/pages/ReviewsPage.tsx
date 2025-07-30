import { useEffect } from "react";

type PageProps = {
  content: string;
  title: string;
};

const ReviewsPage = ({ content }: PageProps) => {

  
   useEffect(() => {
    const initializeTrustIndex = () => {
      const trustIndexRoot = document.querySelector(".ti-widget");
      if (trustIndexRoot) {
        // Trustindex auto-initializes if the widget is present
        // Reload the script forcibly if needed
        if (window.Trustindex) {
          // Trustindex has loaded already — re-run it manually if needed
          // This depends on Trustindex exposing a reload method (some widgets do, some don't)
        }
      }
    };

    const existingScript = document.querySelector(
      'script[src^="https://cdn.trustindex.io/loader.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://cdn.trustindex.io/loader.js";
      script.async = true;
      script.onload = () => {
        // Trustindex widget should render automatically
        initializeTrustIndex();
      };
      document.body.appendChild(script);
    } else {
      // Script already loaded — try re-running manually
      setTimeout(() => {
        initializeTrustIndex();
      }, 500); // slight delay after content injection
    }
  }, [content]);

  return (
   <div className="container text-center flex items-center justify-center min-h-max md:p-10 p-4 gap-8">
      {/* <h1 className="text-5xl font-bold mb-6">{title}</h1> */}
      <div
        className="w-full md:px-0 text-xl flex flex-col items-center justify-center gap-4 font-[var(--font-light)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default ReviewsPage

