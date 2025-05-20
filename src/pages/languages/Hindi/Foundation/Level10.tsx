import React, { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";

const numberItemsOriginal = [
  { word: "एक", transliteration: "Ek", number: 1 },
  { word: "दो", transliteration: "Do", number: 2 },
  { word: "तीन", transliteration: "Teen", number: 3 },
  { word: "चार", transliteration: "Chaar", number: 4 },
  { word: "पांच", transliteration: "Paanch", number: 5 },
  { word: "छह", transliteration: "Chhah", number: 6 },
  { word: "सात", transliteration: "Saat", number: 7 },
  { word: "आठ", transliteration: "Aath", number: 8 },
  { word: "नौ", transliteration: "Nau", number: 9 },
  { word: "दस", transliteration: "Das", number: 10 }
];

const totalLives = 3;
const targetCorrectMatches = 5;
const emojis = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝", "🍓", "🍋", "🍑", "🍍"];

const NumberNinja = () => {
  const [numberItems, setNumberItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(totalLives);
  const [gameOver, setGameOver] = useState(false);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [currentEmoji, setCurrentEmoji] = useState("🍎");
  const [isCompleted, setIsCompleted] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setNumberItems(shuffleArray(numberItemsOriginal));
  }, []);

  useEffect(() => {
    if (numberItems.length === 0 || currentIndex >= numberItems.length || gameOver)
      return;

    const correct = numberItems[currentIndex];
    const distractors = numberItems
      .filter((_, i) => i !== currentIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const opts = shuffleArray([correct, ...distractors]);
    setOptions(opts);
    setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    setFeedback("");
  }, [currentIndex, gameOver, numberItems]);

  useEffect(() => {
    const checkLevelCompletion = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const hindiProgress = userData.languageProgress?.Hindi?.Foundation;
          if (hindiProgress?.completedLevels?.includes(10)) {
            setIsCompleted(true);
          }
        }
      } catch (error) {
        console.error('Error checking level completion:', error);
      }
    };

    checkLevelCompletion();
  }, [currentUser]);

  const handleSelect = (selected) => {
    if (gameOver) return;

    const correct = numberItems[currentIndex];

    if (selected.number === correct.number) {
      setScore((s) => s + 1);
      setFeedback("✅ सही! (Correct!)");
      if (score + 1 >= targetCorrectMatches) {
        setGameOver(true);
        return;
      }
      setTimeout(() => {
        setCurrentIndex((idx) => idx + 1);
      }, 1000);
    } else {
      setLives((l) => l - 1);
      setFeedback("❌ गलत! (Wrong!)");
      if (lives - 1 <= 0) {
        setGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setNumberItems(shuffleArray(numberItemsOriginal));
    setCurrentIndex(0);
    setScore(0);
    setLives(totalLives);
    setGameOver(false);
    setFeedback("");
  };

  const currentNumber = numberItems[currentIndex] || {};
  const renderEmojis = (count) => currentEmoji.repeat(count);

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
            currentLevel: Math.max(currentProgress.currentLevel, 11),
            completedLevels: [...(currentProgress.completedLevels || []), 10]
          }
        });

        toast.success('Foundation Level Completed! Congratulations!');
        navigate('/languages/Hindi/Intermediate/Level1');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Number Ninja
      </h1>
      <p className="mb-4 text-center text-gray-700">
        हिंदी संख्या शब्द को सही मात्रा वाले इमोजी के साथ मिलाएं।
      </p>

      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {score >= targetCorrectMatches ? "🎉 आप जीत गए! (You won!)" : "खेल समाप्त! (Game Over!)"}
          </h2>
          <button
            onClick={resetGame}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            फिर से खेलें (Play Again)
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-4">
            <div className="text-5xl font-extrabold mb-1">{currentNumber.word}</div>
            <div className="text-xl italic mb-3 text-gray-600">
              ({currentNumber.transliteration})
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(opt)}
                className="border rounded p-6 text-4xl hover:shadow-lg focus:outline-none flex justify-center"
              >
                {renderEmojis(opt.number)}
              </button>
            ))}
          </div>

          <div className="text-center mb-4 text-lg">{feedback}</div>
          <div className="flex justify-between text-gray-700 font-semibold mb-2">
            <div>स्कोर: {score}</div>
            <div>जीवन: {lives}</div>
          </div>
        </>
      )}

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

export default NumberNinja;
