import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

const vocabWords = [
  { word: "घर", meaning: "Home", type: "Noun", pronunciation: "ghar" },
  { word: "पानी", meaning: "Water", type: "Noun", pronunciation: "paani" },
  { word: "किताब", meaning: "Book", type: "Noun", pronunciation: "kitaab" },
  { word: "बड़ा", meaning: "Big", type: "Adjective", pronunciation: "bada" },
  { word: "छोटा", meaning: "Small", type: "Adjective", pronunciation: "chhota" },
  { word: "लंबा", meaning: "Tall/Long", type: "Adjective", pronunciation: "lamba" },
  { word: "मीठा", meaning: "Sweet", type: "Adjective", pronunciation: "meetha" },
  { word: "दरवाज़ा", meaning: "Door", type: "Noun", pronunciation: "darwaza" },
  { word: "सड़क", meaning: "Road", type: "Noun", pronunciation: "sadak" },
  { word: "कपड़ा", meaning: "Cloth", type: "Noun", pronunciation: "kapda" },
  { word: "ठंडा", meaning: "Cold", type: "Adjective", pronunciation: "thanda" },
  { word: "गरम", meaning: "Hot", type: "Adjective", pronunciation: "garam" },
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

const Level7BhashaMitra = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [quizWord, setQuizWord] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const checkLevelCompletion = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const hindiProgress = userData.languageProgress?.Hindi?.Foundation;
          if (hindiProgress?.completedLevels?.includes(7)) {
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
            currentLevel: Math.max(currentProgress.currentLevel, 8),
            completedLevels: [...(currentProgress.completedLevels || []), 7]
          }
        });

        toast.success('Level completed! Moving to next level...');
        navigate('/languages/Hindi/Foundation/Level8');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  // Pick a random vocab word for quiz
  const startQuiz = () => {
    const randomWord = vocabWords[Math.floor(Math.random() * vocabWords.length)];
    setQuizWord(randomWord);
    setSelectedMeaning("");
    setFeedback("");
  };

  const checkAnswer = () => {
    if (!quizWord) return;
    if (selectedMeaning === quizWord.meaning) {
      setFeedback("✅ Correct! Well done.");
    } else {
      setFeedback(`❌ Incorrect. Try again.`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Bhasha Mitra - Level 7</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Learn Everyday Nouns & Adjectives</h2>
        <div className="grid grid-cols-2 gap-4">
          {vocabWords.map(({ word, meaning, type, pronunciation }) => (
            <div
              key={word}
              className="border rounded p-4 cursor-pointer hover:bg-yellow-50"
              onClick={() => speakHindi(pronunciation)}
              title={`Hear pronunciation of ${word}`}
            >
              <div className="text-3xl font-bold mb-1 text-center">{word}</div>
              <div className="text-center mb-1 italic text-gray-700">{type}</div>
              <div className="text-center font-semibold">{meaning}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakHindi(pronunciation);
                }}
                className="mt-2 w-full bg-blue-300 rounded py-1 hover:bg-blue-500 text-white"
              >
                🔊 Pronounce
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-semibold mb-3 text-center">Quiz: Match the Meaning</h3>
        {!quizWord ? (
          <button
            onClick={startQuiz}
            className="block mx-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            Start Quiz
          </button>
        ) : (
          <>
            <div className="text-4xl font-bold mb-4 text-center">{quizWord.word}</div>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {vocabWords.map(({ meaning }) => (
                <button
                  key={meaning}
                  onClick={() => setSelectedMeaning(meaning)}
                  className={`px-4 py-2 rounded border cursor-pointer ${
                    selectedMeaning === meaning
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-blue-100"
                  }`}
                >
                  {meaning}
                </button>
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={checkAnswer}
                className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-800 mr-4"
              >
                Check Answer
              </button>
              <button
                onClick={startQuiz}
                className="bg-gray-400 text-black px-6 py-2 rounded hover:bg-gray-600"
              >
                Next Word
              </button>
            </div>
            {feedback && (
              <div
                className={`mt-4 font-semibold text-center ${
                  feedback.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </div>
            )}
          </>
        )}
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

export default Level7BhashaMitra;
