import { usePages } from '../hooks/usePageBySlug';
import SealingMaintenancePage from '../pages/SealingMaintenancePage';
import Loader from "./Loader";

const SealingMainWrapper = () => {
  const { data, isLoading, error } = usePages("sealing-and-maintenance");

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;

  return (
    <SealingMaintenancePage title={data.title.rendered} content={data.content.rendered} />
  )
}

export default SealingMainWrapper