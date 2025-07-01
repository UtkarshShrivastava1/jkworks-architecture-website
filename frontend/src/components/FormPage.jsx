// import React, { useState } from 'react';
// import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, User, Building, MessageSquare } from 'lucide-react';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     companyName: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const [focusedField, setFocusedField] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     // Handle form submission here
//   };

//   const handleFocus = (fieldName) => {
//     setFocusedField(fieldName);
//   };

//   const handleBlur = () => {
//     setFocusedField('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 relative overflow-hidden">
//       {/* Decorative background elements - responsive sizes */}
//       <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-gray-300 opacity-100 transform translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12 lg:translate-x-16 lg:translate-y-16"></div>
//       <div className="absolute top-15 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 opacity-100 transform -translate-x-4 -translate-y-4 sm:-translate-x-6 sm:-translate-y-6 lg:-translate-x-8 lg:-translate-y-8"></div>
//       {/* Header */}
//       <div className="text-center py-8 md:py-12">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#c99e70] mb-2"> 
//           Contact us
//         </h1>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
//           {/* Left Section - Company Info */}
//           <div className="space-y-8">
//             <div>
//               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
//                  Every masterpiece starts with a conversation.  {' '}
//                 <span className="text-[#c99e70]">Reach out &</span>
//                 <br />
//                 <span className="text-gray-700">Let's shape your vision into lasting architecture.</span>
//               </h2>
//             </div>

//             {/* Social Media Icons */}
//             <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
//               <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
//                 <Instagram className="w-6 h-6 text-white" />
//               </div>
//               <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
//                 <Facebook className="w-6 h-6 text-white" />
//               </div>
//               <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
//                 <Linkedin className="w-6 h-6 text-white" />
//               </div>
//               <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
//                 <Twitter className="w-6 h-6 text-white" />
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-2xl">
//               <div className="text-center">
//                 <div className="w-16 h-16 bg-[#c99e70] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                   <Mail className="w-8 h-8 text-white" />
//                 </div>
//                 <p className="text-base sm:text-lg mb-6">
//                   Our team is ready to help you bring your ideas to life.
//                 </p>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="flex items-center justify-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
//                   <Phone className="w-5 h-5 text-[#c99e70]" />
//                   <span className="text-base sm:text-lg">+1 (555) 123-4567</span>
//                 </div>
//                 <div className="flex items-center justify-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
//                   <Mail className="w-5 h-5 text-[#c99e70]" />
//                   <span className="text-base sm:text-lg">contact@example.com</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Contact Form */}
//           <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
//             {/* Decorative background elements */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c99e70] to-transparent opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-800 to-transparent opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
            
//             <div className="relative z-10">
//               <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
//                 Start a conversation with us
//               </h3>
//               <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
//                 Let's discuss your architectural vision and transform it into reality
//               </p>
              
//               <div className="space-y-8">
//                 {/* Name Field */}
//                 <div className="relative group">
//                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300">
//                     <User className={`w-5 h-5 ${focusedField === 'name' || formData.name ? 'text-[#c99e70]' : 'text-gray-400'}`} />
//                   </div>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Full Name*"
//                     value={formData.name}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('name')}
//                     onBlur={handleBlur}
//                     className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
//                   />
//                   <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     Tell us who we'll be working with on this architectural journey
//                   </div>
//                 </div>

//                 {/* Email Field */}
//                 <div className="relative group">
//                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300">
//                     <Mail className={`w-5 h-5 ${focusedField === 'email' || formData.email ? 'text-[#c99e70]' : 'text-gray-400'}`} />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Your Email Address*"
//                     value={formData.email}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('email')}
//                     onBlur={handleBlur}
//                     className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
//                   />
//                   <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     We'll send you project updates and design inspirations
//                   </div>
//                 </div>

//                 {/* Phone Field */}
//                 <div className="relative group">
//                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300">
//                     <Phone className={`w-5 h-5 ${focusedField === 'phone' || formData.phone ? 'text-[#c99e70]' : 'text-gray-400'}`} />
//                   </div>
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Your Phone Number*"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('phone')}
//                     onBlur={handleBlur}
//                     className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
//                   />
//                   <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     For quick consultations and site visit coordination
//                   </div>
//                 </div>

//                 {/* Message Field */}
//                 <div className="relative group">
//                   <div className="absolute left-4 top-6 transition-all duration-300">
//                     <MessageSquare className={`w-5 h-5 ${focusedField === 'message' || formData.message ? 'text-[#c99e70]' : 'text-gray-400'}`} />
//                   </div>
//                   <textarea
//                     name="message"
//                     placeholder="Tell us about your architectural vision, project requirements, budget range, and timeline*"
//                     value={formData.message}
//                     onChange={handleChange}
//                     onFocus={() => handleFocus('message')}
//                     onBlur={handleBlur}
//                     rows={4}
//                     className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 resize-none hover:border-gray-300"
//                   />
//                   <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     Share your dreams - residential, commercial, or innovative spaces
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="pt-6">
//                   <button
//                     type="submit"
//                     className="w-full bg-[#c99e70] hover:bg-[#b8916a] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
//                   >
//                     <span className="relative z-10 flex items-center justify-center space-x-2">
//                       <Building className="w-5 h-5" />
//                       <span>START BUILDING TOGETHER</span>
//                     </span>
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                   </button>
//                   <p className="text-xs text-gray-500 text-center mt-3">
//                     We typically respond within 24 hours with initial concepts
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;

import React, { useState } from 'react';
import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, User, Building, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  return (
    <div className="min-h-screen bg-gray-200 relative overflow-hidden">
      {/* Decorative background elements - responsive sizes */}
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-gray-300 opacity-100 transform translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12 lg:translate-x-16 lg:translate-y-16"></div>
      <div className="absolute top-10 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 opacity-100 transform -translate-x-4 -translate-y-4 sm:-translate-x-6 sm:-translate-y-6 lg:-translate-x-8 lg:-translate-y-8"></div>
      {/* Header */}
      <div className="text-center py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#c99e70] mb-2"> 
          Contact us
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Section - Company Info */}
          <div className="space-y-8">
            <div>
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight relative z-10">
                  <span className="block mb-2 text-gray-700 font-light italic text-lg sm:text-xl md:text-2xl">
                    "Architecture is a visual art, and the buildings speak for themselves."
                  </span>
                  <span className="block text-gray-800 font-bold">
                    We don't just design structures;{' '}
                  </span>
                  <span className="text-[#c99e70] font-extrabold bg-gradient-to-r from-[#c99e70] to-[#d4a876] bg-clip-text text-transparent">
                    we craft legacies
                  </span>
                  <br />
                  <span className="text-gray-600 font-medium text-xl sm:text-2xl md:text-3xl mt-2 block">
                    that inspire generations.
                  </span>
                </h2>
                {/* Decorative line element */}
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#c99e70] to-transparent opacity-60"></div>
                {/* Decorative quote mark */}
                <div className="absolute -top-2 -left-2 text-[#c99e70] text-6xl opacity-20 font-serif">"</div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg">
                <Twitter className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#c99e70] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <p className="text-base sm:text-lg mb-6">
                  Our team is ready to help you bring your ideas to life.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
                  <Phone className="w-5 h-5 text-[#c99e70]" />
                  <span className="text-base sm:text-lg">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center space-x-3 hover:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
                  <Mail className="w-5 h-5 text-[#c99e70]" />
                  <span className="text-base sm:text-lg">contact@example.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c99e70] to-transparent opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-800 to-transparent opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
                Start a conversation with us
              </h3>
              <p className="text-gray-600 text-center mb-8 text-sm sm:text-base">
                Let's discuss your architectural vision and transform it into reality
              </p>
              
              <div className="space-y-8">
                {/* Name Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300">
                    <User className={`w-5 h-5 ${focusedField === 'name' || formData.name ? 'text-[#c99e70]' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name*"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
                  />
                  <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Tell us who we'll be working with on this architectural journey
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300">
                    <Mail className={`w-5 h-5 ${focusedField === 'email' || formData.email ? 'text-[#c99e70]' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
                  />
                  <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    We'll send you project updates and design inspirations
                  </div>
                </div>

                {/* Phone Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300">
                    <Phone className={`w-5 h-5 ${focusedField === 'phone' || formData.phone ? 'text-[#c99e70]' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number*"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
                  />
                  <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    For quick consultations and site visit coordination
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-6 transition-all duration-300">
                    <MessageSquare className={`w-5 h-5 ${focusedField === 'message' || formData.message ? 'text-[#c99e70]' : 'text-gray-400'}`} />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your architectural vision, project requirements, budget range, and timeline*"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 border-b-2 border-gray-200 focus:border-[#c99e70] outline-none bg-transparent text-gray-700 placeholder-gray-500 transition-all duration-300 resize-none hover:border-gray-300"
                  />
                  <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Share your dreams - residential, commercial, or innovative spaces
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#c99e70] hover:bg-[#b8916a] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Building className="w-5 h-5" />
                      <span>START BUILDING TOGETHER</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    We typically respond within 24 hours with initial concepts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;