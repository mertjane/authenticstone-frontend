import ReviewsPage from '../pages/ReviewsPage';
import Loader from './Loader';
import { usePages } from '../hooks/usePageBySlug';

const ReviewsWrapper = () => {
  const { data, isLoading, error } = usePages("reviews");
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <ReviewsPage
      title={data.title.rendered}
      content={data.content.rendered}
    />
  )
}

export default ReviewsWrapper