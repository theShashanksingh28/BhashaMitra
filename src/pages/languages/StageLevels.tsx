import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const StageLevels: React.FC = () => {
  const { language, stage } = useParams<{ language: string; stage: string }>();

  // If no language or stage is selected, redirect to language stages
  if (!language || !stage) {
    return <Navigate to={`/languages/${language || ''}`} />;
  }

  // Generate array of 50 levels
  const levels = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to={`/languages/${language}`}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stages
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language} - {stage.charAt(0).toUpperCase() + stage.slice(1)}
          </h1>
          <p className="text-xl text-gray-600">
            Select a level to begin learning
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {levels.map((level) => (
            <Link
              key={level}
              to={`/languages/${language}/${stage}/level${level}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center">
                <span className="text-2xl font-bold text-gray-900">
                  Level {level}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StageLevels; 