import { useState } from 'react';
import { createFAQ } from '../services/faqService';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const CreateFAQ = () => {
  const [form, setForm] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await createFAQ(form);
    setLoading(false);
    navigate('/dashboard/faqs');
  };

  const handleSidebarNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-900">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 shadow z-20">
        <h1 className="text-xl font-bold text-white">Create FAQ</h1>
        <button
          className="text-white focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open sidebar"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`
          fixed inset-0 z-30 transition-transform duration-300 md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block h-full w-72 flex-shrink-0 bg-slate-900
        `}
        style={{ maxWidth: "18rem" }}
      >
        <div className="h-full overflow-y-auto">
          <AdminSidebar onNavigate={handleSidebarNavigate} onLogout={() => navigate('/login')} />
        </div>
      </div>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-4 md:p-8">
        <div className="max-w-xl mx-auto bg-slate-800/90 p-8 rounded-2xl shadow-2xl min-h-[80vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Create FAQ</h2>
            <button
              onClick={() => navigate('/dashboard/faqs')}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Back
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-200">Question</label>
              <input
                type="text"
                name="question"
                value={form.question}
                onChange={handleChange}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-200">Answer</label>
              <textarea
                name="answer"
                value={form.answer}
                onChange={handleChange}
                className="w-full border border-slate-700 rounded-lg px-4 py-2 bg-slate-900 text-white"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-purple-700 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create FAQ"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateFAQ;