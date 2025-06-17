import { useState } from 'react';
import { ArrowRight, Star, Calendar, Phone, MapPin } from 'lucide-react';

export default function HeroSection() {
  const [fromDate, setFromDate] = useState('08/03/2025');
  const [toDate, setToDate] = useState('10/03/2025');
  const [phoneNumber, setPhoneNumber] = useState('+ (380) 50 561 80 69');
  const [selectedCategory, setSelectedCategory] = useState('Mountain Retreat');

  const categories = [
    'Mountain Retreat',
    'Nordic Charm',
    'Cozy Cottage',
    'Nature Escape'
  ];

  const toggleCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {/* Main Hero Section with Background Image */}
      <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Overlay for better text readability */}
        <div 
          className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        />
        
        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 pt-32 md:pt-40 lg:pt-48 flex flex-col h-full">
          <div className="flex-1">
            {/* Available now tag */}
            <div className="inline-flex items-center space-x-1 bg-black/50 text-white px-3 py-1 rounded-full text-xs mb-3 backdrop-blur-sm animate-fadeIn">
              <Star size={12} className="text-yellow-400" />
              <span>Available now</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic font-light leading-tight mb-6 md:mb-12 animate-slideUp">
              Plan Your<br />Escape
            </h1>
            
            {/* Property tags */}
            <div className="hidden md:flex flex-wrap gap-2 mt-8 justify-end max-w-md ml-auto">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`transition-all duration-300 rounded-full px-4 py-1.5 ${
                    selectedCategory === category 
                      ? 'bg-white text-gray-800 shadow-lg' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Address */}
            <div className="hidden md:block absolute right-8 bottom-36 text-white text-right animate-fadeIn">
              <div className="flex items-center justify-end mb-1">
                <span className="opacity-80">Location</span>
                <MapPin size={14} className="ml-1 text-white/70" />
              </div>
              <p className="text-lg font-light">871 Coolidge Street</p>
              <p className="font-light">Rain Town, Montana</p>
              <p className="text-sm text-white/80">55917</p>
            </div>
          </div>
          
          {/* Booking bar */}
          <div 
            className="bg-white rounded-xl p-5 md:p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-xl backdrop-blur-sm animate-slideUp border border-white/20"
            style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.1), 0 8px 15px rgba(0,0,0,0.05)' }}
          >
            <div className="w-full md:w-auto mb-4 md:mb-0 px-2">
              <p className="text-xs text-gray-500 mb-1 flex items-center">
                <Calendar size={12} className="mr-1" />
                From Date
              </p>
              <input
                type="text"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="font-semibold bg-transparent focus:outline-none text-gray-800 w-full"
              />
            </div>
            
            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
            
            <div className="w-full md:w-auto mb-4 md:mb-0 px-2">
              <p className="text-xs text-gray-500 mb-1 flex items-center">
                <Calendar size={12} className="mr-1" />
                To Date
              </p>
              <input
                type="text" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="font-semibold bg-transparent focus:outline-none text-gray-800 w-full"
              />
            </div>
            
            <div className="hidden md:block h-12 w-px bg-gray-200"></div>
            
            <div className="w-full md:w-auto mb-4 md:mb-0 px-2">
              <p className="text-xs text-gray-500 mb-1 flex items-center">
                <Phone size={12} className="mr-1" />
                Phone Number
              </p>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="font-semibold bg-transparent focus:outline-none text-gray-800 w-full"
              />
            </div>
            
            <button 
              className="w-full md:w-auto mt-4 md:mt-0 md:ml-4 bg-gray-900 text-white hover:bg-black rounded-full px-6 py-3 flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <span>Book a House</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile property tags */}
      <div className="md:hidden flex flex-wrap gap-2 mt-6 justify-center px-4">
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => toggleCategory(category)}
            className={`transition-all duration-300 rounded-full px-3 py-1 text-sm ${
              selectedCategory === category 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Mobile address */}
      <div className="md:hidden flex flex-col items-center mt-6 px-4 pb-8">
        <div className="flex items-center text-gray-600 mb-1">
          <MapPin size={16} className="mr-1" />
          <span>Property Location</span>
        </div>
        <p className="text-gray-800 font-medium">871 Coolidge Street</p>
        <p className="text-gray-600">Rain Town, Montana</p>
        <p className="text-gray-500 text-sm">55917</p>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </>
  );
}