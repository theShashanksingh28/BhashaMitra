import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <footer className="bg-white border-t w-full">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">
          {/* Logo & Tagline */}
          <div>
            <Link
              to="/"
              className="text-indigo-600 text-2xl font-extrabold hover:text-indigo-700 transition"
            >
              भाषामित्र
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Your companion for learning Indian languages.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
              {isLoggedIn && (
                <li><Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link></li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-indigo-600">
                <FaFacebookF size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-indigo-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-indigo-600">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Bhasha Mitra. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
