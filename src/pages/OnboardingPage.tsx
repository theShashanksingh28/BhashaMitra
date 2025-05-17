import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

// Language data with flags and names
const languages = [
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', flag: '🇮🇳' },
  // Add more languages as needed
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { translateText } = useLanguage();
  const [step, setStep] = useState(1);
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    // Check if user has already completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompletedOnboarding === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLanguageSelection = (language: string, type: 'native' | 'target') => {
    if (type === 'native') {
      setNativeLanguage(language);
      setStep(2);
    } else {
      setTargetLanguage(language);
      setStep(3);
    }
  };

  const handleComplete = () => {
    // Save user preferences
    localStorage.setItem('nativeLanguage', nativeLanguage);
    localStorage.setItem('targetLanguage', targetLanguage);
    localStorage.setItem('hasCompletedOnboarding', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {showGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl"
            >
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome to भाषामित्र! 🌟
                  </h2>
                  <p className="text-lg mb-8 text-gray-700">
                    Let's start your language learning journey. First, tell us your native language:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLanguageSelection(lang.code, 'native')}
                        className="p-4 rounded-lg border-2 border-indigo-200 hover:border-indigo-500 transition-all bg-white/50 backdrop-blur-sm"
                      >
                        <span className="text-4xl mb-2 block">{lang.flag}</span>
                        <span className="font-medium text-gray-800">{lang.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Great Choice! 🎯
                  </h2>
                  <p className="text-lg mb-8 text-gray-700">
                    Now, which language would you like to learn?
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {languages
                      .filter((lang) => lang.code !== nativeLanguage)
                      .map((lang) => (
                        <motion.button
                          key={lang.code}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLanguageSelection(lang.code, 'target')}
                          className="p-4 rounded-lg border-2 border-indigo-200 hover:border-indigo-500 transition-all bg-white/50 backdrop-blur-sm"
                        >
                          <span className="text-4xl mb-2 block">{lang.flag}</span>
                          <span className="font-medium text-gray-800">{lang.name}</span>
                        </motion.button>
                      ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Perfect! 🎉
                  </h2>
                  <p className="text-lg mb-8 text-gray-700">
                    You're all set to start learning {languages.find(l => l.code === targetLanguage)?.name}!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    Start Learning Journey
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingPage; 