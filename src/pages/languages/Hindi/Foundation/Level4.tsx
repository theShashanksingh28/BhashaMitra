import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Optional: use default <button> if needed
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Type Declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

type Word = {
  phrase: string;
  roman: string;
  meaning: string;
};

type DrillCardProps = {
  item: Word;
  goBack: () => void;
  goNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

const playSound = (phrase: string) => {
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
};

const DrillCard: React.FC<DrillCardProps> = ({ item, goBack, goNext, hasPrevious, hasNext }) => {
  const [feedback, setFeedback] = useState('');
  const [spokenText, setSpokenText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setRecognitionSupported(isSupported);
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const normalizeHindiText = (text: string): string =>
    text
      .normalize('NFD')
      .replace(/\u094D/g, '')
      .replace(/\u200D/g, '')
      .replace(/\u200C/g, '')
      .replace(/[\u0964\u0965]/g, '')
      .replace(/\s+/g, '')
      .toLowerCase();

  const startRecognition = () => {
    if (!recognitionSupported) {
      setFeedback('Speech recognition not supported in your browser');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognitionRef.current = recognition;

    setFeedback('🎤 Listening...');
    setSpokenText('');
    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results[0];
      let matched = false;
      let bestMatch = '';

      for (let i = 0; i < results.length; i++) {
        const spokenPhrase = results[i].transcript.trim();
        setSpokenText(spokenPhrase);

        const normalizedSpoken = normalizeHindiText(spokenPhrase);
        const normalizedExpected = normalizeHindiText(item.phrase);

        if (normalizedSpoken === normalizedExpected) {
          matched = true;
          bestMatch = spokenPhrase;
          break;
        }
      }

      setFeedback(matched ? '✅ Well Done!' : '❌ Try Again');
      setSpokenText(bestMatch || spokenText);
      setIsRecording(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setFeedback(`❌ ${getErrorDescription(event.error)}`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecording) {
        setFeedback('❌ Timeout. Please try again.');
        setIsRecording(false);
      }
    };
  };

  const getErrorDescription = (error: string): string => {
    const errors: Record<string, string> = {
      'no-speech': 'No speech detected',
      'audio-capture': 'Audio capture failed',
      'not-allowed': 'Microphone access denied',
    };
    return errors[error] || 'Recognition failed';
  };

  return (
    <motion.div
      className="p-6 grid gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between">
        <button
          onClick={goBack}
          disabled={!hasPrevious}
          className={`px-4 py-2 rounded ${
            hasPrevious ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
          } text-white`}
        >
          ← Previous
        </button>
        <button
          onClick={goNext}
          disabled={!hasNext}
          className={`px-4 py-2 rounded ${
            hasNext ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
          } text-white`}
        >
          Next →
        </button>
      </div>

      <motion.div className="text-center text-5xl font-bold my-4">
        {item.phrase}
      </motion.div>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-2 text-center">Romanized: {item.roman}</p>
        <p className="text-lg text-center">Meaning: {item.meaning}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <button
          onClick={() => playSound(item.phrase)}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          🔊 Hear Pronunciation
        </button>

        <button
          onClick={startRecognition}
          disabled={isRecording}
          className={`px-6 py-3 rounded transition-colors ${
            isRecording ? 'bg-yellow-500' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isRecording ? '🎙 Listening...' : '🎙 Practice Speaking'}
        </button>
      </div>

      {feedback && (
        <motion.p
          className="text-center mt-4 font-semibold"
          animate={{ scale: [1, 1.1, 1] }}
        >
          {feedback}
        </motion.p>
      )}

      {spokenText && (
        <p className="text-center text-gray-700 mt-2">You said: "{spokenText}"</p>
      )}
    </motion.div>
  );
};

const LevelFour: React.FC = () => {
  const words: Word[] = [
    { phrase: 'पानी', roman: 'Pani', meaning: 'Water' },
    { phrase: 'खाना', roman: 'Khaana', meaning: 'Food' },
    { phrase: 'किताब', roman: 'Kitaab', meaning: 'Book' },
    { phrase: 'दोस्त', roman: 'Dost', meaning: 'Friend' },
    { phrase: 'घर', roman: 'Ghar', meaning: 'House' },
    { phrase: 'स्कूल', roman: 'School', meaning: 'School' },
    { phrase: 'माँ', roman: 'Maa', meaning: 'Mother' },
    { phrase: 'पिता', roman: 'Pita', meaning: 'Father' },
    { phrase: 'भाई', roman: 'Bhai', meaning: 'Brother' },
    { phrase: 'बहन', roman: 'Behan', meaning: 'Sister' }
    // Add more words if needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
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
          if (hindiProgress?.completedLevels?.includes(4)) {
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
            currentLevel: Math.max(currentProgress.currentLevel, 5),
            completedLevels: [...(currentProgress.completedLevels || []), 4]
          }
        });

        toast.success('Level completed! Moving to next level...');
        navigate('/languages/Hindi/Foundation/Level5');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to save progress. Please try again.');
    }
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < words.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl">
        <DrillCard
          item={words[currentIndex]}
          goBack={goBack}
          goNext={goNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < words.length - 1}
        />
<div className="mt-8 flex justify-center gap-4">
        <Button 
          onClick={() => navigate('/languages/Hindi/foundation/levels')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
        >
          ← Back to Levels
        </Button>          <Button 
            onClick={handleCompleteLevel}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
            disabled={isCompleted}
          >
            {isCompleted ? 'Level Completed ✓' : 'Complete Level & Move to Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LevelFour;
