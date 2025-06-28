import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

const SymbolCard = ({ item, goBack }) => {
  const playSound = (symbol) => {
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

const LevelOne = () => {
  const [selected, setSelected] = useState(null);

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
    </div>
  );
};

export default LevelOne;

