import React, { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

const newConsonants = [
  {
    cluster: "त्र",
    pronunciation: "tra",
    examples: [
      { word: "पत्र", meaning: "Letter", pronunciation: "patra" },
      { word: "मित्र", meaning: "Friend", pronunciation: "mitra" },
    ],
  },
  {
    cluster: "ज्ञ",
    pronunciation: "gya",
    examples: [
      { word: "ज्ञान", meaning: "Knowledge", pronunciation: "gyaan" },
      { word: "विद्याज्ञ", meaning: "Scholar", pronunciation: "vidya-gya" },
    ],
  },
  {
    cluster: "क्ष",
    pronunciation: "ksha",
    examples: [
      { word: "क्षत्रिय", meaning: "Warrior class", pronunciation: "kshatriya" },
      { word: "दक्षिण", meaning: "South", pronunciation: "dakshin" },
    ],
  },
  {
    cluster: "श्र",
    pronunciation: "shra",
    examples: [
      { word: "श्रम", meaning: "Effort", pronunciation: "shram" },
      { word: "श्रद्धा", meaning: "Faith", pronunciation: "shraddha" },
    ],
  },
];

// Function to speak with Hindi-like accent
const speakHindi = (text) => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance();

  // For better Hindi accent, try to pick Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const hindiVoice = voices.find(
    (v) => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi")
  );

  utterance.voice = hindiVoice || voices[0]; // fallback to first voice if Hindi not found
  utterance.rate = 0.9; // slightly slower for clarity
  utterance.pitch = 1.1; // slightly higher pitch for natural feel

  utterance.text = text;

  window.speechSynthesis.speak(utterance);
};

const Level5BhashaMitra = () => {
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
          if (hindiProgress?.completedLevels?.includes(5)) {
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
            currentLevel: Math.max(currentProgress.currentLevel, 6),
            completedLevels: [...(currentProgress.completedLevels || []), 5]
          }
        });

        toast.success('Level completed! Moving to next level...');
        navigate('/languages/Hindi/Foundation/Level6');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Bhasha Mitra - Level 5</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">New Consonant Clusters</h2>
        <div className="flex flex-wrap gap-4">
          {newConsonants.map(({ cluster }, i) => (
            <div
              key={i}
              className="border p-3 rounded w-20 text-center cursor-pointer hover:bg-green-100"
              onClick={() => speakHindi(cluster)}
              title={`Hear pronunciation of ${cluster}`}
            >
              <div className="text-3xl font-bold mb-1">{cluster}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakHindi(cluster);
                }}
                className="text-sm mt-1 bg-green-200 px-2 rounded hover:bg-green-400"
              >
                🔊 Pronounce
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Example Words Using New Consonants</h2>
        <div className="space-y-4">
          {newConsonants.map(({ cluster, examples }) => (
            <div key={cluster} className="mb-2">
              <h3 className="font-semibold text-lg mb-1">Words with "{cluster}"</h3>
              <div className="flex flex-wrap gap-3">
                {examples.map(({ word, meaning }) => (
                  <div
                    key={word}
                    className="border rounded p-3 w-40 text-center bg-yellow-50"
                  >
                    <div className="text-2xl font-bold">{word}</div>
                    <div className="italic text-sm mb-1">{meaning}</div>
                    <button
                      onClick={() => speakHindi(word)}
                      className="text-sm bg-yellow-200 px-2 rounded hover:bg-yellow-400"
                      title={`Hear pronunciation of ${word}`}
                    >
                      🔊 Pronounce
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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

export default Level5BhashaMitra;
