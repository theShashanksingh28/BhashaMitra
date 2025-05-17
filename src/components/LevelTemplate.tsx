import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface LevelTemplateProps {
  language: string;
  stage: 'Explorer' | 'Navigator' | 'FluentCommunicator' | 'LanguageVirtuoso';
  levelNumber: number;
}

const LevelTemplate: React.FC<LevelTemplateProps> = ({ language, stage, levelNumber }) => {
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz' | 'game' | 'practice'>('lesson');

  const renderContent = () => {
    switch (activeTab) {
      case 'lesson':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Lesson Content</h2>
            {/* Lesson content will go here */}
          </div>
        );
      case 'quiz':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Practice Quiz</h2>
            {/* Quiz content will go here */}
          </div>
        );
      case 'game':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Interactive Game</h2>
            {/* Game content will go here */}
          </div>
        );
      case 'practice':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Speaking & Listening Practice</h2>
            {/* Practice content will go here */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {language} - {stage} - Level {levelNumber}
          </h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['lesson', 'quiz', 'game', 'practice'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default LevelTemplate; 