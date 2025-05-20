import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define your level content here
interface LevelContent {
  id: string;
  title: string;
  description: string;
  items: Array<{
    id: string;
    symbol: string;
    roman: string;
    pronunciation?: string;
    example?: string;
  }>;
}

// Syllables data (with unique IDs)
const levelContent: LevelContent = {
  id: "hindi-syllables",
  title: "Hindi Syllables and Short Words",
  description: "Learn common Hindi syllables and their pronunciations",
  items: [
    { id: '1', symbol: 'का', roman: 'kaa', pronunciation: 'kaa' },
    { id: '2', symbol: 'कि', roman: 'ki', pronunciation: 'ki' },
    { id: '3', symbol: 'की', roman: 'kii', pronunciation: 'kee' },
    { id: '4', symbol: 'कु', roman: 'ku', pronunciation: 'ku' },
    { id: '5', symbol: 'कू', roman: 'kuu', pronunciation: 'koo' },
    { id: '6', symbol: 'के', roman: 'ke', pronunciation: 'kay' },
    { id: '7', symbol: 'कै', roman: 'kai', pronunciation: 'kai' },
    { id: '8', symbol: 'को', roman: 'ko', pronunciation: 'ko' },
    { id: '9', symbol: 'कौ', roman: 'kau', pronunciation: 'kow' },
    { id: '10', symbol: 'गु', roman: 'gu', pronunciation: 'goo' },
    { id: '11', symbol: 'घा', roman: 'ghaa', pronunciation: 'ghaa' },
    { id: '12', symbol: 'चा', roman: 'chaa', pronunciation: 'chaa' },
    { id: '13', symbol: 'छी', roman: 'chii', pronunciation: 'chee' },
    { id: '14', symbol: 'टु', roman: 'ṭu', pronunciation: 'ṭoo' },
    { id: '15', symbol: 'ठा', roman: 'ṭhaa', pronunciation: 'ṭhaa' },
    { id: '16', symbol: 'डू', roman: 'ḍuu', pronunciation: 'ḍoo' },
    { id: '17', symbol: 'ढे', roman: 'ḍhe', pronunciation: 'ḍhay' },
    { id: '18', symbol: 'पै', roman: 'pai', pronunciation: 'pai' },
    { id: '19', symbol: 'भा', roman: 'bhaa', pronunciation: 'bhaa' },
    { id: '20', symbol: 'मू', roman: 'muu', pronunciation: 'moo' },
    { id: '21', symbol: 'या', roman: 'yaa', pronunciation: 'yaa' },
    { id: '22', symbol: 'रु', roman: 'ru', pronunciation: 'roo' },
    { id: '23', symbol: 'लू', roman: 'luu', pronunciation: 'loo' },
    { id: '24', symbol: 'वो', roman: 'vo', pronunciation: 'voh' },
    { id: '25', symbol: 'शै', roman: 'shai', pronunciation: 'shai' },
    { id: '26', symbol: 'सौ', roman: 'sau', pronunciation: 'sow' },
    { id: '27', symbol: 'हू', roman: 'huu', pronunciation: 'hoo' },
    { id: '28', symbol: 'ना', roman: 'naa', pronunciation: 'naa' },
    { id: '29', symbol: 'नी', roman: 'nii', pronunciation: 'nee' },
    { id: '30', symbol: 'नु', roman: 'nu', pronunciation: 'noo' },
    { id: '31', symbol: 'पे', roman: 'pe', pronunciation: 'peh' },
    { id: '32', symbol: 'पो', roman: 'po', pronunciation: 'poh' },
    { id: '33', symbol: 'फा', roman: 'faa', pronunciation: 'faa' },
    { id: '34', symbol: 'फी', roman: 'fii', pronunciation: 'fee' },
    { id: '35', symbol: 'बु', roman: 'bu', pronunciation: 'boo' },
    { id: '36', symbol: 'भू', roman: 'bhuu', pronunciation: 'bhoo' },
    { id: '37', symbol: 'मी', roman: 'mii', pronunciation: 'mee' },
    { id: '38', symbol: 'मा', roman: 'maa', pronunciation: 'maa' },
    { id: '39', symbol: 'सू', roman: 'suu', pronunciation: 'soo' },
    { id: '40', symbol: 'से', roman: 'se', pronunciation: 'say' },
    { id: '41', symbol: 'सो', roman: 'so', pronunciation: 'soh' },
    { id: '42', symbol: 'हो', roman: 'ho', pronunciation: 'hoh' },
    { id: '43', symbol: 'हा', roman: 'haa', pronunciation: 'haa' },
    { id: '44', symbol: 'ली', roman: 'lii', pronunciation: 'lee' },
    { id: '45', symbol: 'ला', roman: 'laa', pronunciation: 'laa' },
    { id: '46', symbol: 'टे', roman: 'ṭe', pronunciation: 'ṭay' },
    { id: '47', symbol: 'टो', roman: 'ṭo', pronunciation: 'ṭoh' },
    { id: '48', symbol: 'दू', roman: 'duu', pronunciation: 'doo' }
  ]
};

interface ContentCardProps {
  item: LevelContent['items'][0];
  goBack: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, goBack }) => {
  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
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

const LevelTwo: React.FC = () => {
  const [selected, setSelected] = useState<LevelContent['items'][0] | null>(null);
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
          if (hindiProgress?.completedLevels?.includes(2)) {
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
            currentLevel: Math.max(currentProgress.currentLevel, 3),
            completedLevels: [...(currentProgress.completedLevels || []), 2]
          }
        });

        toast.success('Level completed! Moving to next level...');
        navigate('/languages/Hindi/Foundation/level3');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  return selected ? (
    <ContentCard item={selected} goBack={() => setSelected(null)} />
  ) : (
    <div className="p-6 grid gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{levelContent.title}</h2>
        <p className="mb-4 text-lg text-gray-700">{levelContent.description}</p>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {levelContent.items.map((item) => (
          <Button key={item.id} onClick={() => setSelected(item)} className="text-lg p-4">
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

export default LevelTwo;
