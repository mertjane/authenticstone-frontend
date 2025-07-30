import { usePages } from "../hooks/usePageBySlug";
import ContactPage from "../pages/ContactPage";
import Loader from "./Loader";

const ContactPageWrapper = () => {
  const { data, isLoading, error } = usePages("contact-us");

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  if (error || !data) return <div className="p-8">Error loading page</div>;
  return (
    <ContactPage title={data.title.rendered} content={data.content.rendered} />
  );
};

export default ContactPageWrapper;
