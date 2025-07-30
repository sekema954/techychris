import { Wallpoet } from "../constants/fonts";
import Divider from "./divider";
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#3E3A59] text-white px-6 lg:px-3 relative">
      <Divider />
      
      {/* Top Grid */}
{/* Top Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 py-10 px-6 border-b border-[#847FAD] bg-[#171723]">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 sm:mb-0">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full bg-white" />
        </div>

        {/* About */}
        <div className="mb-6 sm:mb-0">
          <h4 className="text-lg font-semibold mb-2">ABOUT</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="mb-6 sm:mb-0">
          <h4 className="text-lg font-semibold mb-2">RESOURCES</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/videos">Videos</a></li>
            <li><a href="/blogs">Blogs</a></li>
          </ul>
        </div>

        {/* Social Networks */}
        <div className="mb-6 sm:mb-0">
          <h4 className="text-lg font-semibold mb-2">SOCIAL NETWORKS</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="https://www.youtube.com/channel/UCiCUVCHgNYouG-31lXZRjQA">YouTube</a></li>
            <li><a href="https://www.linkedin.com/in/chris-quashie-b74299264">LinkedIn</a></li>
            <li><a href="https://www.tiktok.com/@_mbame">TikTok</a></li>
          </ul>
        </div>

        {/* Call to Action */}
        <div>
          <h4 className="text-lg font-semibold mb-2">BECOME BETTER AT IT</h4>
          <p className="text-sm text-gray-300 mb-3">
            Get started with a career in IT with courses from TechyChris
          </p>
          <a href="/courses">
            <button className="bg-[#A058B1] text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition flex items-center gap-1">
              Start Learning <span className="text-lg"><FontAwesomeIcon icon={faArrowRight} /></span>
            </button>
          </a>
        </div>
      </div>

      {/* Branding */}
      <div style={{...Wallpoet}} className="lg:text-[60px] px-6 text-white bg-[#171723] text-center py-6 sm:text-[48px]">
        TechyChris
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#171723] mt-4 flex justify-between items-center text-sm text-gray-400 py-7 px-6 flex-wrap gap-2">
        <a href="/terms_conditions">
          <span>Terms and conditions.</span>
        </a>
        <span>Copyright 2025 © TechyChris. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
