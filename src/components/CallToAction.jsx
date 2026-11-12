import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-indigo-600 text-white">
      <div className="container mx-auto px-5 md:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Language Journey?</h2>
        <p className="text-indigo-100 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          Join thousands of learners who are discovering the joy of speaking Indian languages with भाषामित्र.
        </p>
        
        <div className="flex flex-wrap justify-center gap-5">
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white text-base px-6 py-2 h-auto rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300">
            <Link to="/signup">Sign Up Free</Link>
          </Button>
          <Button asChild variant="outline" className="border border-white text-white hover:bg-white hover:text-indigo-600 text-base px-6 py-2 h-auto rounded-full font-medium transition-all duration-300">
            <Link to="/dashboard">Explore Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;