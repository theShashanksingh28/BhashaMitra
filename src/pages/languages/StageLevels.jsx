import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Flame, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const StageLevels = () => {
  const { language, stage } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({
    currentLevel: 1,
    completedLevels: []
  });

  // State for hover info
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const fetchUserProgress = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const progress = userData.languageProgress?.[language]?.[stage] || {
          currentLevel: 1,
          completedLevels: []
        };
        setUserProgress(progress);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch progress on mount and when location changes
  useEffect(() => {
    fetchUserProgress();
  }, [currentUser, language, stage, location.key]);

  // Create 50 levels with appropriate status
  const generateLevels = () => {
    const highestCompletedLevel = Math.max(...userProgress.completedLevels, 0);
    const nextLevel = highestCompletedLevel + 1;

    return Array.from({ length: 50 }, (_, i) => {
      const levelNumber = i + 1;
      let status = 'locked';
      
      if (userProgress.completedLevels.includes(levelNumber)) {
        status = 'completed';
      } else if (levelNumber === nextLevel) {
        status = 'current';
      }
      
      // Every 5th level is a milestone
      const isMilestone = levelNumber % 5 === 0;
      return {
        id: levelNumber,
        title: getTitleForLevel(levelNumber),
        description: getDescriptionForLevel(levelNumber),
        points: getPointsForLevel(levelNumber, isMilestone),
        status,
        isMilestone
      };
    });
  };

  // Helper functions to generate realistic level content
  const getTitleForLevel = (level) => {
    const titles = [
      "Basic Greetings", "Vowels", "Basic Consonants", "More Consonants", "Script Basics",
      "Simple Words", "Basic Phrases", "Numbers 1-10", "Common Nouns", "Basic Vocabulary",
      "Simple Sentences", "Question Words", "Present Tense", "Family Terms", "Basic Communication",
      "Adjectives", "Food Vocabulary", "Directions", "Numbers 11-100", "Daily Life",
      "Past Tense", "Future Tense", "Common Expressions", "Conversational Skills", "Foundation Achievement",
      "Intermediate Greetings", "Complex Sentences", "Weather Terms", "Travel Vocabulary", "Verbal Fluency",
      "Modal Verbs", "Conditional Statements", "Cultural References", "Hindi Literature", "Intermediate Achievement",
      "Advanced Grammar", "Idiomatic Expressions", "Professional Vocabulary", "Regional Dialects", "Cultural Nuances",
      "Complex Tenses", "Creative Writing", "Academic Hindi", "Technical Vocabulary", "Advanced Achievement",
      "Expert Phrasing", "Poetic Hindi", "Media Comprehension", "Cultural Mastery", "Complete Mastery"
    ];
    if (level % 5 === 0) {
      return "Milestone: " + titles[Math.min(level - 1, titles.length - 1)];
    }
    return titles[Math.min(level - 1, titles.length - 1)];
  };

  const getDescriptionForLevel = (level) => {
    const descriptions = [
      "Learn to say hello and introduce yourself in Hindi",
      "Master Hindi vowel sounds and their written forms",
      "Learn the first set of Hindi consonants",
      "Continue learning Hindi consonants and their sounds",
      "You've mastered the foundational Hindi script!",
      "Form your first Hindi words",
      "Learn common everyday Hindi phrases",
      "Count from 1 to 10 in Hindi",
      "Learn words for everyday objects",
      "You've built a foundation of Hindi words!",
      "Start forming basic Hindi sentences",
      "Learn to ask questions in Hindi",
      "Learn to describe current actions",
      "Learn Hindi words for family members",
      "You'll be able to have simple conversations!",
      "Describe people, places and things",
      "Learn Hindi words for common foods",
      "Learn to navigate in Hindi",
      "Expand your Hindi number knowledge",
      "You'll master vocabulary for everyday situations!",
      "Talk about completed actions",
      "Express future plans and intentions",
      "Learn Hindi idioms and expressions",
      "Practice natural dialogue in Hindi",
      "Complete your Hindi Foundation journey!",
      "Advanced greeting techniques for different contexts",
      "Build complex and compound sentences",
      "Discuss climate and forecasts in Hindi",
      "Master essential vocabulary for travelers",
      "Achieve conversational fluency in Hindi",
      "Express possibilities and obligations",
      "Express hypothetical situations and consequences",
      "Understand cultural references in conversations",
      "Introduction to Hindi poetry and stories",
      "You've reached intermediate mastery of Hindi!",
      "Master advanced Hindi grammatical structures",
      "Use and understand common Hindi idioms",
      "Business and professional Hindi communication",
      "Recognize and understand regional Hindi variations",
      "Understand subtle cultural contexts in language",
      "Master past perfect and future perfect tenses",
      "Express yourself creatively in written Hindi",
      "Understand and use Hindi in academic contexts",
      "Specialized vocabulary for professional fields",
      "You've achieved advanced proficiency in Hindi!",
      "Express complex ideas with native-like fluency",
      "Understand and compose Hindi poetry",
      "Comprehend Hindi news and entertainment media",
      "Deep understanding of Hindi cultural expressions",
      "You've achieved complete mastery of Hindi!"
    ];
    return descriptions[Math.min(level - 1, descriptions.length - 1)];
  };

  const getPointsForLevel = (level, isMilestone) => {
    let basePoints = 100;
    if (level > 10) basePoints = 150;
    if (level > 20) basePoints = 200;
    if (level > 30) basePoints = 250;
    if (level > 40) basePoints = 300;
    return isMilestone ? basePoints + 100 : basePoints;
  };

  const levels = generateLevels();
  const totalLevels = levels.length;
  const completedLevels = userProgress.completedLevels.length;
  const progressPercentage = Math.round((completedLevels / totalLevels) * 100);

  // Group levels into rows (10 levels per row)
  const rows = [];
  for (let i = 0; i < levels.length; i += 10) {
    rows.push(levels.slice(i, i + 10));
  }

  // Navigation handlers
  const handleBack = () => {
    navigate(`/languages/${language}`);
  };

  const handleSelectLevel = (level) => {
    navigate(`/languages/${language}/${stage}/level${level}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-5 text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors mb-5"
        >
          <ArrowLeft size={16} />
          Back to Stages
        </button>

        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-500 mb-2 relative inline-block">
            {language} - {stage && stage.charAt(0).toUpperCase() + stage.slice(1)}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded"></div>
          </h1>
          <h2 className="text-lg text-gray-600 mt-6">Select a level to begin your learning adventure</h2>
        </div>

        {/* Progress tracker */}
        <div className="bg-white rounded-xl p-5 shadow-md mb-8">
          <div className="flex items-center gap-2 text-lg font-bold mb-4">
            <span role="img" aria-label="Books">📚</span> 
            {language} - {stage && stage.charAt(0).toUpperCase() + stage.slice(1)} Progress
          </div>
          <div className="h-5 bg-gray-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{completedLevels}/{totalLevels} Levels Completed</span>
            <span>{progressPercentage}% of {language} - {stage && stage.charAt(0).toUpperCase() + stage.slice(1)}</span>
          </div>
        </div>

        {/* Level map */}
        <div className="relative mb-10">
          <div className="relative z-10">
            {rows.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="grid grid-cols-10 gap-4 mb-6">
                {row.map((level) => {
                  let cardClasses = "relative h-24 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 cursor-pointer overflow-hidden";
                  let numberClasses = "text-2xl font-bold z-10";
                  
                  if (level.status === 'completed') {
                    cardClasses += " bg-blue-50 hover:shadow-lg hover:-translate-y-1";
                    numberClasses += " text-blue-500";
                  } else if (level.status === 'current') {
                    cardClasses += " bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-500 shadow-blue-200 hover:shadow-lg hover:-translate-y-1";
                    numberClasses += " text-blue-500";
                  } else {
                    cardClasses += " bg-gray-100 opacity-80 cursor-not-allowed";
                    numberClasses += " text-gray-500";
                  }

                  if (level.isMilestone) {
                    cardClasses += level.status === 'locked' ? 
                      " border-2 border-dashed border-gray-300" : 
                      " border-2 border-dashed border-blue-400";
                  }

                  return (
                    <div
                      key={`level-${level.id}`}
                      className={cardClasses}
                      onClick={() => level.status !== 'locked' && handleSelectLevel(level.id)}
                      onMouseEnter={() => setHoveredLevel(level.id)}
                      onMouseLeave={() => setHoveredLevel(null)}
                    >
                      {/* Top blue bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${level.status !== 'locked' ? 'bg-gradient-to-r from-blue-500 to-blue-300' : 'bg-gray-300'}`}></div>
                      
                      {/* Level number */}
                      <span className={numberClasses}>{level.id}</span>
                      
                      {/* Completed checkmark */}
                      {level.status === 'completed' && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}
                      
                      {/* Locked indicator */}
                      {level.status === 'locked' && (
                        <div className="absolute bottom-3 text-gray-400 text-lg">
                          🔒
                        </div>
                      )}
                      
                      {/* Milestone badge */}
                      {level.isMilestone && (
                        <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md ${level.status !== 'locked' ? 'bg-blue-400' : 'bg-gray-400'}`}>
                          {level.id === 50 ? <Award size={14} /> : <Trophy size={14} />}
                        </div>
                      )}
                      
                      {/* Popup info on hover */}
                      {hoveredLevel === level.id && (
                        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-4 w-48 shadow-lg text-center z-20">
                          <div className="font-bold text-blue-500 mb-1">{level.title}</div>
                          <div className="text-xs text-gray-600 mb-2">{level.description}</div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span className="flex items-center">
                              <Star size={12} className="mr-1" /> {level.points} pts
                            </span>
                            <span>
                              {level.status === 'completed' && '✓ Completed'}
                              {level.status === 'current' && '🔆 Current'}
                              {level.status === 'locked' && `🔒 Complete level ${level.id - 1}`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageLevels;