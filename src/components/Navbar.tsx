import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <span className="text-indigo-600 text-2xl font-bold">भाषामित्र</span>
        <span className="text-gray-700">Bhashamitra</span>
      </div>
      
      <div className="hidden md:flex space-x-6">
        <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
        <Link to="/benefits" className="text-gray-600 hover:text-gray-900">Benefits</Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
        {isLoggedIn && (
          <>
            <Link to="/languages" className="text-gray-600 hover:text-gray-900">Languages</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
          </>
        )}
      </div>
      
      <div className="flex gap-2">
        {isLoggedIn ? (
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">Logout</Button>
        ) : (
          <>
            <Link to="/login">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;