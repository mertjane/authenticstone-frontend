type PageProps = {
  content: string;
  title: string;
};

const AboutUs = ({ content}: PageProps) => {
  return (
    <div className="container text-center flex flex-col items-center justify-start min-h-screen md:p-20 py-10 px-5 gap-8">
      <div
        className="flex flex-start flex-col text-center md:max-w-3/4 w-full text-xl font-[var(--font-light)]"
        dangerouslySetInnerHTML={{ __html: content}}
      />
    </div>
  );
};

export default AboutUs;


