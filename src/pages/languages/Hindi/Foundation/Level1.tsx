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
  { symbol: 'अ', roman: 'a', pronunciation: 'uh' },
  { symbol: 'आ', roman: 'aa', pronunciation: 'aah' },
  { symbol: 'इ', roman: 'i', pronunciation: 'ee' },
  { symbol: 'ई', roman: 'ii', pronunciation: 'eeh' },
  { symbol: 'उ', roman: 'u', pronunciation: 'oo' },
  { symbol: 'ऊ', roman: 'uu', pronunciation: 'ooh' },
  { symbol: 'ए', roman: 'e', pronunciation: 'ay' },
  { symbol: 'ऐ', roman: 'ai', pronunciation: 'ai' },
  { symbol: 'ओ', roman: 'o', pronunciation: 'oh' },
  { symbol: 'औ', roman: 'au', pronunciation: 'aw' }
];

const consonants = [
  { symbol: 'क', roman: 'ka', pronunciation: 'ka' },
  { symbol: 'ख', roman: 'kha', pronunciation: 'kha' },
  { symbol: 'ग', roman: 'ga', pronunciation: 'ga' },
  { symbol: 'घ', roman: 'gha', pronunciation: 'gha' },
  { symbol: 'ङ', roman: 'nga', pronunciation: 'nga' },
  { symbol: 'च', roman: 'cha', pronunciation: 'cha' },
  { symbol: 'छ', roman: 'chha', pronunciation: 'chha' },
  { symbol: 'ज', roman: 'ja', pronunciation: 'ja' },
  { symbol: 'झ', roman: 'jha', pronunciation: 'jha' },
  { symbol: 'ञ', roman: 'nya', pronunciation: 'nya' },
  { symbol: 'ट', roman: 'ṭa', pronunciation: 'ṭa' },
  { symbol: 'ठ', roman: 'ṭha', pronunciation: 'ṭha' },
  { symbol: 'ड', roman: 'ḍa', pronunciation: 'ḍa' },
  { symbol: 'ढ', roman: 'ḍha', pronunciation: 'ḍha' },
  { symbol: 'ण', roman: 'ṇa', pronunciation: 'ṇa' },
  { symbol: 'त', roman: 'ta', pronunciation: 'ta' },
  { symbol: 'थ', roman: 'tha', pronunciation: 'tha' },
  { symbol: 'द', roman: 'da', pronunciation: 'da' },
  { symbol: 'ध', roman: 'dha', pronunciation: 'dha' },
  { symbol: 'न', roman: 'na', pronunciation: 'na' },
  { symbol: 'प', roman: 'pa', pronunciation: 'pa' },
  { symbol: 'फ', roman: 'pha', pronunciation: 'pha' },
  { symbol: 'ब', roman: 'ba', pronunciation: 'ba' },
  { symbol: 'भ', roman: 'bha', pronunciation: 'bha' },
  { symbol: 'म', roman: 'ma', pronunciation: 'ma' },
  { symbol: 'य', roman: 'ya', pronunciation: 'ya' },
  { symbol: 'र', roman: 'ra', pronunciation: 'ra' },
  { symbol: 'ल', roman: 'la', pronunciation: 'la' },
  { symbol: 'व', roman: 'va', pronunciation: 'va' },
  { symbol: 'श', roman: 'sha', pronunciation: 'sha' },
  { symbol: 'ष', roman: 'ṣa', pronunciation: 'ṣa' },
  { symbol: 'स', roman: 'sa', pronunciation: 'sa' },
  { symbol: 'ह', roman: 'ha', pronunciation: 'ha' }
];

const SymbolCard: React.FC<{ item: any; goBack: () => void }> = ({ item, goBack }) => {
  const playSound = (symbol: string) => {
    const utterance = new SpeechSynthesisUtterance(symbol);
    utterance.lang = 'hi-IN';
    speechSynthesis.speak(utterance);
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

const LevelOne: React.FC = () => {
  const [selected, setSelected] = useState<any | null>(null);
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

