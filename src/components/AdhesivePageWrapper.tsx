import { usePages } from "../hooks/usePageBySlug";
import Adhesive from "../pages/Adhesive";
import Loader from "./Loader";

const AdhesivePageWrapper = () => {
  const { data, isLoading, error } = usePages("adhevise-grout-advise");
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <Adhesive title={data.title.rendered} content={data.content.rendered} />
  );
};

export default AdhesivePageWrapper;
