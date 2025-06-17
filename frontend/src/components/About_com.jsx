import { useNavigate } from 'react-router-dom'; 
import outdoorImg from '../assets/outdoor.jpg';  

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="h-[60vh] flex bg-gray-100">
      {/* Left Section - Text */}
      <div className="w-[70%] flex flex-col justify-center px-10 ">
        <h1 className="text-4xl font-bold leading-tight mb-4">
          Find The Best<br />Fashion Style<br />For You
        </h1>
        <p className="text-gray-600 mb-6">
          Lorem ipsum is a name for a common type of placeholder text.<br/> Also known as filler or dummy text, this is simply text copy.
        </p>
        <button  onClick={() => navigate('/about')} className="bg-[#b39069] text-gray-100 px-5 py-3 font-medium text-sm w-fit transition-colors hover:bg-black hover:text-white">ABOUT US</button>
      </div>

       {/* Right Section - Image */}
<div className="w-[60%] relative bg-gray-100 overflow-hidden">
  <div className="w-full h-full rounded-bl-[80px] overflow-hidden">
    <img
      src={outdoorImg}
      alt="Outdoor Fashion"
      className="w-full h-full object-cover"
    />
  </div>
</div>

    </section>
    
  );
};

export default HeroSection;
 