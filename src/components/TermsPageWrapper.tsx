import Loader from './Loader';
import { usePages } from '../hooks/usePageBySlug';
import TermsConditions from '../pages/TermsConditions';

const TermsPageWrapper = () => {
  const { data, isLoading, error } = usePages("terms-and-conditions");
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <TermsConditions
      title={data.title.rendered}
      content={data.content.rendered}
    />
  )
}

export default TermsPageWrapper