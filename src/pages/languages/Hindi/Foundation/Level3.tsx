import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const words = [
  { phrase: 'पानी', roman: 'Pani', meaning: 'Water' },
  { phrase: 'खाना', roman: 'Khaana', meaning: 'Food' },
  { phrase: 'किताब', roman: 'Kitaab', meaning: 'Book' },
  { phrase: 'दोस्त', roman: 'Dost', meaning: 'Friend' },
  { phrase: 'घर', roman: 'Ghar', meaning: 'House' },
  { phrase: 'स्कूल', roman: 'School', meaning: 'School' },
  { phrase: 'माँ', roman: 'Maa', meaning: 'Mother' },
  { phrase: 'पिता', roman: 'Pita', meaning: 'Father' },
  { phrase: 'सूरज', roman: 'Sooraj', meaning: 'Sun' },
  { phrase: 'चाँद', roman: 'Chaand', meaning: 'Moon' },
  { phrase: 'फूल', roman: 'Phool', meaning: 'Flower' },
  { phrase: 'पेड़', roman: 'Ped', meaning: 'Tree' },
  { phrase: 'कुत्ता', roman: 'Kutta', meaning: 'Dog' },
  { phrase: 'बिल्ली', roman: 'Billi', meaning: 'Cat' },
  { phrase: 'गाड़ी', roman: 'Gaadi', meaning: 'Car' },
  { phrase: 'सड़क', roman: 'Sadak', meaning: 'Road' },
  { phrase: 'समय', roman: 'Samay', meaning: 'Time' },
  { phrase: 'दुकान', roman: 'Dukaan', meaning: 'Shop' },
  { phrase: 'खेल', roman: 'Khel', meaning: 'Game' },
  { phrase: 'संगीत', roman: 'Sangeet', meaning: 'Music' },
  { phrase: 'बाजार', roman: 'Bazaar', meaning: 'Market' },
  { phrase: 'कमरा', roman: 'Kamra', meaning: 'Room' },
  { phrase: 'दरवाजा', roman: 'Darwaaza', meaning: 'Door' },
  { phrase: 'खिड़की', roman: 'Khirki', meaning: 'Window' },
  { phrase: 'बिजली', roman: 'Bijli', meaning: 'Electricity' },
  { phrase: 'आसमान', roman: 'Aasmaan', meaning: 'Sky' },
  { phrase: 'समुद्र', roman: 'Samudra', meaning: 'Ocean' },
  { phrase: 'पहाड़', roman: 'Pahaad', meaning: 'Mountain' },
  { phrase: 'नदी', roman: 'Nadi', meaning: 'River' },
  { phrase: 'चिड़िया', roman: 'Chidiya', meaning: 'Bird' }
];

const WordCard: React.FC<{ item: any; goBack: () => void }> = ({ item, goBack }) => {
  const playSound = (phrase: string) => {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'hi-IN';
    speechSynthesis.speak(utterance);
  };

  return (
    <motion.div className="p-6 grid gap-4">
      <Button onClick={goBack}>&larr; Back</Button>
      <motion.div className="text-center text-5xl font-bold">{item.phrase}</motion.div>
      <Card>
        <CardContent className="text-center">
          <p>Romanized: {item.roman}</p>
          <p>Meaning: {item.meaning}</p>
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={() => playSound(item.phrase)}>
        🔊 Hear Sound
      </Button>
    </motion.div>
  );
};

const LevelThree: React.FC = () => {
  const [selected, setSelected] = useState<any | null>(null);

  return selected ? (
    <WordCard item={selected} goBack={() => setSelected(null)} />
  ) : (
    <div className="p-6 grid gap-4">
      <div className="grid grid-cols-2 gap-2 mb-4">
        <h2 className="col-span-2 text-xl font-bold">Learn Basic Words:</h2>
        {words.map((item) => (
          <Button key={item.phrase} onClick={() => setSelected(item)}>
            {item.phrase}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LevelThree;

