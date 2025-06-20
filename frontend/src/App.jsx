import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import Letstalk from './components/Letstalk';
import ContactPage from './pages/Contact';
import Project from './components/Project';
import Interior from './pages/Interior';
import Exterior from './pages/Exterior';
import Design from './pages/Design';
import About_com from './components/About_com';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// New Admin Pages
import AdminBlog from './Dashboard/AdminBlog';
import CreateBlog from './Dashboard/CreateBlog';
import EditBlog from './Dashboard/EditBlog';
import AdminProject from './Dashboard/AdminProject';
import CreateProject from './Dashboard/CreateProject';
import EditProject from './Dashboard/EditProject';

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
        <Route path="/about_com" element={<About_com />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard & Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/blogs" element={<AdminBlog />} />
        <Route path="/dashboard/blogs/create" element={<CreateBlog />} />
        <Route path="/dashboard/blogs/edit/:id" element={<EditBlog />} />
        <Route path="/dashboard/projects" element={<AdminProject />} />
        <Route path="/dashboard/projects/create" element={<CreateProject />} />
        <Route path="/dashboard/projects/edit/:id" element={<EditProject />} />

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
