import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/images/logo.png';
import { useLocation } from 'react-router-dom';
import { Socials } from '../constants/socials';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isFixed, setFixed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFixedNavbar = () => {
    if (scrollY > 100) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleFixedNavbar);
    return () => {
      window.removeEventListener("scroll", handleFixedNavbar);
    };
  }, []);

  const navLinks = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'About', path: '/about' },
    { id: 3, title: 'Blog', path: '/blog' },
    { id: 4, title: 'Videos', path: '/videos' },
    { id: 5, title: 'Courses', path: '/courses' },
    { id: 6, title: 'Shop', path: '/shop' },
  ];

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`h-[100px] flex items-center justify-between bg-[#171723] text-white lg:px-10 px-5 ${isFixed ? 'fixed w-full z-[1000]' : ''}`}>
      {/* Left: Logo */}
      <div>
        <img className='w-[40px] h-[40px] rounded-full' src={logo} alt='TechyChris Logo Icon' aria-label='TechyChris Logo Icon' />
      </div>

      {/* Center: Nav links */}
      <ul className='hidden lg:flex gap-10'>
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

      {/* Right: Socials + CTA */}
      <div className='lg:flex hidden items-center justify-center gap-20'>
        <div className='flex gap-10'>
          {Socials.map((icon) => (
            <a
              key={icon.id}
              href={icon.link}
              target='_blank'
              style={{ backgroundColor: `${icon.backgroundColor}` }}
              className='rounded-full w-[40px] h-[40px] flex items-center justify-center border transition-all duration-[1s] ease-in-out hover:scale-[1.1]'
            >
              <FontAwesomeIcon icon={icon.icon} aria-label={icon.title} />
            </a>
          ))}
        </div>
        <div>
          <button className='border border-white px-5 py-2 rounded-lg hover:bg-[#847FAD] hover:border-none transition-all duration-[1.5s]'>
            Contact
          </button>
        </div>
      </div>

      {/* Hamburger Button (Mobile) */}
      <div className='flex lg:hidden flex-col gap-2 cursor-pointer z-[1001]' onClick={() => setMenuOpen(!menuOpen)}>
        {[1, 2, 3].map((id) => (
          <div key={id} className='w-7 h-0.5 bg-white'></div>
        ))}
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className='absolute top-[100px] left-0 w-full bg-[#171723] flex flex-col gap-6 px-5 py-6 lg:hidden z-[1000]'>
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
          <div className='flex gap-5 mt-4'>
            {Socials.map((icon) => (
              <a
                key={icon.id}
                href={icon.link}
                target='_blank'
                style={{ backgroundColor: `${icon.backgroundColor}` }}
                className='rounded-full w-[35px] h-[35px] flex items-center justify-center border hover:scale-110 transition-all'
              >
                <FontAwesomeIcon icon={icon.icon} aria-label={icon.title} />
              </a>
            ))}
          </div>
          <button className='mt-4 w-full border border-white px-5 py-2 rounded-lg hover:bg-[#847FAD] transition-all'>
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
