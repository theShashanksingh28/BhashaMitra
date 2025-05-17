import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const STAGES = [
  {
    name: 'Foundation',
    description: 'Begin your journey with basic vocabulary, grammar, and essential phrases',
    levels: 50,
    color: 'bg-blue-500'
  },
  {
    name: 'Intermediate',
    description: 'Navigate through complex sentences, everyday conversations, and cultural context',
    levels: 50,
    color: 'bg-green-500'
  },
  {
    name: 'Advanced',
    description: 'Achieve fluency in conversations, writing, and cultural nuances',
    levels: 50,
    color: 'bg-purple-500'
  },
  {
    name: 'Mastery',
    description: 'Master the language with native-like proficiency and cultural mastery',
    levels: 50,
    color: 'bg-red-500'
  }
];

const LanguageStages: React.FC = () => {
  const { language } = useParams<{ language: string }>();

  useEffect(() => {
    console.log('Language parameter:', language);
    console.log('Language to learn from localStorage:', localStorage.getItem('languageToLearn'));
  }, [language]);

  // If no language is selected, redirect to language selection
  if (!language) {
    console.log('No language parameter, redirecting to language selection');
    return <Navigate to="/language-selection" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language} Learning Path
          </h1>
          <p className="text-xl text-gray-600">
            Choose your learning stage to begin your journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage) => (
            <Link
              key={stage.name}
              to={`/languages/${language}/${stage.name.toLowerCase()}/levels`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className={`h-2 ${stage.color}`} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {stage.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {stage.levels} levels
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageStages; 