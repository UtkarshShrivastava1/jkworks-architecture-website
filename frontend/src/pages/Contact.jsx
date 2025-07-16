import React, { useEffect, useState } from "react";
import { Phone, Mail, User, Building, MessageCircle, Send } from "lucide-react";
import CONT from '../assets/CONT.webp'; // Import the local background image
import api from "../services/api";

const ContactPage = () => {
  const [rotation, setRotation] = useState(0);
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const animateO = () => {
      setRotation((prev) => (prev + 1) % 360);
      requestAnimationFrame(animateO);
    };

    const animationId = requestAnimationFrame(animateO);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await api.post("/contact", form);
      const data = res.data;
      if (data.success) {
        setStatus("Message sent!");
        setForm({
          name: "",
          companyName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setStatus(data.message || "Failed to send.");
      }
    } catch {
      setStatus("Failed to send.");
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden"> 
      {/* Client's Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${CONT})`,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Subtle Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Professional Accent Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b39069] to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b39069] to-transparent opacity-60" />

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center lg:justify-start px-4 sm:px-6 lg:px-8">
        {/* Professional Contact Form Panel */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl bg-black/40 backdrop-blur-lg p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20 lg:ml-8 xl:ml-16 2xl:ml-24 my-8 relative group transition-all duration-500 hover:shadow-3xl mt-24">
          
          {/* Subtle Professional Border Effect */}
          <div className="absolute inset-0   opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            {/* Professional Header */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#a77744]   tracking-wide">
                CONTACT US
              </h1>
              <div className="w-16 h-0.5  mb-6 transition-all duration-500 group-hover:w-24" />
              <p className="font-light text-sm sm:text-base text-gray-200 leading-relaxed">
                Get in touch with us and we'll collaborate to turn your vision into reality.
              </p>
            </div>

            <div className="space-y-6">
              {/* Enhanced Name Field */}
              <div className="relative group">
                <label className="block mb-2 text-sm text-white font-medium transition-colors duration-300">
                  Name 
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focusedField === 'name' ? 'text-[#b39069] scale-110' : 'text-gray-400'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    className="w-full pl-12 pr-4 py-4 border border-gray-400 bg-white/5 backdrop-blur-sm text-white placeholder-gray-300  focus:outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-lg focus:shadow-[#b39069]/20"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    placeholder="Enter your full name"
                    required
                  />
                  <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${focusedField === 'name' ? 'w-full' : 'w-0'}`} />
                </div>
              </div>

              {/* Enhanced Company Name Field */}
              <div className="relative group">
                <label className="block mb-2 text-sm text-white font-medium transition-colors duration-300">
                  Company Name 
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focusedField === 'companyName' ? 'text-[#b39069] scale-110' : 'text-gray-400'}`}>
                    <Building className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    className="w-full pl-12 pr-4 py-4 border border-gray-400 bg-white/5 backdrop-blur-sm text-white placeholder-gray-300  focus:outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-lg focus:shadow-[#b39069]/20"
                    value={form.companyName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('companyName')}
                    onBlur={handleBlur}
                    placeholder="Enter your company name"
                    required
                  />
                  <div className={`absolute bottom-0 left-0 h-0.5  transition-all duration-300 ${focusedField === 'companyName' ? 'w-full' : 'w-0'}`} />
                </div>
              </div>

              {/* Enhanced Email Field */}
              <div className="relative group">
                <label className="block mb-2 text-sm text-white font-medium transition-colors duration-300">
                  Email 
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focusedField === 'email' ? 'text-[#b39069] scale-110' : 'text-gray-400'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="w-full pl-12 pr-4 py-4 border border-gray-400 bg-white/5 backdrop-blur-sm text-white placeholder-gray-300  focus:outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-lg focus:shadow-[#b39069]/20"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    placeholder="Enter your email address"
                    required
                  />
                  <div className={`absolute bottom-0 left-0 h-0.5   transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'}`} />
                </div>
              </div>

              {/* Enhanced Phone Field */}
              <div className="relative group">
                <label className="block mb-2 text-sm text-white font-medium transition-colors duration-300">
                  Phone
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${focusedField === 'phone' ? 'text-[#b39069] scale-110' : 'text-gray-400'}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full pl-12 pr-4 py-4 border border-gray-400 bg-white/5 backdrop-blur-sm text-white placeholder-gray-300  focus:outline-none transition-all duration-300 focus:bg-white/10 focus:shadow-lg focus:shadow-[#b39069]/20"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    placeholder="Enter your phone number"
                  />
                  <div className={`absolute bottom-0 left-0 h-0.5   transition-all duration-300 ${focusedField === 'phone' ? 'w-full' : 'w-0'}`} />
                </div>
              </div>

              {/* Enhanced Message Field */}
              <div className="relative group">
                <label className="block mb-2 text-sm text-white font-medium transition-colors duration-300">
                  Message 
                </label>
                <div className="relative">
                  <div className={`absolute left-3 top-4 transition-all duration-300 ${focusedField === 'message' ? 'text-[#b39069] scale-110' : 'text-gray-400'}`}>
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <textarea
                    name="message"
                    className="w-full pl-12 pr-4 py-4 h-32 border border-gray-400 bg-white/5 backdrop-blur-sm text-white placeholder-gray-300  focus:outline-none transition-all duration-300 resize-none focus:bg-white/10 focus:shadow-lg focus:shadow-[#b39069]/20"
                    placeholder="Tell us about your project requirements..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                  /> 
                </div>
              </div>

              {/* Professional Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="group relative w-full sm:w-auto px-8 py-4 bg-[#b39069] text-black font-medium text-sm sm:text-base transition-all duration-300 hover:bg-[#a08558] hover:shadow-lg hover:shadow-[#b39069]/30 focus:outline-none focus:ring-2 focus:ring-[#b39069] focus:ring-offset-2 focus:ring-offset-transparent active:transform active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    LET'S TALK
                  </span>
                </button>
              </div>

              {/* Professional Contact Information */}
              <div className="mt-8 pt-6 border-t border-white/20"> 
                <div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-16 space-y-4 md:space-y-0">

                  <div className="flex items-center gap-4 text-white group transition-all duration-300 hover:translate-x-1">
                    <div className="w-12 h-12 bg-[#b39069]/20 rounded-full flex items-center justify-center group-hover:bg-[#b39069]/30 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-[#b39069]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                      <a href="tel:+917999857133" className="text-white hover:text-[#b39069] transition-colors text-sm sm:text-base font-medium">
                        +91 7999857133
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white group transition-all duration-300 hover:translate-x-1">
                    <div className="w-12 h-12 bg-[#b39069]/20 rounded-full flex items-center justify-center group-hover:bg-[#b39069]/30 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-[#b39069]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                      <a href="mailto:jkworks1995@gmail.com" className="text-white hover:text-[#b39069] transition-colors text-sm sm:text-base font-medium break-all">
                        jkworks1995@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Status Message */}
              {status && (
                <div className={`mt-6 p-4 text-center font-medium backdrop-blur-sm transition-all duration-300 ${
                  status === "Message sent!" 
                    ? "bg-green-600/20 text-green-200 border border-green-400/30" 
                    : status === "Failed to send." 
                    ? "bg-red-600/20 text-red-200 border border-red-400/30"
                    : "bg-[#b39069]/20 text-white border border-[#b39069]/30"
                }`}>
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;