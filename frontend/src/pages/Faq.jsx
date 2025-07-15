import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${API_URL}/faqs`);
        const sortedFaqs = [...res.data].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setFaqs(sortedFaqs);
      } catch (err) {
        setFaqs([]);
      }
    };
    fetchFaqs();
  }, []);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="min-h-screen pt-8 pb-16 px-4 bg-gray-200 relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute bottom-40 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-gray-300 opacity-100 translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12 lg:translate-x-16 lg:translate-y-16"></div>
      <div className="absolute top-10 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 opacity-100 -translate-x-4 -translate-y-4 sm:-translate-x-6 sm:-translate-y-6 lg:-translate-x-8 lg:-translate-y-8"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Centered Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-800">
            Frequently
            <br />
            <span className="text-[#a77744]">asked questions</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-start">
          {/* FAQ List */}
          <div>
            <div className="flex flex-col gap-4">
              {faqs.map((faq, idx) => (
                <div
                  key={faq._id}
                  className={`border rounded-xl transition-all duration-300 p-6 ${
                    openIndex === idx
                      ? "bg-white border-[#c99e70] shadow-lg"
                      : "bg-white border-gray-200 hover:border-[#c99e70]"
                  }`}
                >
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => handleToggle(idx)}
                    aria-expanded={openIndex === idx}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        openIndex === idx ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>
                  {openIndex === idx && (
                    <div
                      id={`faq-answer-${idx}`}
                      className="mt-4 text-gray-600 text-base animate-fade-in"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sticky CTA */}
          <div className="sticky top-64 self-start bg-white border border-gray-200 p-6 md:p-8 rounded-xl shadow-xl">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#c99e70] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Do you have more questions?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We're here to help you bring your architectural ideas to life
                with clarity and creativity.
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => navigate("/contact")}
                  className="bg-gradient-to-r from-[#c99e70] to-[#d4a876] hover:from-[#b8916a] hover:to-[#cfa46d] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
                >
                  Shoot a Direct Mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default FAQs;
