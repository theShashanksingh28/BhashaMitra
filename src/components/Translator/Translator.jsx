import React, { useState } from 'react';
import { translateText, getWordMeaning } from './translatorUtils';
import './translator.css';

const Translator = () => {
  const [input, setInput] = useState('');
  const [translated, setTranslated] = useState('');
  const [meaning, setMeaning] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleTranslate = async () => {
    const translation = await translateText(input);
    setTranslated(translation);

    const word = input.split(' ')[0]; // Get first word for meaning
    const wordMeaning = await getWordMeaning(word);
    setMeaning(wordMeaning);

    speak(translation);
  };

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'hi-IN';
    speechSynthesis.speak(utter);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    setIsListening(true);

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      handleTranslate();
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="translator-container">
      <h2>🗣️ English to Hindi Translator (Free)</h2>
      <textarea
        placeholder="Type or speak something in English..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="translator-actions">
        <button onClick={handleTranslate}>Translate</button>
        <button onClick={startListening}>
          {isListening ? 'Listening...' : '🎤 Speak'}
        </button>
      </div>

      {translated && (
        <div className="translator-output">
          <h3>Hindi Translation:</h3>
          <p>{translated}</p>
        </div>
      )}

      {meaning && (
        <div className="translator-output">
          <h3>Meaning of "{input.split(' ')[0]}" in English:</h3>
          <p>{meaning}</p>
        </div>
      )}
    </div>
  );
};

export default Translator;
