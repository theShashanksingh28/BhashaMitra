import React, { useState } from "react";

const numbers = [
  { num: "१", word: "एक", meaning: "1", pronunciation: "ek" },
  { num: "२", word: "दो", meaning: "2", pronunciation: "do" },
  { num: "३", word: "तीन", meaning: "3", pronunciation: "teen" },
  { num: "४", word: "चार", meaning: "4", pronunciation: "chaar" },
  { num: "५", word: "पांच", meaning: "5", pronunciation: "paanch" },
  { num: "६", word: "छह", meaning: "6", pronunciation: "chhah" },
  { num: "७", word: "सात", meaning: "7", pronunciation: "saat" },
  { num: "८", word: "आठ", meaning: "8", pronunciation: "aath" },
  { num: "९", word: "नौ", meaning: "9", pronunciation: "nau" },
  { num: "१०", word: "दस", meaning: "10", pronunciation: "das" },
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

const Level6BhashaMitra = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [userCount, setUserCount] = useState("");
  const [message, setMessage] = useState("");

  const handleNumberSelect = (numObj) => {
    setSelectedNumber(numObj);
    setUserCount("");
    setMessage("");
  };

  const checkCount = () => {
    if (!selectedNumber) return;

    if (userCount.trim() === selectedNumber.meaning) {
      setMessage("✅ Correct! Well done.");
    } else {
      setMessage(`❌ Incorrect. Try counting ${selectedNumber.meaning} objects.`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Bhasha Mitra - Level 6</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Learn Hindi Numbers 1 to 10</h2>
        <div className="grid grid-cols-5 gap-4">
          {numbers.map(({ num, word, pronunciation, meaning }) => (
            <div
              key={num}
              className="border p-3 rounded text-center cursor-pointer hover:bg-blue-100"
              onClick={() => {
                handleNumberSelect({ num, word, pronunciation, meaning });
                speakHindi(word);
              }}
              title={`Hear pronunciation of ${word}`}
            >
              <div className="text-2xl font-bold mb-1">{word}</div>
              <div className="text-lg text-gray-700 mb-1">({num})</div>
              <div className="text-lg font-semibold">{meaning}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakHindi(word);
                }}
                className="text-xs mt-1 bg-blue-200 px-2 rounded hover:bg-blue-400"
              >
                🔊 Pronounce
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedNumber && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Counting Practice</h3>
          <p className="mb-2">
            Count out loud and enter the number of objects for <strong>{selectedNumber.word}</strong> ({selectedNumber.num}).
          </p>

          <input
            type="text"
            value={userCount}
            onChange={(e) => setUserCount(e.target.value)}
            placeholder="Enter number in digits"
            className="border rounded px-3 py-2 w-full mb-3"
          />
          <button
            onClick={checkCount}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Check
          </button>

          {message && (
            <div
              className={`mt-3 font-semibold ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </section>
      )}

      <section className="text-center mt-8">
        <button
          onClick={() => alert("Great job! Keep practicing Hindi numbers!")}
          className="bg-purple-600 text-white px-6 py-3 rounded text-lg hover:bg-purple-800"
        >
          Finish Level 6
        </button>
      </section>
    </div>
  );
};

export default Level6BhashaMitra;
