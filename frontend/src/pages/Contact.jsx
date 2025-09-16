import React, {  useState } from "react";
import { Phone, Mail, User, Building, MessageCircle, Send } from "lucide-react";
import CONT from '../assets/CONT.webp'; // Import the local background image
// import React, { useEffect, useState } from "react";
import ContactImage from "../assets/CONT.webp";
import api from "../services/api";

const ContactPage = () => {
  // const [rotation, setRotation] = useState(0);
  const [form, setForm] = useState({
    name: "",
    companyName: "", // ✅ Added companyName
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // useEffect(() => {
  //   const animateO = () => {
  //     setRotation((prev) => (prev + 1) % 360);
  //     requestAnimationFrame(animateO);
  //   };

  //   const animationId = requestAnimationFrame(animateO);
  //   return () => cancelAnimationFrame(animationId);
  // }, []);
  // useEffect(() => {
  //   const animateO = () => {
  //     setRotation((prev) => (prev + 1) % 360);
  //     requestAnimationFrame(animateO);
  //   };
   

    
  //   const animationId = requestAnimationFrame(animateO);
  //   return () => cancelAnimationFrame(animationId);
  // }, []);

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

  return (
    <div className="flex min-h-screen w-full justify-center md:justify-start items-center relative px-4 sm:px-6">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center absolute z-0"
        style={{ backgroundImage: `url(${ContactImage})` }}
      />

      {/* Contact Form Panel */}
      <div className="bg-[#eeecec] w-[calc(35rem)] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl z-10 mt-16 mb-8 md:ml-[2.5cm]">
        <div>
          <h1 className="text-3xl md:text-4xl font-sans mb-4">CONTACT US</h1>
          <p className="mb-8 font-sans text-sm md:text-base">
            Get in touch with us and we'll collaborate to turn your vision into
            reality.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm">Name</label>
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
              <label className="block mb-2 text-sm">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="w-full border border-black p-2"
                value={form.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Email</label>
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
              <label className="block mb-2 text-sm">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-black p-2"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Message</label>
              <textarea
                name="message"
                className="w-full border border-black p-2 h-32"
                placeholder="Type your message..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Button + Logo */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-6">
              <button
                type="submit"
                className="w-full md:w-auto h-12 bg-[#b39069] text-black py-3 px-6 hover:bg-black hover:text-white transition-colors"
              >
                LET'S TALK
              </button>

              <div className="hidden md:flex flex-col items-center md:items-end">
                <div className="text-4xl font-extrabold leading-none mb-1">JK</div>
                <div className="flex items-center">
                  <span className="text-5xl font-extrabold tracking-wider">W</span>
                  <div className="relative inline-flex items-center justify-center mx-2">
                    <div className="w-12 h-12 border-[6px] border-black rounded-full flex items-center justify-center">
                      <div
                        className="w-6 h-6 border-[6px] border-black rounded-full"
                        // style={{ transform: `rotate(${rotation}deg)` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-5xl font-extrabold tracking-wider">RKS</span>
                </div>
              </div>
            </div>

            <div className="mt-10 md:hidden flex flex-col items-start">
              <div className="flex flex-col">
                <div className="flex items-center relative">
                  <div className="absolute left-0 top-[-2.2rem]">
                    <span className="text-3xl font-extrabold">JK</span>
                  </div>
                  <span className="text-4xl font-extrabold tracking-wider">W</span>
                  <div className="relative inline-flex items-center justify-center mx-2">
                    <div className="w-10 h-10 border-[4px] border-black rounded-full flex items-center justify-center">
                      <div
                        className="w-5 h-5 border-[4px] border-black rounded-full"
                        // style={{ transform: `rotate(${rotation}deg)` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-4xl font-extrabold tracking-wider">RKS</span>
                </div>
              </div>
            </div>

            {status && (
              <div className="mt-2 text-sm text-center text-gray-700">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
