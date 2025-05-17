import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 bg-indigo-600 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Language Journey?</h2>
        <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
          Join thousands of learners who are discovering the joy of speaking Indian languages with भाषामित्र.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/signup">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Sign Up Free
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;