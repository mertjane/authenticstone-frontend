import { usePages } from "../hooks/usePageBySlug";
import InstallationPage from "../pages/InstallationPage";
import Loader from "./Loader";

const InstallationWrapper = () => {
  const { data, isLoading, error } = usePages("installation");
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <InstallationPage
      title={data.title.rendered}
      content={data.content.rendered}
    />
  )
}

export default InstallationWrapper