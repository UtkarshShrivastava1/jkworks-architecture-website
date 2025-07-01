import React from 'react';
import courseBg from '../assets/coursebg.png';

const courses = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image with advanced styling */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 filter blur-sm brightness-75 contrast-125 saturate-110"
        style={{
          backgroundImage: `url(${courseBg})`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/60" />
      
      {/* Animated particles/dots overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white rounded-full animate-ping animation-delay-3000"></div>
      </div>
      
      {/* Content with glass morphism effect */}
      <div className="relative z-10 text-center p-10 max-w-lg mx-4"> 
        
        {/* Content */}
        <div className="relative z-20">
          <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h1>
          
          <p className="text-xl text-gray-100 mb-10 drop-shadow-lg leading-relaxed font-light">
            We're crafting something amazing. 
            <br />
            <span className="text-gray-100 text-lg ">Stay tuned !!!</span>
          </p>
          
          {/* Animated icon with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <svg
                className="w-16 h-16 mx-auto text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <svg
              className="w-16 h-16 mx-auto text-white drop-shadow-lg relative z-10 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div> 
        </div>
      </div>  
    </div>
  );
};

export default courses;