// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import blogBg from '../assets/blog.jpg';

// const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

// const BlogGridHeader = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/blogs`);
//         const data = await res.json();
//         setBlogs(Array.isArray(data) ? data : []);
//       } catch (err) {
//         setBlogs([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);
  

//   return (
//     <div className="w-full flex flex-col">
//       {/*hero section */}
// {/* <motion.div
//   className="relative pt-25 pb-8 flex items-center justify-center bg-white"
//   initial={{ opacity: 0, scale: 1.05 }}
//   animate={{ opacity: 1, scale: 1 }}
//   transition={{ duration: 1 }}
// >
//   <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
//     {/* Main Blog Title */} 
//     <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6  text-[#a77744] ">
//             <span className="bg-clip-text  text-7xl text-transparent bg-gradient-to-r from-[#d59653] to-[#d07310]">
//               {" "}
//               Blog
//             </span>
//           </h2>
    
//     {/* Subtitle text - matches image exactly */}
//     <div className="block mb-2 text-gray-700 font-light italic text-lg sm:text-xl md:text-2xl">
//       <p className="mb-2"> Explore cutting-edge architectural visualization techniques </p>
//       <p>"that transform conceptual designs into immersive experiences"</p>
//     </div>
//   </div>
// </motion.div>  */}

//       {/* Blog Grid Section */}
//       <div className="container mx-auto py-12 px-4 max-w-6xl">
//         {loading ? (
//           <div className="text-center text-gray-500 py-12">Loading blogs...</div>
//         ) : blogs.length === 0 ? (
//           <div className="text-center text-gray-500 py-12">No blogs found.</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map((blog) => (
//               <div
//                 key={blog._id}
//                 className="relative flex flex-col transition-all duration-300 group h-full mx-auto w-full max-w-xs"
//                 style={{
//                   transition: 'all 0.3s ease',
//                   border: '1px dashed black',
//                   borderRadius: '0px',
//                   padding: '0px',
//                 }}
//               >
//                 {/* Blog image */}
//                {blog.image && (
//                 <img
//               src={`${API_URL}/uploads/${blog.image}`}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//                 />
//             )}

//                 {/* Content section with subtle overlay */}
//                 <div className="p-6 flex-grow flex flex-col relative" style={{ minHeight: '300px' }}>
//                   <div className="absolute inset-0 bg-white bg-opacity-90"></div>
//                   <div className="relative z-10">
//                     <div className="flex items-center text-sm text-gray-500 mb-2">
//                       <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ''}</span>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-black transition-colors duration-300">{blog.title}</h3>
//                     <div className="mb-6 flex-grow overflow-auto break-words" style={{ maxHeight: "120px" }}>
//                       <p className="text-gray-600 whitespace-pre-line">
//                         {blog.description}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-between mt-auto">
//                       <div className="text-sm text-gray-500">By - {blog.author || "Admin"}</div>
//                     </div>
//                   </div>
//                 </div>
                
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogGridHeader;


import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

export default function IntegratedBlogComponent() {
  const [activeTab, setActiveTab] = useState('Article');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blogs`);
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = [
    'Residential Design', 'Commercial Architecture', 'Interior Design', 'Landscape Architecture', 'Sustainable Design', 
    'Urban Planning', 'Renovation & Restoration', 'Modern Architecture', 'Traditional Architecture', 'Industrial Design'
  ];
  
  const secondaryCategories = [
    'Building Materials', 'Construction Technology', 'Architectural Visualization', 'Design Process', 'Building Codes & Standards'
  ];
  
  const tabs = ['Article', 'News', 'YouTube', 'All news'];

  // Convert API blogs to match the original blog post structure
  const blogPosts = blogs.map((blog, index) => ({
    id: blog._id || index,
    title: blog.title || 'Untitled',
    subtitle: blog.description || 'No description available',
    image: blog.image ? `${API_URL}/uploads/${blog.image}` : '/api/placeholder/400/300',
    categories: ['Architecture'], // Default category, you can modify this based on your API data
    type: 'Article',
    author: blog.author || 'Admin',
    createdAt: blog.createdAt
  }));

  // Pagination logic (keeping original logic)
  const postsPerPage = 9;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg- gray-200  text-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 flex items-center justify-center bg gray-200  ">
        {/* <div className="relative z-10 text-center max-w-4xl mx-auto px-4"> */}
          <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          {/* <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent  bg-gradient-to-r from-[#d59653] to-[#d07310]   animate-pulse">
             Blog
          </h1> */}
           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6  text-[#a77744] ">
            <span className="bg-clip-text  text-7xl text-transparent bg-gradient-to-r from-[#d59653] to-[#d07310]">
              {" "}
              Blog
            </span>
          </h2>
          {/* Subtitle text - matches image exactly */}
    <div className=" block mb-2 text-gray-700 font-light italic text-lg sm:text-xl md:text-2xl">
      <p className="mb-2"> Explore cutting-edge architectural visualization techniques <br/>
      "that transform conceptual designs into immersive experiences"</p>
    </div>
  </div>  
      </div>
      

      {/* Categories Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[#2d2a2a]/95"> bg-[#2d2a2a]/95
        <div className="max-w-7xl mx-auto">
          {/* Primary Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-[#2d2a2a]/95 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Secondary Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {secondaryCategories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-1 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-lg font-medium transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'text-black'
                    : 'text-black hover:text-black'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d59653] to-[#d07310] animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p>Loading blogs...</p>
            </div>
          )}

          {/* No Blogs State */}
          {!loading && blogPosts.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <p>No blogs found.</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!loading && blogPosts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 w-full">
                {currentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group cursor-pointer transform transition-all duration-700 hover:scale-105 w-full"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 w-full">
                      {/* Image Container - Full Width with Increased Height */}
                      <div className="relative aspect-[4/3] overflow-hidden w-full">
                        {/* Background Image */}
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay Effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Category Tags - Top Left */}
                        <div className="absolute top-4 left-4 z-20">
                          <div className="flex flex-wrap gap-2">
                            {post.categories.map((category) => (
                              <span
                                key={category}
                                className="px-3 py-1 bg-[#2d2a2a]/95 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-gray-600"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Content Type Badge - Top Right */}
                        <div className="absolute top-4 right-4 z-20">
                          <span className="px-3 py-1 bg-[#2d2a2a]/95 backdrop-blur-sm rounded-lg text-xs font-medium text-white border border-gray-600">
                            {post.type}
                          </span>
                        </div>

                        {/* Main Title - Center */}
                        <div className="absolute inset-0 p-6 flex items-center justify-center z-10">
                          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl leading-tight">
                              {post.title}
                            </h2>
                          </div>
                        </div>

                        {/* Bottom Section - Subtitle and Arrow */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                            <h3 className="text-lg font-medium text-white leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 mb-3">
                              {post.subtitle}
                            </h3>
                            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                              <div className="flex items-center text-sm text-gray-300">
                                <span>By {post.author}</span>
                                {post.createdAt && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                  </>
                                )}
                              </div>
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors duration-300">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-3">
                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`relative w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center font-medium ${
                      currentPage === number
                        ? 'bg-gradient-to-r from-[#d59653] to-[#d07310] text-white shadow-lg shadow-purple-500/30 scale-110'
                        : 'bg-[#2d2a2a]/95 text-gray-400 hover:bg-[#2d2a2a]/95 hover:text-white hover:scale-105'
                    }`}
                  >
                    {number}
                    {currentPage === number && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d59653] to-[#d07310] animate-pulse opacity-30"></div>
                    )}
                  </button>
                ))}
                
                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-105 ml-4"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}