import React, { useEffect, useState } from 'react';
import ContactImage from '../assets/CONT.webp';

const ContactPage = () => {
  const [rotation, setRotation] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const animateO = () => {
      setRotation(prev => (prev + 1) % 360);
      requestAnimationFrame(animateO);
    };

    const animationId = requestAnimationFrame(animateO);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000'}/api/contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        setStatus('Message sent!');
        setForm({
          name: '',
          companyName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setStatus(data.message || 'Failed to send.');
      }
    } catch {
      setStatus('Failed to send.');
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-start items-center relative">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center absolute z-0"
        style={{ backgroundImage: `url(${ContactImage})` }}
      />

      {/* Contact Form Panel */}
      <div className="bg-[#eeecec] w-[calc(35rem)] #1E1E1E p-10 flex flex-col justify-between shadow-xl z-10 ml-[2.5cm] mt-[2cm] mb-[1cm]">
        <div>
          <h1 className="text-4xl font-sans mb-4">CONTACT US</h1>
          <p className="mb-8 font-sans ">
            Get in touch with us and we'll collaborate to turn your vision into reality.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border border-black p-2"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
           
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-black p-2"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-black p-2"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                name="message"
                className="w-full border border-black p-2 h-32"
                placeholder="Type your message..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-50 h-12 bg-[#b39069] text-black py-3 px-6 hover:bg-black hover:text-white"
            >
              LET'S TALK
            </button>
            {status && (
              <div className="mt-2 text-sm text-center text-gray-700">{status}</div>
            )}
          </form>
        </div>

        {/* Logo Section */}
        <div className="mt-12">
          <div className="flex flex-col justify-end items-start">
            <div className="text-7xl font-extrabold leading-none">JK</div>
            <div className="text-8xl font-extrabold tracking-wider flex items-center">
              <span className="mr-1">W</span>
              {/* Animated "O" */}
              <div className="relative inline-flex items-center justify-center mx-2">
                <div className="w-16 h-16 border-[6px] border-black rounded-full flex items-center justify-center">
                  <div
                    className="w-10 h-10 border-[6px] border-black rounded-full"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  ></div>
                </div>
              </div>
              <span>RKS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;