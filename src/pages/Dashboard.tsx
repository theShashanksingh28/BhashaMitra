import React, { useState, useEffect } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Types for our data structures
interface UserProfile {
  name: string;
  email: string;
  language: string;
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

  // Default values for user profile
  const defaultUserProfile: UserProfile = {
    name: 'User',
    email: '',
    language: 'Hindi',
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        // Fetch user profile
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as UserProfile;
          // Merge with default values to ensure all properties exist
          setUserProfile({
            ...defaultUserProfile,
            ...data,
            stats: {
              ...defaultUserProfile.stats,
              ...(data.stats || {})
            },
            lastActivity: {
              ...defaultUserProfile.lastActivity,
              ...(data.lastActivity || {})
            }
          });
        } else {
          // If no user data exists, use default profile
          setUserProfile(defaultUserProfile);
        }

        // Fetch levels
        const levelsQuery = query(collection(db, 'levels'));
        const levelsSnapshot = await getDocs(levelsQuery);
        const levelsData = levelsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Level[];
        setLevels(levelsData);

        // Fetch activities
        const activitiesQuery = query(
          collection(db, 'activities'),
          where('language', '==', currentLanguage)
        );
        const activitiesSnapshot = await getDocs(activitiesQuery);
        const activitiesData = activitiesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Activity[];
        setActivities(activitiesData);

        // Fetch achievements
        const achievementsQuery = query(
          collection(db, 'achievements'),
          where('userId', '==', currentUser.uid)
        );
        const achievementsSnapshot = await getDocs(achievementsQuery);
        const achievementsData = achievementsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Achievement[];
        setAchievements(achievementsData);

      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, navigate, currentLanguage]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Use default profile if userProfile is null
  const profile = userProfile || defaultUserProfile;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button className="p-2 rounded-md hover:bg-gray-100">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <div className="ml-4 flex items-center">
                <span className="font-bold text-2xl text-indigo-600">BHASHA-MITRA</span>
                <span className="ml-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Beta</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <User className="w-5 h-5 text-gray-700" />
                <span className="ml-2 font-medium">{profile.name}</span>
                <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

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
              <button className="text-sm text-indigo-600 font-medium flex items-center mt-2 hover:text-indigo-800">
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

          {/* Chat with Mitra */}
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h2 className="flex items-center text-lg font-medium mb-4">
              <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
              Chat with Mitra
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-md transition-colors">
                <span className="text-gray-800">Ask grammar question</span>
                <span className="text-xl">💬</span>
              </button>
              <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-md transition-colors">
                <span className="text-gray-800">Practice speaking</span>
                <span className="text-xl">🗣️</span>
              </button>
              <button className="w-full flex items-center justify-between bg-gray-50 hover:bg-indigo-50 px-4 py-3 rounded-md transition-colors">
                <span className="text-gray-800">Explain verb tense</span>
                <span className="text-xl">🤓</span>
              </button>
              <button className="text-sm text-indigo-600 font-medium flex items-center mt-2 hover:text-indigo-800">
                Open Full Chat
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <span className="font-bold text-xl text-indigo-600">BHASHA-MITRA</span>
                <span className="ml-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Beta</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Empowering language learners with AI-powered personalized learning experiences.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Home</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Courses</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Practice</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Leaderboard</a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Help Center</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} Bhasha Mitra. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}