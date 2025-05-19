import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check login status
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'
    }`}>
      <nav className="w-full px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <span className="text-indigo-600 text-2xl font-bold tracking-tight group-hover:opacity-90 transition-opacity">भाषामित्र</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></div>
          </div>
          <span className="text-gray-700 text-sm font-medium">Bhashamitra</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <button 
            onClick={() => scrollToSection('features')}
            className={`text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-md ${
              location.hash === '#features' 
                ? 'text-indigo-700 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-50/50'
            }`}
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('benefits')}
            className={`text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-md ${
              location.hash === '#benefits' 
                ? 'text-indigo-700 bg-indigo-50' 
                : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-50/50'
            }`}
          >
            Benefits
          </button>
          <Link to="/about" className={`text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-md ${
            isActive('/about') 
              ? 'text-indigo-700 bg-indigo-50' 
              : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-50/50'
          }`}>
            About
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/languages" className={`text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-md ${
                isActive('/languages') 
                  ? 'text-indigo-700 bg-indigo-50' 
                  : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-50/50'
              }`}>
                Languages
              </Link>
              <Link to="/dashboard" className={`text-sm font-medium transition-colors duration-200 px-2 py-1 rounded-md ${
                isActive('/dashboard') 
                  ? 'text-indigo-700 bg-indigo-50' 
                  : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-50/50'
              }`}>
                Dashboard
              </Link>
            </>
          )}
        </div>
        
        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium text-sm">
                  {/* User initial placeholder */}
                  U
                </div>
                <span className="text-sm font-medium text-gray-700">User</span>
              </div>
              <Button 
                onClick={handleLogout} 
                className="bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 rounded-full px-4 transition-colors duration-300"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button className="bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 rounded-full px-6 transition-colors duration-300">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 shadow-sm hover:shadow transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center p-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg 
            className="w-6 h-6 text-gray-700" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col space-y-3 px-4 py-4 bg-white/95 border-t border-gray-100">
          <button 
            onClick={() => scrollToSection('features')}
            className={`px-3 py-2 rounded-lg text-left ${location.hash === '#features' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('benefits')}
            className={`px-3 py-2 rounded-lg text-left ${location.hash === '#benefits' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
          >
            Benefits
          </button>
          <Link 
            to="/about" 
            className={`px-3 py-2 rounded-lg ${isActive('/about') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          {isLoggedIn && (
            <>
              <Link 
                to="/languages" 
                className={`px-3 py-2 rounded-lg ${isActive('/languages') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Languages
              </Link>
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-lg ${isActive('/dashboard') ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </>
          )}
          
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            {isLoggedIn ? (
              <Button 
                onClick={handleLogout} 
                className="bg-red-50 text-red-600 hover:bg-red-100 rounded-full w-full"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-full w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Navbar;