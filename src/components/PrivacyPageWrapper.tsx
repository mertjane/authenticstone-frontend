import { usePages } from "../hooks/usePageBySlug";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Loader from "./Loader";

const PrivacyPageWrapper = () => {
  const { data, isLoading, error } = usePages("privacy-policy");
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <PrivacyPolicy
      title={data.title.rendered}
      content={data.content.rendered}
    />
  );
};

export default PrivacyPageWrapper;
