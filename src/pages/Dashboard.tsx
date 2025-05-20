import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  User, 
  Settings, 
  ChevronDown, 
  Clock, 
  Award, 
  Flame, 
  BookOpen, 
  MessageSquare, 
  Gamepad, 
  BarChart2, 
  Users, 
  Globe, 
  CheckCircle, 
  Lock,
  ArrowRight,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import DictionaryTranslatorChatbot from './chatbot';

// Types for our data structures
interface UserProfile {
  name: string;
  email: string;
  language: string;
  nativeLanguage: string;
  learningLanguage: string;
  stats: {
    xp: number;
    streak: number;
    weeklyXP: number;
    accuracy: number;
    timeSpent: string;
  };
  lastActivity: {
    lesson: string;
    module: string;
    progress: number;
  };
  leaderboardRank: number;
}

interface Level {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'locked';
  progress: number;
}

interface Activity {
  id: string;
  name: string;
  icon: string;
  type: 'game' | 'drill' | 'quiz';
  unlocked: boolean;
  stats?: {
    accuracy: number;
    attempts: number;
  };
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  earnedOn?: string;
}

export default function BhashaMitraDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('Hindi');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [shouldPreventScroll, setShouldPreventScroll] = useState(true);

  // Default values for user profile
  const defaultUserProfile: UserProfile = {
    name: 'User',
    email: '',
    language: 'Hindi',
    nativeLanguage: 'Hindi',
    learningLanguage: 'Hindi',
    stats: {
      xp: 0,
      streak: 0,
      weeklyXP: 0,
      accuracy: 0,
      timeSpent: '0h 0m'
    },
    lastActivity: {
      lesson: 'Start Learning',
      module: 'Basics 1',
      progress: 0
    },
    leaderboardRank: 0
  };

  // Handle initial scroll position and prevent unwanted scrolling
  useLayoutEffect(() => {
    if (shouldPreventScroll) {
      // Force scroll to top
      window.scrollTo(0, 0);
      
      // Disable scroll restoration
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      // Prevent any automatic scrolling
      document.body.style.overflow = 'hidden';
      
      // Re-enable scrolling after a short delay
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        setShouldPreventScroll(false);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [shouldPreventScroll]);

  // Memoize the data fetching function
  const fetchDashboardData = useCallback(async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if native language is selected
        if (!userData.nativeLanguage) {
          navigate('/native-language');
          return;
        }
        
        // Check if learning language is selected
        if (!userData.learningLanguage) {
          navigate('/language-selection');
          return;
        }

        // Update user profile
        setUserProfile({
          ...defaultUserProfile,
          ...userData,
          stats: {
            ...defaultUserProfile.stats,
            ...(userData.stats || {})
          },
          lastActivity: {
            ...defaultUserProfile.lastActivity,
            ...(userData.lastActivity || {})
          }
        });

        // Fetch other data in parallel
        const [levelsSnapshot, activitiesSnapshot, achievementsSnapshot] = await Promise.all([
          getDocs(query(collection(db, 'levels'))),
          getDocs(query(
            collection(db, 'activities'),
            where('language', '==', userData.learningLanguage)
          )),
          getDocs(query(
            collection(db, 'achievements'),
            where('userId', '==', currentUser.uid)
          ))
        ]);

        setLevels(levelsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Level[]);

        setActivities(activitiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Activity[]);

        setAchievements(achievementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Achievement[]);

      } else {
        navigate('/native-language');
      }
    } catch (error) {
      console.error('Error checking user setup:', error);
      setError('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [currentUser, navigate]);

  // Fetch data only once on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
      document.body.style.overflow = '';
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      if (!currentUser) return;
      
      // Update language in Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        'profile.language': newLanguage
      });
      
      setCurrentLanguage(newLanguage);
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLearningPathClick = () => {
    if (userProfile?.learningLanguage) {
      navigate(`/languages/${userProfile.learningLanguage}`);
    }
  };

  // Loading state
  if (loading && isInitialLoad) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Use default profile if userProfile is null
  const profile = userProfile || defaultUserProfile;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Custom Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-30 
                      w-64 bg-indigo-700 text-white transition-transform duration-300 ease-in-out 
                      shadow-lg md:shadow-xl lg:shadow-2xl`}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">BhashaMitra</h2>
            <button onClick={toggleSidebar} className="text-white hover:text-indigo-200">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="space-y-1">
            <a href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-800">
              <BarChart2 className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            
            <a href="/profile" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </a>
            
            <a href="/language" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Globe className="w-5 h-5" />
              <span>Language Selection</span>
            </a>
            
            <a href="/certificates" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Award className="w-5 h-5" />
              <span>Certificates</span>
            </a>
            
            <a href="/badges" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Award className="w-5 h-5" />
              <span>Badges</span>
            </a>
            
            <a href="/settings" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
            
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors w-full text-left mt-4"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div ref={mainContentRef} className="flex-1 flex flex-col min-h-screen">
        {/* Custom Navbar with hamburger menu */}
        <header className="sticky top-0 bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="p-1 mr-4 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-6 h-6 text-indigo-600" />
              </button>
              <h1 className="text-xl font-bold text-indigo-700">BhashaMitra</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <span className="text-sm text-gray-600 mr-2">Learning:</span>
                <span className="font-medium">{profile.language}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="hidden md:block">
                  <span className="text-sm font-medium">{profile.name}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content wrapper with padding-top to account for navbar */}
        <main className="flex-1 flex flex-col">
          {/* User Status Bar */}
          <div className="bg-indigo-50 px-6 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center">
                <span className="font-medium text-lg">Welcome back, {profile.name}! 🌟</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">Language:</span>
                  <div className="ml-2 flex items-center">
                    <span className="font-medium">{profile.language}</span>
                    <span className="ml-1 text-lg">🇮🇳</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">XP:</span>
                  <span className="ml-2 font-medium text-indigo-600">{profile.stats.xp.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="ml-1 font-medium">{profile.stats.streak} Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Learning Card */}
          <div className="mx-6 mt-6">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg px-6 py-4 text-white shadow-md">
              <div className="flex flex-wrap items-center justify-between">
                <div>
                  <h2 className="font-medium">
                    🚀 Continue Learning: {profile.lastActivity.module} → "{profile.lastActivity.lesson}"
                  </h2>
                </div>
                <button className="flex items-center bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors mt-2 md:mt-0">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Resume Lesson
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Learning Path */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h2 className="flex items-center text-lg font-medium mb-4">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                  Learning Path
                </h2>
                <div className="space-y-4">
                  {levels.map((level) => (
                    <div key={level.id} className="flex items-center">
                      {level.status === 'completed' ? (
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      ) : level.status === 'in-progress' ? (
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">{level.name}</span>
                          {level.status === 'completed' && <span className="text-green-600">✔️</span>}
                          {level.status === 'in-progress' && <span className="text-sm text-gray-600">{level.progress}%</span>}
                        </div>
                        {level.status === 'in-progress' && (
                          <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                            <div 
                              className="h-full bg-indigo-600 rounded-full" 
                              style={{ width: `${level.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={handleLearningPathClick}
                    className="text-sm text-indigo-600 font-medium flex items-center mt-2 hover:text-indigo-800"
                  >
                    View Full Path
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>

              {/* Quick Practice */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h2 className="flex items-center text-lg font-medium mb-4">
                  <Gamepad className="w-5 h-5 mr-2 text-indigo-600" />
                  Quick Practice
                </h2>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <button 
                      key={activity.id}
                      className="w-full flex items-center justify-between bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-md transition-colors"
                      disabled={!activity.unlocked}
                    >
                      <span className="text-gray-800">{activity.name}</span>
                      <span className="text-xl">{activity.icon}</span>
                    </button>
                  ))}
                  <button className="text-sm text-indigo-600 font-medium flex items-center mt-2 hover:text-indigo-800">
                    More Games
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>

              {/* Chat with Mitra - Wrap in a container that prevents scroll propagation */}
              <div className="bg-white rounded-lg shadow-sm p-5">
                <h2 className="flex items-center text-lg font-medium mb-4">
                  <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
                  Chat with Mitra
                </h2>
                <div className="h-[400px] border rounded-lg overflow-hidden isolate">
                  <DictionaryTranslatorChatbot />
                </div>
              </div>
            </div>

            {/* Achievements and Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              {/* Achievements */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-5">
                <h2 className="flex items-center text-lg font-medium mb-4">
                  <Award className="w-5 h-5 mr-2 text-indigo-600" />
                  Achievements
                </h2>
                <div className="flex flex-wrap gap-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className="flex items-center bg-gray-50 px-3 py-2 rounded-md"
                    >
                      <span className="text-xl mr-2">{achievement.icon}</span>
                      <span className="text-sm font-medium">{achievement.name}</span>
                    </div>
                  ))}
                  <button className="text-sm text-indigo-600 font-medium flex items-center ml-2 hover:text-indigo-800 mt-1">
                    View All
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-5">
                <h2 className="flex items-center text-lg font-medium mb-4">
                  <BarChart2 className="w-5 h-5 mr-2 text-indigo-600" />
                  Weekly Progress
                </h2>
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium">Time:</span>
                    <span className="ml-2">{profile.stats.timeSpent}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">XP:</span>
                    <span className="ml-2">{profile.stats.weeklyXP}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Accuracy:</span>
                    <span className="ml-2">{profile.stats.accuracy}%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Daily Goal:</span>
                    <span className="ml-2 flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Done!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white rounded-lg shadow-sm px-5 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart2 className="w-5 h-5 text-indigo-600 mr-2" />
                  <span className="font-medium">Leaderboard Rank:</span>
                  <span className="ml-2 text-indigo-700 font-bold">#{profile.leaderboardRank}</span>
                </div>
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                  View Leaderboard
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm px-5 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-indigo-600 mr-2" />
                  <span className="font-medium">Invite Friends</span>
                </div>
                <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-200">
                  Share Link
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-sm px-5 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-indigo-600 mr-2" />
                  <span className="font-medium">Switch Language:</span>
                </div>
                <button 
                  className="flex items-center bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
                  onClick={() => handleLanguageChange(currentLanguage === 'Hindi' ? 'English' : 'Hindi')}
                >
                  <span>{profile.language}</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}