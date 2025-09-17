import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";

import ContactPage from "./pages/Contact";
import Project from "./components/Project";
import FormPage from "./components/FormPage";
import Cservices from "./components/C_services";
import Interior from "./pages/Interior";
import Exterior from "./pages/Exterior";
import Design from "./pages/Design";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";
import Dashboard from "./pages/Dashboard";
import FAQs from "./pages/Faq";

import AdminBlog from "./Dashboard/AdminBlog";
import CreateBlog from "./Dashboard/CreateBlog";
import EditBlog from "./Dashboard/EditBlog";
import AdminProject from "./Dashboard/AdminProject";
import CreateProject from "./Dashboard/CreateProject";
import EditProject from "./Dashboard/EditProject";
import AdminFAQ from "./Dashboard/AdminFAQ";
import CreateFAQ from "./Dashboard/CreateFAQ";
import EditFAQ from "./Dashboard/EditFAQ";

// Import scroll handler and your existing ProtectedRoute
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./layout/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/interior" element={<Interior />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/ProjectDetails" element={<ProjectDetails />} />
        <Route path="/exterior" element={<Exterior />} />
        <Route path="/designs" element={<Design />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/services" element={<Cservices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/faqs" element={<FAQs />} />

        {/* Protected Dashboard Routes - All under one ProtectedRoute */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<AdminBlog />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="blogs/edit/:id" element={<EditBlog />} />
          <Route path="projects" element={<AdminProject />} />
          <Route path="projects/create" element={<CreateProject />} />
          <Route path="projects/edit/:id" element={<EditProject />} />
          <Route path="faqs" element={<AdminFAQ />} />
          <Route path="faqs/create" element={<CreateFAQ />} />
          <Route path="faqs/edit/:id" element={<EditFAQ />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
