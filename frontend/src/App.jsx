import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Letstalk from './components/Letstalk';
import ContactPage from './pages/Contact'; 
import Project from './components/Project';
import FormPage  from './components/FormPage';
import Interior from './pages/Interior';
import Exterior from './pages/Exterior';
import Design from './pages/Design';
// import About_com from './components/About_com';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import Login from './pages/Login';
import MyCourses from './pages/MyCourses';
import Dashboard from './pages/Dashboard';
import FAQs from './pages/Faq';

// New Admin Pages
import AdminBlog from './Dashboard/AdminBlog';
import CreateBlog from './Dashboard/CreateBlog';
import EditBlog from './Dashboard/EditBlog';
import AdminProject from './Dashboard/AdminProject';
import CreateProject from './Dashboard/CreateProject';
import EditProject from './Dashboard/EditProject';
import AdminFAQ from './Dashboard/AdminFAQ';
import CreateFAQ from './Dashboard/CreateFAQ';
import EditFAQ from './Dashboard/EditFAQ';

function AppContent() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/letstalk" element={<Letstalk />} />
        <Route path="/interior" element={<Interior />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/ProjectDetails" element={<ProjectDetails />} />
        <Route path="/exterior" element={<Exterior />} />
        <Route path="/designs" element={<Design />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/form" element={<FormPage />} />
        {/* <Route path="/about_com" element={<About_com />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/faqs" element={<FAQs />} />

        {/* Dashboard & Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/blogs" element={<AdminBlog />} />
        <Route path="/dashboard/blogs/create" element={<CreateBlog />} />
        <Route path="/dashboard/blogs/edit/:id" element={<EditBlog />} />
        <Route path="/dashboard/projects" element={<AdminProject />} />
        <Route path="/dashboard/projects/create" element={<CreateProject />} />
        <Route path="/dashboard/projects/edit/:id" element={<EditProject />} />
        <Route path="/dashboard/faqs" element={<AdminFAQ />} />
        <Route path="/dashboard/faqs/create" element={<CreateFAQ />} />
        <Route path="/dashboard/faqs/edit/:id" element={<EditFAQ />} />

        <Route path="*" element={<Login />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
