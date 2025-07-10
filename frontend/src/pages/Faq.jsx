import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

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
    <section className="min-h-screen bg-white flex items-center justify-center py-24 px-4">
      <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Side: Title & Description */}
        <div className="lg:w-2/5 flex flex-col justify-center">
          <div className="bg-white rounded-2xl p-6">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Frequently asked questions
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
              Frequently asked{" "}
              <span className="text-purple-600">questions</span>
            </h2>
            <p className="text-gray-500 text-base">
              Choose a plan that fits your business needs and budget. No hidden
              fees, no surprises—just straightforward pricing for powerful
              financial management.
            </p>
          </div>
        </div>

        {/* Right Side: FAQ List */}
        <div className="lg:w-3/5 flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq._id}
              className={`bg-white border rounded-xl transition-all duration-300 ${
                openIndex === idx
                  ? "border-purple-200 shadow-md"
                  : "border-gray-200 hover:border-purple-200"
              }`}
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                onClick={() => handleToggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openIndex === idx
                      ? "rotate-180 bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.169l3.71-3.938a.75.75 0 011.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>

              {openIndex === idx && (
                <div
                  id={`faq-answer-${idx}`}
                  className="px-6 pb-6 pt-2 text-gray-600 text-base leading-relaxed animate-fade-in"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Animation for fade-in effect */}
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
