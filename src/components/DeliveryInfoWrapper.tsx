import { usePages } from "../hooks/usePageBySlug";
import DeliveryInfo from "../pages/DeliveryInfo";
import Loader from "./Loader";

const DeliveryInfoWrapper = () => {
  const { data, isLoading, error } = usePages("delivery-information");

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <DeliveryInfo title={data.title.rendered} content={data.content.rendered} />
  );
};

export default DeliveryInfoWrapper;
