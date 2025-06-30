import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gray-300  opacity-100 "></div>
      {/* <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gray-300 opacity-100"></div> */}

      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Form container */}
              <div className="w-full lg:w-1/2 p-8 sm:p-10">
                <div className="mb-8 text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 uppercase mb-3 tracking-tight">
                    CONTACT US
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Get in touch with us and we'll collaborate to turn your vision into reality.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b39069] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b39069] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Your email"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b39069] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b39069] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      placeholder="Type your message..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 text-sm sm:text-base border border-transparent rounded-lg font-medium text-white bg-[#b39069] hover:bg-[#9a7b55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b39069] transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      LET'S TALK
                    </button>
                  </div>
                </form>
              </div>

              {/* Decorative right side */}
              <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-[#f5f0e8] to-[#e8ddd1] relative">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#b39069]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Let's Build Something Amazing</h3>
                    <p className="text-gray-600 mb-6">Our team is ready to help you bring your ideas to life.</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b39069]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-700">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#b39069]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">contact@example.com</span>
                      </div>
                    </div>
                  </div>
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