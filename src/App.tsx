import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import PageNotFound from './pages/404';
import CommingSoon from './pages/comingSoon';
import Navbar from './components/navbar';
import Footer from './components/footer';
import BlogDetail from './pages/blogDetail';
import BlogHome from './pages/Blog';
import YoutubeVideos from './pages/videos';
import CoursePage from './pages/courses';
import ShopPage from './pages/shop';
import AboutPage from './pages/about';
import Privacy_Policy from './resources/privacy';
import Terms_Conditions from './resources/terms_conditions';
import AdminDashboard from './admin/dashbaord';
import AdminRegister from './admin/authentication/register';
import AdminLogin from './admin/authentication/login';
import PrivateRouter from '../backend/routes/admin/privateroute'

import { useEffect } from 'react';

const Layout = ({ children }:any) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    window.scrollTo(0, 0); // optional: scroll to top on route change
  }, [location.pathname]);

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/comming_soon" element={<CommingSoon />} />
          <Route path="/blogDetails/:id" element={<BlogDetail />} />
          <Route path="/blog" element={<BlogHome />} />
          <Route path="/videos" element={<YoutubeVideos />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<Privacy_Policy />} />
          <Route path="/terms_conditions" element={<Terms_Conditions />} />

          {/** Protected Routes */}
          <Route path="/admin/dashboard" element={<PrivateRouter><AdminDashboard /></PrivateRouter>} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
