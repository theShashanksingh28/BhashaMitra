import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const vowels = [
  { symbol: '\u0905', roman: 'a', pronunciation: 'uh' },
  { symbol: '\u0906', roman: 'aa', pronunciation: 'aah' },
  { symbol: '\u0907', roman: 'i', pronunciation: 'ee' },
  { symbol: '\u0908', roman: 'ii', pronunciation: 'eeh' },
  { symbol: '\u0909', roman: 'u', pronunciation: 'oo' },
  { symbol: '\u090a', roman: 'uu', pronunciation: 'ooh' },
  { symbol: '\u090f', roman: 'e', pronunciation: 'ay' },
  { symbol: '\u0910', roman: 'ai', pronunciation: 'ai' },
  { symbol: '\u0913', roman: 'o', pronunciation: 'oh' },
  { symbol: '\u0914', roman: 'au', pronunciation: 'aw' }
];

const consonants = [
  { symbol: '\u0915', roman: 'ka', pronunciation: 'ka' },
  { symbol: '\u0916', roman: 'kha', pronunciation: 'kha' },
  { symbol: '\u0917', roman: 'ga', pronunciation: 'ga' },
  { symbol: '\u0918', roman: 'gha', pronunciation: 'gha' },
  { symbol: '\u0919', roman: 'nga', pronunciation: 'nga' },
  { symbol: '\u091a', roman: 'cha', pronunciation: 'cha' },
  { symbol: '\u091b', roman: 'chha', pronunciation: 'chha' },
  { symbol: '\u091c', roman: 'ja', pronunciation: 'ja' },
  { symbol: '\u091d', roman: 'jha', pronunciation: 'jha' },
  { symbol: '\u091e', roman: 'nya', pronunciation: 'nya' },
  { symbol: '\u091f', roman: '\u1e6da', pronunciation: '\u1e6da' },
  { symbol: '\u0920', roman: '\u1e6dha', pronunciation: '\u1e6dha' },
  { symbol: '\u0921', roman: '\u1e0da', pronunciation: '\u1e0da' },
  { symbol: '\u0922', roman: '\u1e0dha', pronunciation: '\u1e0dha' },
  { symbol: '\u0923', roman: '\u1e47a', pronunciation: '\u1e47a' },
  { symbol: '\u0924', roman: 'ta', pronunciation: 'ta' },
  { symbol: '\u0925', roman: 'tha', pronunciation: 'tha' },
  { symbol: '\u0926', roman: 'da', pronunciation: 'da' },
  { symbol: '\u0927', roman: 'dha', pronunciation: 'dha' },
  { symbol: '\u0928', roman: 'na', pronunciation: 'na' },
  { symbol: '\u092a', roman: 'pa', pronunciation: 'pa' },
  { symbol: '\u092b', roman: 'pha', pronunciation: 'pha' },
  { symbol: '\u092c', roman: 'ba', pronunciation: 'ba' },
  { symbol: '\u092d', roman: 'bha', pronunciation: 'bha' },
  { symbol: '\u092e', roman: 'ma', pronunciation: 'ma' },
  { symbol: '\u092f', roman: 'ya', pronunciation: 'ya' },
  { symbol: '\u0930', roman: 'ra', pronunciation: 'ra' },
  { symbol: '\u0932', roman: 'la', pronunciation: 'la' },
  { symbol: '\u0935', roman: 'va', pronunciation: 'va' },
  { symbol: '\u0936', roman: 'sha', pronunciation: 'sha' },
  { symbol: '\u0937', roman: '\u1e63a', pronunciation: '\u1e63a' },
  { symbol: '\u0938', roman: 'sa', pronunciation: 'sa' },
  { symbol: '\u0939', roman: 'ha', pronunciation: 'ha' }
];

const SymbolCard = ({ item, goBack }) => {
  const playSound = (symbol) => {
    const utterance = new window.SpeechSynthesisUtterance(symbol);
    utterance.lang = 'hi-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div className="p-6 grid gap-4">
      <Button onClick={goBack}>&larr; Back</Button>
      <motion.div className="text-center text-5xl font-bold">{item.symbol}</motion.div>
      <Card>
        <CardContent className="text-center">
          <p>Romanized: {item.roman}</p>
          <p>Pronunciation: {item.pronunciation}</p>
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={() => playSound(item.symbol)}>
        🔊 Hear Sound
      </Button>
    </motion.div>
  );
};

const LevelOne = () => {
  const [selected, setSelected] = useState(null);
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
          if (hindiProgress?.completedLevels?.includes(1)) {
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
            currentLevel: Math.max(currentProgress.currentLevel, 2), // Move to level 2
            completedLevels: [...(currentProgress.completedLevels || []), 1]
          }
        });

        toast.success('Level completed! Moving to next level...');
        // Navigate to level 2 with correct case
        navigate('/languages/Hindi/Foundation/level2');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  return selected ? (
    <SymbolCard item={selected} goBack={() => setSelected(null)} />
  ) : (
    <div className="p-6 grid gap-4">
      <div className="grid grid-cols-5 gap-2 mb-4">
        <h2 className="col-span-5 text-xl font-bold">Vowels:</h2>
        {vowels.map((item) => (
          <Button key={item.symbol} onClick={() => setSelected(item)}>
            {item.symbol}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        <h2 className="col-span-5 text-xl font-bold">Consonants:</h2>
        {consonants.map((item) => (
          <Button key={item.symbol} onClick={() => setSelected(item)}>
            {item.symbol}
          </Button>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Button 
          onClick={() => navigate('/languages/Hindi/Foundation/levels')}
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
    </div>
  );
};

export default LevelOne;

