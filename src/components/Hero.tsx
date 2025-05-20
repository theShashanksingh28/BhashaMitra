import { useState, memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

// Memoize the Hero component
const Hero = memo(() => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleGetStarted = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
        <LazyMotion features={domAnimation}>
          <motion.div 
            className="md:w-1/2 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Learn Indian Languages with{' '}
              <span className="block mt-2 text-indigo-600">भाषामित्र</span>
            </h1>
            
            <p className="text-gray-600 text-lg">
              Connect with India's rich linguistic heritage through our
              interactive, personalized language learning platform.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                22 Official Languages
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                Interactive Lessons
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                Cultural Insights
              </div>
              <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm hover:shadow-md transition-shadow duration-300">
                AI-powered Chatbot
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-6">
              <Button 
                className={`bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 transform ${isHovered ? 'scale-105' : ''}`}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
              <Link to="/learn-more">
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-2 hover:bg-indigo-50 transition-colors duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
              <div className="bg-indigo-100 aspect-video flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-indigo-600 text-5xl font-bold mb-4">भाषामित्र</div>
                  <p className="text-gray-700">Your language learning journey begins here</p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <div className="text-xs text-gray-500">Language Interface Demo</div>
                </div>
              </div>
            </div>
          </motion.div>
        </LazyMotion>
      </div>
    </div>
  );
});

export default Hero;