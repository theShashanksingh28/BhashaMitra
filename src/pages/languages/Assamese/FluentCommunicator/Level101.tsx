import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const vowels = [
  { symbol: 'অ', roman: 'a', pronunciation: 'o' },
  { symbol: 'আ', roman: 'aa', pronunciation: 'aa' },
  { symbol: 'ই', roman: 'i', pronunciation: 'i' },
  { symbol: 'ঈ', roman: 'ii', pronunciation: 'ii' },
  { symbol: 'উ', roman: 'u', pronunciation: 'u' },
  { symbol: 'ঊ', roman: 'uu', pronunciation: 'uu' },
  { symbol: 'ঋ', roman: 'ri', pronunciation: 'ri' },
  { symbol: 'এ', roman: 'e', pronunciation: 'e' },
  { symbol: 'ঐ', roman: 'oi', pronunciation: 'oi' },
  { symbol: 'ও', roman: 'o', pronunciation: 'o' },
  { symbol: 'ঔ', roman: 'ou', pronunciation: 'ou' }
];

const consonants = [
  { symbol: 'ক', roman: 'ka', pronunciation: 'ka' },
  { symbol: 'খ', roman: 'kha', pronunciation: 'kha' },
  { symbol: 'গ', roman: 'ga', pronunciation: 'ga' },
  { symbol: 'ঘ', roman: 'gha', pronunciation: 'gha' },
  { symbol: 'ঙ', roman: 'nga', pronunciation: 'nga' },
  { symbol: 'চ', roman: 'sa', pronunciation: 'sa' },
  { symbol: 'ছ', roman: 'saa', pronunciation: 'saa' },
  { symbol: 'জ', roman: 'za', pronunciation: 'za' },
  { symbol: 'ঝ', roman: 'zha', pronunciation: 'zha' },
  { symbol: 'ঞ', roman: 'nya', pronunciation: 'nya' },
  { symbol: 'ট', roman: 'ta', pronunciation: 'ta' },
  { symbol: 'ঠ', roman: 'tha', pronunciation: 'tha' },
  { symbol: 'ড', roman: 'da', pronunciation: 'da' },
  { symbol: 'ঢ', roman: 'dha', pronunciation: 'dha' },
  { symbol: 'ণ', roman: 'na', pronunciation: 'na' },
  { symbol: 'ত', roman: 'ta', pronunciation: 'ta' },
  { symbol: 'থ', roman: 'tha', pronunciation: 'tha' },
  { symbol: 'দ', roman: 'da', pronunciation: 'da' },
  { symbol: 'ধ', roman: 'dha', pronunciation: 'dha' },
  { symbol: 'ন', roman: 'na', pronunciation: 'na' },
  { symbol: 'প', roman: 'pa', pronunciation: 'pa' },
  { symbol: 'ফ', roman: 'pha', pronunciation: 'pha' },
  { symbol: 'ব', roman: 'ba', pronunciation: 'ba' },
  { symbol: 'ভ', roman: 'bha', pronunciation: 'bha' },
  { symbol: 'ম', roman: 'ma', pronunciation: 'ma' },
  { symbol: 'য', roman: 'za', pronunciation: 'za' },
  { symbol: 'ৰ', roman: 'ra', pronunciation: 'ra' },
  { symbol: 'ল', roman: 'la', pronunciation: 'la' },
  { symbol: 'ৱ', roman: 'wa', pronunciation: 'wa' },
  { symbol: 'শ', roman: 'xa', pronunciation: 'xa' },
  { symbol: 'ষ', roman: 'xa', pronunciation: 'xa' },
  { symbol: 'স', roman: 'xa', pronunciation: 'xa' },
  { symbol: 'হ', roman: 'ha', pronunciation: 'ha' },
  { symbol: 'ড়', roman: 'ra', pronunciation: 'ra' },
  { symbol: 'ঢ়', roman: 'rha', pronunciation: 'rha' },
  { symbol: 'য়', roman: 'ya', pronunciation: 'ya' }
];

const SymbolCard: React.FC<{ item: any; goBack: () => void }> = ({ item, goBack }) => {
  const playSound = (symbol: string) => {
    const utterance = new SpeechSynthesisUtterance(symbol);
    utterance.lang = 'as-IN'; // Assamese language code
    speechSynthesis.speak(utterance);
  };

  return (
    <motion.div 
      className="p-6 grid gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Button onClick={goBack}>&larr; Back</Button>
      <motion.div 
        className="text-center text-5xl font-bold"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {item.symbol}
      </motion.div>
      <Card>
        <CardContent className="text-center">
          <p className="text-lg mb-2">Romanized: {item.roman}</p>
          <p className="text-lg">Pronunciation: {item.pronunciation}</p>
        </CardContent>
      </Card>
      <Button 
        className="mt-4"
        onClick={() => playSound(item.symbol)}
      >
        🔊 Hear Sound
      </Button>
    </motion.div>
  );
};

const LevelOne: React.FC = () => {
  const [selected, setSelected] = useState<any | null>(null);

  return selected ? (
    <SymbolCard item={selected} goBack={() => setSelected(null)} />
  ) : (
    <div className="p-6 grid gap-4">
      <div className="grid grid-cols-5 gap-2 mb-4">
        <h2 className="col-span-5 text-xl font-bold mb-4">Vowels (স্বৰবৰ্ণ):</h2>
        {vowels.map((item) => (
          <Button 
            key={item.symbol} 
            onClick={() => setSelected(item)}
            className="text-xl p-4 hover:bg-indigo-600 hover:text-white transition-colors"
          >
            {item.symbol}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-2">
        <h2 className="col-span-5 text-xl font-bold mb-4">Consonants (ব্যঞ্জনবৰ্ণ):</h2>
        {consonants.map((item) => (
          <Button 
            key={item.symbol} 
            onClick={() => setSelected(item)}
            className="text-xl p-4 hover:bg-indigo-600 hover:text-white transition-colors"
          >
            {item.symbol}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LevelOne;

