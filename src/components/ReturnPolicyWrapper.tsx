import { usePages } from "../hooks/usePageBySlug";
import ReturnPolicy from "../pages/ReturnPolicy";
import Loader from "./Loader";


const ReturnPolicyWrapper = () => {
  const { data, isLoading, error } = usePages("return-refund-policy");
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <ReturnPolicy
      title={data.title.rendered}
      content={data.content.rendered}
    />
  )
}

export default ReturnPolicyWrapper