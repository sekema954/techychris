import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserCircle } from 'lucide-react';
import { faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo2.png';
import { useLocation } from 'react-router-dom';
import { Socials } from '../constants/socials';
import { useEffect, useState, useRef } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isFixed, setFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const socialDropdownRef = useRef<HTMLDivElement>(null);

  // Append Discord icon correctly
  const socialsWithDiscord = [
    ...Socials,
    {
      id: 'discord',
      title: 'Discord',
      icon: faDiscord,
      link: 'https://discord.gg/QgjVAsbQCH',
      backgroundColor: '#7289DA',
    },
    {
      id:'instagram',
      title:'Instagram',
      icon:faInstagram,
      link:'https://www.instagram.com/techychriss?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      backgroundColor: '#fa7e1e '

    }
  ];

  const visibleSocialCount = 2;
  const visibleSocials = socialsWithDiscord.slice(0, visibleSocialCount);
  const hiddenSocials = socialsWithDiscord.slice(visibleSocialCount);

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleFixedNavbar = () => {
      setFixed(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleFixedNavbar);
    return () => window.removeEventListener("scroll", handleFixedNavbar);
  }, []);

  // Close dropdowns if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(event.target as Node)) {
        setSocialDropdownOpen(false);
      }
    };

    if (profileOpen || socialDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen, socialDropdownOpen]);

  const navLinks = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'About', path: '/about' },
    { id: 3, title: 'Blog', path: '/blog' },
    { id: 4, title: 'Videos', path: '/videos' },
  ];

  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className={`h-[100px] flex items-center justify-between bg-[#171723] text-white lg:px-10 px-5 ${isFixed ? 'fixed w-full z-[1000]' : ''}`}>
      {/* Left: Logo */}
      <div>
        <img
          className="w-[70px] h-[60px] rounded-full"
          src={logo}
          alt="TechyChris Logo Icon"
          aria-label="TechyChris Logo Icon"
        />
      </div>

      {/* Center: Nav links */}
      <ul className="hidden lg:flex gap-10">
        {navLinks.map((nav) => (
          <li key={nav.id}>
            <a
              href={nav.path}
              className={`${location.pathname === nav.path ? 'text-[#847FAD]' : 'text-white'}`}
            >
              {nav.title}
            </a>
          </li>
        ))}
      </ul>

      {/* Right: Socials + CTA + Profile */}
      <div className="lg:flex hidden items-center justify-center gap-6">
        <div className="flex items-center gap-6">
          {/* Visible Social Icons */}
          {visibleSocials.map((icon) => (
            <a
              key={icon.id}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: icon.backgroundColor }}
              className="rounded-full w-[40px] h-[40px] flex items-center justify-center border transition-all duration-[1s] ease-in-out hover:scale-[1.1]"
              aria-label={icon.title}
            >
              <FontAwesomeIcon icon={icon.icon} />
            </a>
          ))}

          {/* Caret Button + Dropdown */}
          {hiddenSocials.length > 0 && (
            <div className="relative" ref={socialDropdownRef}>
              <button
                onClick={() => setSocialDropdownOpen(!socialDropdownOpen)}
                className="text-white hover:text-[#847FAD] transition-colors duration-300 flex items-center justify-center w-[40px] h-[40px] border rounded-full"
                aria-label="Show more socials"
                type="button"
              >
                <FontAwesomeIcon
                  icon={faCaretDown}
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: socialDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                className={`absolute top-full right-0 mt-6 w-[60px] bg-[#252535] rounded-md shadow-lg flex flex-col items-center overflow-hidden
                  transition-all duration-300 ease-in-out
                  ${socialDropdownOpen ? 'max-h-60 opacity-100 scale-100 pointer-events-auto' : 'max-h-0 opacity-0 scale-95 pointer-events-none'}
                `}
                style={{ zIndex: 1100 }}
              >
                {hiddenSocials.map((icon) => (
                  <a
                    key={icon.id}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: icon.backgroundColor }}
                    className="rounded-full w-[40px] h-[40px] flex items-center justify-center border m-1 hover:scale-[1.1] transition-transform duration-300"
                    aria-label={icon.title}
                    onClick={() => setSocialDropdownOpen(false)}
                  >
                    <FontAwesomeIcon icon={icon.icon} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Button */}
        <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 hover:border-none transition-all duration-[1.5s] ml-6">
          Contact
        </button>

        {/* Profile Dropdown */}
        <div className="relative ml-6 z-[9999]" ref={profileRef}>
          <button
            aria-label="Profile Menu"
            onClick={() => setProfileOpen(!profileOpen)}
            className="text-white hover:text-[#847FAD] transition-colors duration-300 text-3xl"
            type="button"
          >
            <UserCircle size={32} />
          </button>

          <div
            className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-[#252535] ring-1 ring-black ring-opacity-5
              transform transition-all duration-300 ease-in-out
              ${profileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}
          >
            <div className="py-2 flex flex-col">
              <a
                href="admin/register"
                className="block px-4 py-2 text-sm text-white hover:bg-[#847FAD] transition-colors"
                onClick={() => setProfileOpen(false)}
              >
                Register
              </a>
              <a
                href="admin/login"
                className="block px-4 py-2 text-sm text-white hover:bg-[#847FAD] transition-colors"
                onClick={() => setProfileOpen(false)}
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Button (Mobile) */}
      <div
        className="flex lg:hidden flex-col gap-2 cursor-pointer z-[1001]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {[1, 2, 3].map((id) => (
          <div key={id} className="w-7 h-0.5 bg-white"></div>
        ))}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-[#171723] flex flex-col gap-6 px-5 py-6 lg:hidden z-[1000]">
          {navLinks.map((nav) => (
            <a
              key={nav.id}
              href={nav.path}
              className={`${location.pathname === nav.path ? 'text-[#847FAD]' : 'text-white'} text-lg`}
              onClick={handleNavClick}
            >
              {nav.title}
            </a>
          ))}
          <div className="flex gap-5 mt-4">
            {socialsWithDiscord.map((icon) => (
              <a
                key={icon.id}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: icon.backgroundColor }}
                className="rounded-full w-[35px] h-[35px] flex items-center justify-center border hover:scale-110 transition-all"
                aria-label={icon.title}
              >
                <FontAwesomeIcon icon={icon.icon} />
              </a>
            ))}
          </div>
          <button className="mt-4 w-full border border-white px-5 py-2 rounded-lg hover:bg-[#847FAD] transition-all">
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
