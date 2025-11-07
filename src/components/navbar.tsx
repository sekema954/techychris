import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo2.png';
import { useLocation } from 'react-router-dom';
import { Socials } from '../constants/socials';
import { useEffect, useState, useRef } from 'react';
import { Banner } from './Banner';

const Navbar = () => {
  const location = useLocation();
  const [isFixed, setFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
  const socialDropdownRef = useRef<HTMLDivElement>(null);

  const visibleSocialCount = 2;
  const visibleSocials = Socials.slice(0, visibleSocialCount);
  const hiddenSocials = Socials.slice(visibleSocialCount);

  // Sticky navbar on scroll
  useEffect(() => {
    const handleFixedNavbar = () => {
      setFixed(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleFixedNavbar);
    return () => window.removeEventListener('scroll', handleFixedNavbar);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(e.target as Node)) {
        setSocialDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'Services', path: '/services' },
    { id: 3, title: 'Blog', path: '/blog' },
    { id: 4, title: 'Videos', path: '/videos' },
    { id:5, title:"Courses", path:'/courses'},
  ];

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="relative z-[1000]">
      {/* Top Banner */}
      <div className="bg-black text-white">
        <Banner />
      </div>

      {/* Navbar */}
      <nav
        className={`transition-all duration-300 flex items-center justify-between text-white px-5 lg:px-10 h-[80px] bg-[#171723] ${
          isFixed ? 'fixed top-0 left-0 w-full shadow-md backdrop-blur-md' : 'relative'
        }`}
      >
        {/* Logo */}
        <a href="/" aria-label="techychris logo">
          <img
            src={logo}
            alt="TechyChris Logo"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-10 items-center">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={nav.path}
                className={`transition-colors ${
                  location.pathname === nav.path ? 'text-[#847FAD]' : 'hover:text-[#847FAD]'
                }`}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Visible Social Icons */}
          {visibleSocials.map((icon) => (
            <a
              key={icon.id}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full w-[40px] h-[40px] flex items-center justify-center border border-gray-500 transition-all hover:scale-110"
              style={{ backgroundColor: icon.backgroundColor }}
              aria-label={icon.title}
            >
              <FontAwesomeIcon icon={icon.icon} />
            </a>
          ))}

          {/* Dropdown for Hidden Socials */}
          {hiddenSocials.length > 0 && (
            <div className="relative" ref={socialDropdownRef}>
              <button
                onClick={() => setSocialDropdownOpen(!socialDropdownOpen)}
                className="w-[40px] h-[40px] rounded-full border border-gray-500 flex items-center justify-center hover:bg-[#847FAD]/20"
                aria-label="Show more socials"
              >
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className={`transition-transform ${
                    socialDropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>

              <div
                className={`absolute top-full right-0 mt-3 w-[60px] bg-[#252535] rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
                  socialDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                {hiddenSocials.map((icon) => (
                  <a
                    key={icon.id}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full w-[40px] h-[40px] flex items-center justify-center border border-gray-500 m-2 hover:scale-110 transition-all"
                    style={{ backgroundColor: icon.backgroundColor }}
                    onClick={() => setSocialDropdownOpen(false)}
                  >
                    <FontAwesomeIcon icon={icon.icon} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Contact Button */}
          <a target='_blank' aria-label='techy chris contact ' href="https://docs.google.com/forms/d/e/1FAIpQLSdcdfZ7zEQgINwQl3mK1hJ0sbmzaalU-I9YrjkItsBzcryD_Q/viewform">
            <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all">
              Contact
            </button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1 z-[1001]"
          aria-label="Menu"
        >
          <div className="flex flex-col justify-between w-6 h-6">
            {[1, 2, 3].map((id) => {
              let classes = 'w-6 h-[2px] bg-white transition-all duration-300';
              
              if (menuOpen) {
                if (id === 1) classes += ' rotate-45 translate-y-[14px]';
                if (id === 2) classes += ' scale-0';
                if (id === 3) classes += ' -rotate-45 -translate-y-2';
              }

              return <span key={id} className={classes}></span>;
            })}
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-[80px] left-0 w-full bg-[#171723] flex flex-col gap-6 px-5 py-6 lg:hidden transition-all duration-500 ease-in-out ${
            menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
          }`}
        >
          {navLinks.map((nav) => (
            <a
              key={nav.id}
              href={nav.path}
              className={`text-lg transition-colors ${
                location.pathname === nav.path ? 'text-[#847FAD]' : 'text-white hover:text-[#847FAD]'
              }`}
              onClick={handleNavClick}
            >
              {nav.title}
            </a>
          ))}

          <div className="flex gap-4 mt-4">
            {Socials.map((icon) => (
              <a
                key={icon.id}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full w-[35px] h-[35px] flex items-center justify-center border border-gray-500 hover:scale-110 transition-all"
                style={{ backgroundColor: icon.backgroundColor }}
              >
                <FontAwesomeIcon icon={icon.icon} />
              </a>
            ))}
          </div>

          <a href="/contact" className="mt-4">
            <button className="w-full border border-white px-5 py-2 rounded-lg hover:bg-[#847FAD] transition-all">
              Contact
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
