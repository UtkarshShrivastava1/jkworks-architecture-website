import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Let_hero from '../assets/let_talk.jpeg';

function TALK() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full h-[60vh] flex flex-col md:flex-row">
      
      {/* Left side - Image filling exact height */}
      <div className="w-full md:w-1/2 h-full relative flex items-center">
        <img src={Let_hero} className="w-full h-full object-cover" alt="Hero Section" />
        {/* Circular design element overlay */}
        <div className="absolute bottom-0 right-0 md:top-1/2 md:right-0 md:transform md:-translate-y-1/2 md:translate-x-1/2">
          <div className="w-24 h-24 border border-white rounded-full opacity-60"></div>
          <div className="w-16 h-16 border border-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
          <div className="w-8 h-8 border border-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        </div>
      </div>

      {/* Right side - Text content resized */}
      <div className="w-full md:w-1/2 h-full bg-gray-200 p-12 flex flex-col justify-center text-gray-800">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-6xl font-normal mb-4 leading-tight">
            CRAFTING SPACES
            <br />
            <span className="block">&amp; TELLING STORIES</span>
          </h1>

          <p className="text-lg mb-8 mt-4 text-gray-700">
            We are passionate about creating daring designs that stand out from the crowd.
           <br />
          Contact us today and let's talk more about your project and how we can work together to make it happen.
          </p>
          <button 
            onClick={() => navigate('/contact')} // Use navigate to route to the Contact page
            className="bg-[#b39069] text-gray-100 font-medium py-4 px-12 transition-colors hover:bg-black hover:text-white"
          >
            LET'S TALK
          </button>
        </div>
      </div>
    </div>
  );
}

export default TALK;