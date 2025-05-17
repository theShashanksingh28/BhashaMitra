import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="bg-slate-50 py-16">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Learn Indian Languages with{' '}
            <span className="text-indigo-600">भाषामित्र</span>
          </h1>
          
          <p className="text-gray-600 text-lg">
            Connect with India's rich linguistic heritage through our
            interactive, personalized language learning platform.
          </p>
          
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
              22 Official Languages
            </div>
            <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
              Interactive Lessons
            </div>
            <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
              Cultural Insights
            </div>
            <div className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
              AI-powered Chatbot
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/get-started">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
            </Link>
            <Link to="/learn-more">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
            <p className="text-gray-500">Language Learning Interface Image</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;