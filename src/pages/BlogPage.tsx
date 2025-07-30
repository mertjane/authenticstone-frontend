import { useEffect, useState } from "react";
import { usePaginatedBlogPosts } from "../hooks/usePageBySlug";
import Loader from "../components/Loader";

const BlogPage = () => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const { data, isLoading, isFetching, isError } = usePaginatedBlogPosts(page);

  useEffect(() => {
    if (data?.posts?.length) {
      setAllPosts((prev) => [...prev, ...data.posts]);
    }
  }, [data]);

  const loadMore = () => {
    if (data && page < data.totalPages) {
      setPage((p) => p + 1);
    }
  };

  if (isLoading && page === 1) {
    // Only show full page loader on initial load (page 1)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError || !data) return <div>Error loading blog posts.</div>;
  return (
    <div className="container text-center flex flex-col items-center justify-start min-h-max md:p-0 py-10 px-4 gap-8">
      <h1 className="text-5xl pt-20">Blogs</h1>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border min-h-[420px] border-gray-200 rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
            >
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 text-start">
                <h3
                  className="text-xl font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div
                  className="text-md text-gray-600 font-[var(--font-light)]"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col items-center gap-4 mt-12">
          <button
            onClick={loadMore}
            disabled={isFetching || page >= (data?.totalPages || 1)}
            className="bg-transparent border-2 border-[#1d2328] text-[#1d2328] px-8 py-3 text-sm uppercase tracking-wider hover:bg-[#1d2328] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-2">
              {isFetching && (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {isFetching ? "Loading..." : "Load More"}
            </span>
          </button>

          <div className="text-sm text-gray-600 tracking-wider">
            Page {page} of {data?.totalPages || 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
