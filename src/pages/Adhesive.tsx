type PageProps = {
  content: string;
  title: string;
};

const Adhesive = ({ content }: PageProps) => {
  return (
    <div className="container text-center flex flex-col items-center justify-start min-h-max md:p-20 py-10 px-4 gap-8">
      {/* <h1 className="text-5xl font-bold mb-6">{title}</h1> */}
      <div
        className="md:w-4xl w-[500px] md:px-0 px-4 text-xl flex flex-col items-center justify-center gap-4 font-[var(--font-light)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};




export default Adhesive;
