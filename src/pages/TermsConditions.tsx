type PageProps = {
  content: string;
  title: string;
};

const TermsConditions = ({ content, title }: PageProps) => {
  return (
    <div className="container text-center flex flex-col items-center justify-start min-h-max md:p-20 py-10 px-5 gap-8">
      <h1 className="text-5xl mb-6">{title}</h1>
      <div
        className="flex flex-start flex-col text-start md:max-w-3/4 w-full gap-4 text-xl font-[var(--font-light)]"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TermsConditions;
