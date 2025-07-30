import { usePages } from "../hooks/usePageBySlug";
import AboutUs from "../pages/AboutUs";
import Loader from "./Loader";

const AboutUsWrapper = () => {
  const { data, isLoading, error } = usePages("about-us");
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <AboutUs
      title={data.title.rendered}
      content={data.content.rendered}
    />
  )
}

export default AboutUsWrapper