import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

const questionWords = [
  { word: "क्या", transliteration: "Kya", meaning: "What?" },
  { word: "कौन", transliteration: "Kaun", meaning: "Who?" },
  { word: "कब", transliteration: "Kab", meaning: "When?" },
  { word: "क्यों", transliteration: "Kyon", meaning: "Why?" },
  { word: "कहाँ", transliteration: "Kahan", meaning: "Where?" },
  { word: "कैसे", transliteration: "Kaise", meaning: "How? (informal)" },
  { word: "कैसी", transliteration: "Kaisee", meaning: "How? (feminine)" },
  { word: "कैसा", transliteration: "Kaisa", meaning: "How? (masculine)" },
  { word: "कितने", transliteration: "Kitne", meaning: "How many? (masculine plural)" },
  { word: "कितनी", transliteration: "Kitni", meaning: "How many? (feminine)" },
  { word: "कितना", transliteration: "Kitna", meaning: "How much? (masculine)" },
  { word: "किसने", transliteration: "Kisne", meaning: "Who did? (Subject)" },
  { word: "किसे", transliteration: "Kise", meaning: "To whom? (Object)" },
  { word: "किसका", transliteration: "Kiska", meaning: "Whose? (masculine)" },
  { word: "किसकी", transliteration: "Kiski", meaning: "Whose? (feminine)" },
  { word: "किसका से", transliteration: "Kiska se", meaning: "From whom?" },
  { word: "किस पर", transliteration: "Kis par", meaning: "On whom?" },
  { word: "किस के लिए", transliteration: "Kis ke liye", meaning: "For whom?" },
  { word: "किस प्रकार", transliteration: "Kis prakar", meaning: "What kind? / In what way?" },
  { word: "किस तरह", transliteration: "Kis tarah", meaning: "What way? / How?" },
];

const speakHindi = (text) => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance();

  const voices = window.speechSynthesis.getVoices();
  const hindiVoice = voices.find(
    (v) => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi")
  );

  utterance.voice = hindiVoice || voices[0];
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  utterance.text = text;

  window.speechSynthesis.speak(utterance);
};

const Level8BhashaMitra = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLevelCompletion = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const hindiProgress = userData.languageProgress?.Hindi?.Foundation;
          if (hindiProgress?.completedLevels?.includes(8)) {
            setIsCompleted(true);
          }
        }
      } catch (error) {
        console.error('Error checking level completion:', error);
      }
    };

    checkLevelCompletion();
  }, [currentUser]);

  const handleCompleteLevel = async () => {
    if (!currentUser) {
      toast.error('Please log in to save your progress');
      return;
    }

    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentProgress = userData.languageProgress?.Hindi?.Foundation || {
          currentLevel: 0,
          completedLevels: []
        };

        // Update progress
        await updateDoc(userRef, {
          'languageProgress.Hindi.Foundation': {
            ...currentProgress,
            currentLevel: Math.max(currentProgress.currentLevel, 9),
            completedLevels: [...(currentProgress.completedLevels || []), 8]
          }
        });

        toast.success('Level completed! Moving to next level...');
        navigate('/languages/Hindi/Foundation/Level9');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Bhasha Mitra - Level 8: Hindi Question Words
      </h1>

      <p className="mb-8 text-center text-gray-700">
        Learn common Hindi question words with transliteration, meanings, and pronunciations.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {questionWords.map(({ word, transliteration, meaning }, idx) => (
          <div
            key={idx}
            className="p-4 border rounded bg-gray-50 shadow-sm flex flex-col items-center"
          >
            <div className="text-4xl font-bold mb-1 text-indigo-700">{word}</div>
            <div className="text-xl mb-1 font-semibold">{transliteration}</div>
            <div className="text-lg italic mb-3 text-gray-700">{meaning}</div>
            <button
              onClick={() => speakHindi(word)}
              className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
            >
              🔊 Pronounce
            </button>
          </div>
        ))}
      </div>

      <section className="text-center mt-8">
      <div className="mt-8 flex justify-center gap-4">
        <Button 
          onClick={() => navigate('/languages/Hindi/foundation/levels')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
        >
          ← Back to Levels
        </Button>
        <Button 
          onClick={handleCompleteLevel}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
          disabled={isCompleted}
        >
          {isCompleted ? 'Level Completed ✓' : 'Complete Level & Move to Next'}
        </Button>
        </div>
      </section>
    </div>
  );
};

export default Level8BhashaMitra;
