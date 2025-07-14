 import React, { useEffect, useState } from 'react';
 import { Link } from 'react-router-dom';
import api, { API_URL } from "../services/api"; 

// hi heloo

export default function IntegratedBlogComponent() {
  const [activeTab, setActiveTab] = useState('All news'); // Default to 'All news' for clarity
  const [selectedTitle, setSelectedTitle] = useState('All Titles'); // New state for title filter
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from API
useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs"); // ✅ Use Axios instance with base URL
      const data = res.data;
      console.log('Fetched blogs from API:', data); // Debug log
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };
  fetchBlogs();
}, []);

  const Title = [
    'Residential Design', 'Modern Architecture','Passive Design','High-Density Housing ','3D-Printed Structures','Universal Design','AI','Commercial Architecture', 'Interior Design', 
    'Urban Planning',   'Traditional Architecture', 'Industrial Design', 
  ]; 
  
  const categories= ['Article', 'News', 'YouTube', 'All news'];
  const allTitlesOption = 'All Titles';

  // Convert API blogs to match the original blog post structure
  const blogPosts = blogs.map((blog, index) => ({
    id: blog._id || index,
    title: blog.title || 'Untitled',
    subtitle: blog.description || 'No description available',
    image: blog.image?.startsWith("http")
  ? blog.image
  : '/fallback.jpg', // use a public fallback image if Cloudinary URL is missing
    Title: blog.title || 'Untitled', // Use blog title for filtering
    type: blog.category || blog.type || 'Article', // Use category or type from API
    author: blog.author || 'Admin',
    createdAt: blog.createdAt
  }));
  console.log('blogPosts after mapping:', blogPosts); // Debug log

  // Two-factor filtering logic
  const getFilteredBlogs = () => {
    let filtered = blogPosts;
    // Debug: print all blog titles and selectedTitle
    console.log('All blog titles:', blogPosts.map(b => b.title), 'Selected title:', selectedTitle);
    // Filter by title if not 'All Titles'
    if (selectedTitle !== allTitlesOption) {
      filtered = filtered.filter(blog => blog.title && blog.title.trim().toLowerCase() === selectedTitle.trim().toLowerCase());
    }
    // Filter by category if not 'All news'
    if (activeTab !== 'All news') {
      filtered = filtered.filter(blog => {
        const blogType = blog.type.toLowerCase().trim();
        const tabType = activeTab.toLowerCase().trim();
        if (tabType === 'article' && (blogType === 'article' || blogType === 'articles')) {
          return true;
        }
        if (tabType === 'news' && (blogType === 'news' || blogType === 'new')) {
          return true;
        }
        if (tabType === 'youtube' && (blogType === 'youtube' || blogType === 'video' || blogType === 'videos')) {
          return true;
        }
        return blogType === tabType;
      });
    }
    return filtered;
  };

  const filteredBlogs = getFilteredBlogs();
  console.log('selectedTitle:', selectedTitle, 'activeTab:', activeTab, 'filteredBlogs:', filteredBlogs); // Debug log

  // Reset to page 1 when either filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedTitle]);

  // Pagination logic
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredBlogs.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen bg-gray-200 text-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-6 flex items-center justify-center bg-gray-200">
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#a77744]">
            <span className="bg-clip-text text-7xl text-transparent bg-gradient-to-r from-[#d59653] to-[#d07310]">
              Blog
            </span>
          </h2>
          <div className="block mb-2 text-gray-700 font-light italic text-lg sm:text-xl md:text-2xl">
            <p className="mb-2"> Explore cutting-edge architectural visualization techniques <br/>
            "that transform conceptual designs into immersive experiences"</p>
          </div>
        </div>  
      </div>

      {/* Title Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          {/* Primary Title */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {/* Add 'All Titles' option */}
            <button
              key={allTitlesOption}
              onClick={() => setSelectedTitle(allTitlesOption)}
              className={`px-6 py-3 bg-[#2d2a2a]/95 border-[#2d2a2a]/95 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 ${selectedTitle === allTitlesOption ? 'ring-2 ring-[#d59653] text-[#d59653]' : ''}`}
            >
              {allTitlesOption}
            </button>
            {Title.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedTitle(category)}
                className={`px-6 py-3 bg-[#2d2a2a]/95 border-[#2d2a2a]/95 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 ${selectedTitle === category ? 'ring-2 ring-[#d59653] text-[#d59653]' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content categories */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-full mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-1 mb-12">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-lg font-medium transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'text-black ring-2 ring-[#d59653]'
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
          {/* Show active filters */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              {selectedTitle !== allTitlesOption && (
                <span>
                  {/* Filtering by Title: <span className="font-semibold text-[#d59653]">{selectedTitle}</span> */}
                </span>
              )}
              {activeTab !== 'All news' && (
                <span>
                  {/* {selectedTitle !== allTitlesOption ? ' | ' : ''}Filtering by Category: 
                  <span className="font-semibold text-[#d59653]">{activeTab}</span> */}
                </span>
              )}
              {(selectedTitle !== allTitlesOption || activeTab !== 'All news') && (
                <button onClick={() => { setSelectedTitle(allTitlesOption); setActiveTab('All news'); }} className="ml-4 px-2 py-1 text-xs bg-gray-300 text-black rounded hover:bg-gray-400">Clear Filters</button>
              )}
            </p>
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-xs text-gray-500"> 
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center text-gray-400 py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p>Loading blogs...</p>
            </div>
          )}

          {/* No Blogs State */}
          {!loading && filteredBlogs.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <p>No {activeTab === 'All news' ? 'blogs' : activeTab.toLowerCase() + ' posts'} found.</p>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!loading && filteredBlogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 w-full">
                {currentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105 w-full"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 w-full">
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden w-full">
                        {/* Background Image */}
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Base Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        
                        {/* Category and Title - Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                          <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-black/80 backdrop-blur-sm rounded text-xs font-medium text-white border border-gray-600">
                              {post.type}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold text-white leading-tight">
                            {post.title}
                          </h2>
                        </div>

                        {/* Read More Hover Overlay */}
                        <Link to={`/blogs/${post.id}`} className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination section  */}
             {totalPages > 1 && (
  <div className="flex justify-center items-center space-x-3 flex-wrap gap-2">
    {pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => {
          setCurrentPage(number);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
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
      onClick={() => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      disabled={currentPage === totalPages}
      className={`w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-105 ml-4 ${
        currentPage === totalPages 
          ? 'bg-gray-600 text-gray-500 cursor-not-allowed' 
          : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white'
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
)}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 