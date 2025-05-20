import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

const STAGES = [
  {
    name: 'Foundation',
    description: 'Begin your journey with basic vocabulary, grammar, and essential phrases',
    levels: 50,
    color: 'bg-blue-500',
    iconColor: 'text-blue-500'
  },
  {
    name: 'Intermediate',
    description: 'Navigate through complex sentences, everyday conversations, and cultural context',
    levels: 50,
    color: 'bg-green-500',
    iconColor: 'text-green-500'
  },
  {
    name: 'Advanced',
    description: 'Achieve fluency in conversations, writing, and cultural nuances',
    levels: 50,
    color: 'bg-purple-500',
    iconColor: 'text-purple-500'
  },
  {
    name: 'Mastery',
    description: 'Master the language with native-like proficiency and cultural mastery',
    levels: 50,
    color: 'bg-red-500',
    iconColor: 'text-red-500'
  }
];

const LanguageStages = () => {
  const { language } = useParams<{ language: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({
    Foundation: { completed: false, level: 0 },
    Intermediate: { completed: false, level: 0 },
    Advanced: { completed: false, level: 0 },
    Mastery: { completed: false, level: 0 }
  });

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!currentUser || !language) return;

      try {
        setLoading(true);
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const languageProgress = userData.languageProgress?.[language] || {};
          
          // Update user progress with data from Firebase
          setUserProgress({
            Foundation: {
              completed: languageProgress.Foundation?.completed || false,
              level: languageProgress.Foundation?.currentLevel || 0
            },
            Intermediate: {
              completed: languageProgress.Intermediate?.completed || false,
              level: languageProgress.Intermediate?.currentLevel || 0
            },
            Advanced: {
              completed: languageProgress.Advanced?.completed || false,
              level: languageProgress.Advanced?.currentLevel || 0
            },
            Mastery: {
              completed: languageProgress.Mastery?.completed || false,
              level: languageProgress.Mastery?.currentLevel || 0
            }
          });
        }
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProgress();
  }, [currentUser, language]);

  // If no language is selected, redirect to language selection
  if (!language) {
    return <Navigate to="/language-selection" />;
  }

  // Calculate overall progress percentage
  const calculateOverallProgress = () => {
    const totalStages = STAGES.length;
    const completedStages = Object.values(userProgress).filter(stage => stage.completed).length;
    const partialProgress = Object.values(userProgress).reduce((acc, stage) => 
      acc + (stage.completed ? 1 : stage.level / 50), 0);
    
    return Math.round((partialProgress / totalStages) * 100);
  };

  const progressPercentage = calculateOverallProgress();

  const handleStageClick = (stage, index) => {
    // Check if previous stages are completed
    const previousStages = STAGES.slice(0, index);
    const canAccess = index === 0 || previousStages.every(s => userProgress[s.name].completed);

    if (!canAccess) {
      // Show message that previous stages need to be completed
      alert(`Please complete ${previousStages[previousStages.length - 1].name} stage first`);
      return;
    }

    // Navigate to the stage's levels page
    navigate(`/languages/${language}/${stage.name.toLowerCase()}/levels`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language} Learning Path
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Your progress: {progressPercentage}% complete
          </p>

          {/* Progress bar connecting the stages */}
          <div className="relative mb-24">
            <div className="h-3 bg-gray-200 rounded-full mx-auto max-w-4xl">
              <div 
                className="h-3 bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            {/* Stage indicators on progress bar */}
            <div className="flex justify-between absolute w-full top-0 transform -translate-y-1/2 max-w-4xl mx-auto left-0 right-0 px-4">
              {STAGES.map((stage, index) => {
                const stageProgress = userProgress[stage.name];
                const isCompleted = stageProgress.completed;
                const isActive = index === 0 || STAGES.slice(0, index)
                  .every(s => userProgress[s.name].completed);
                
                return (
                  <div key={stage.name} className="flex flex-col items-center relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-24 text-center">
                      <span className="text-xs font-medium bg-gray-800 text-white px-2 py-1 rounded">
                        {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Locked'}
                      </span>
                    </div>
                    <div className="group relative">
                      {isCompleted ? (
                        <CheckCircle 
                          className={`w-10 h-10 ${stage.iconColor} transition-all duration-300 drop-shadow-md`} 
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <Circle 
                          className={`w-10 h-10 ${isActive ? stage.iconColor : "text-gray-300"} transition-all duration-300`}
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                    <span className={`text-sm font-medium mt-2 ${isActive ? "text-gray-800" : "text-gray-400"}`}>
                      {stage.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((stage, index) => {
              const stageProgress = userProgress[stage.name];
              const isCompleted = stageProgress.completed;
              const isActive = index === 0 || STAGES.slice(0, index)
                .every(s => userProgress[s.name].completed);
              
              return (
                <div 
                  key={stage.name}
                  onClick={() => handleStageClick(stage, index)}
                  className={`cursor-pointer h-full ${!isActive && 'opacity-70'}`}
                >
                  <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${isCompleted ? "ring-2 ring-offset-2 " + stage.color : ""}`}>
                    <div className={`h-2 ${isActive ? stage.color : "bg-gray-200"}`} />
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {stage.name}
                        </h3>
                        {isCompleted ? (
                          <CheckCircle className={`w-6 h-6 ${stage.iconColor}`} fill="currentColor" />
                        ) : (
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500 mr-2">
                              {stageProgress.level}/{stage.levels}
                            </span>
                            <Circle className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {stage.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-2 ${stage.color} transition-all duration-500`}
                            style={{ width: `${(stageProgress.level / stage.levels) * 100}%` }}
                          ></div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center gap-4">
        <Button 
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
        >
          ← Back to Dashboard
        </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageStages;