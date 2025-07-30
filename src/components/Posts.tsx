
import { TbSparkles } from "react-icons/tb";
import { usePosts } from "../queries/blogposts.query";

const FeaturedPostSkeleton = () => (
  <div className="bg-white shadow-xl overflow-hidden border border-stone-200 animate-pulse">
    <div className="h-full grid grid-cols-2 gap-0">
      {/* Image Skeleton */}
      <div className="col-span-1 bg-gray-200 h-full" />

      {/* Content Skeleton */}
      <div className="col-span-1 p-4">
        {/* Badge Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-20 h-5 bg-gray-200 rounded-full" />
          <div className="w-24 h-4 bg-gray-200" />
        </div>

        {/* Title Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

        {/* Excerpt Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded" />
          <div className="w-20 h-6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const RecentPostSkeleton = () => (
  <div className="bg-white shadow-lg overflow-hidden border border-stone-100 animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full h-3/5 bg-gray-200" />

    {/* Content Skeleton */}
    <div className="p-4">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

      {/* Meta Skeleton */}
      <div className="flex items-center justify-between">
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

const Posts = () => {
  const { data: blogs = [], isLoading, error } = usePosts();

  // Safely get first 2 featured blogs and next 3 recent blogs
  const featuredBlogs = blogs.slice(0, 2);
  const recentBlogs = blogs.slice(2, 5);

  
  return (
    <div className="w-full px-4 py-0 md:p-10 select-none ">
      <div className="col-span-8 row-span-4 py-14 overflow-y-auto">
        {/* Main Heading */}
        <div className="mb-8 text-center w-full">
          <div className="flex items-center justify-center gap-3 mb-3 w-full">
            <span className="text-amber-600 font-semibold text-base tracking-wide w-full flex items-center justify-center gap-2">
              <TbSparkles className="w-7 h-7 text-amber-600" />
              LATEST UPDATES
            </span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Recent Posts
          </h1>
          <p className="text-medium text-gray-600 leading-relaxed max-w-2xl m-auto">
            Stay updated with the latest trends in natural stone tiles, design
            inspirations, and expert tips for your next home renovation project.
          </p>
        </div>

        {/* Featured Posts with Equal Size Images */}
        <div className="h-screen md:h-[350px] grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mb-0">
          {isLoading ? (
            <>
              <FeaturedPostSkeleton />
              <FeaturedPostSkeleton />
            </>
          ) : error ? (
            <div className="col-span-2 text-center text-red-500">
              Error loading blog posts
            </div>
          ) : (
            <>
              {featuredBlogs.map((blog, index) => (
                <div
                  key={blog.id}
                  className="h-5/6 bg-white shadow-xl overflow-hidden border border-stone-200"
                >
                  <div className="h-full grid grid-cols-2 gap-0 ">
                    <div className="col-span-1">
                      <img
                        src={blog.og_image?.[0]?.url}
                        alt={blog.link}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="col-span-1 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            index === 0
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {index === 0 ? "FEATURED" : "TRENDING"}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {new Date(blog.date).toLocaleDateString()}
                        </span>
                      </div>

                      <h2 className="text-sm md:text-lg font-bold text-gray-900 mb-2 leading-tight">
                        {blog.title}
                      </h2>

                      <p className=" text-gray-600 mb-3 text-xs md:text-sm leading-relaxed">
                        excerpt
                      </p>
                        
                        
                      

                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 text-xs font-medium">
                          Authentic Stone
                        </span>
                        <button className="flex items-center gap-1 bg-stone-800 text-white px-3 py-1 rounded-lg hover:bg-stone-900 transition-colors text-xs font-semibold">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Fallback if less than 2 blogs */}
              {featuredBlogs.length < 2 &&
                Array(2 - featuredBlogs.length)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={"featured-fallback-" + i}
                      className="bg-gray-100 border border-stone-200 flex items-center justify-center text-gray-400"
                    >
                      No featured post
                    </div>
                  ))}
            </>
          )}
        </div>

        {/* Recent Posts Grid */}
        <div className="relative w-full ">
          <div className="h-[460px] overflow-x-auto lg:overflow-x-hidden flex lg:grid lg:grid-cols-3 gap-4 px-0">
            {isLoading ? (
              <>
                <RecentPostSkeleton />
                <RecentPostSkeleton />
                <RecentPostSkeleton />
              </>
            ) : error ? (
              <div className="col-span-3 text-center text-red-500">
                Error loading recent posts
              </div>
            ) : (
              <>
                {recentBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="min-w-[70%] lg:min-w-0 bg-white shadow-lg overflow-hidden border border-stone-100 hover:shadow-xl transition-shadow "
                  >
                    <img
                      src={blog.og_image?.[0]?.url}
                      alt={blog.title}
                      className="w-full h-3/5 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {blog.title}
                      </h3>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-1">
                          <span>23 views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Fallback if less than 3 blogs */}
                {recentBlogs.length < 3 &&
                  Array(3 - recentBlogs.length)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={"recent-fallback-" + i}
                        className="bg-gray-100 border border-stone-100 flex items-center justify-center text-gray-400"
                      >
                        No recent post
                      </div>
                    ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
