import React, { useState } from "react";

const newConsonants = [
  {
    cluster: "त्र",
    pronunciation: "tra",
    examples: [
      { word: "पत्र", meaning: "Letter", pronunciation: "patra" },
      { word: "मित्र", meaning: "Friend", pronunciation: "mitra" },
    ],
  },
  {
    cluster: "ज्ञ",
    pronunciation: "gya",
    examples: [
      { word: "ज्ञान", meaning: "Knowledge", pronunciation: "gyaan" },
      { word: "विद्याज्ञ", meaning: "Scholar", pronunciation: "vidya-gya" },
    ],
  },
  {
    cluster: "क्ष",
    pronunciation: "ksha",
    examples: [
      { word: "क्षत्रिय", meaning: "Warrior class", pronunciation: "kshatriya" },
      { word: "दक्षिण", meaning: "South", pronunciation: "dakshin" },
    ],
  },
  {
    cluster: "श्र",
    pronunciation: "shra",
    examples: [
      { word: "श्रम", meaning: "Effort", pronunciation: "shram" },
      { word: "श्रद्धा", meaning: "Faith", pronunciation: "shraddha" },
    ],
  },
];

// Function to speak with Hindi-like accent
const speakHindi = (text) => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance();

  // For better Hindi accent, try to pick Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const hindiVoice = voices.find(
    (v) => v.lang.startsWith("hi") || v.name.toLowerCase().includes("hindi")
  );

  utterance.voice = hindiVoice || voices[0]; // fallback to first voice if Hindi not found
  utterance.rate = 0.9; // slightly slower for clarity
  utterance.pitch = 1.1; // slightly higher pitch for natural feel

  utterance.text = text;

  window.speechSynthesis.speak(utterance);
};

const Level5BhashaMitra = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Bhasha Mitra - Level 5</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">New Consonant Clusters</h2>
        <div className="flex flex-wrap gap-4">
          {newConsonants.map(({ cluster }, i) => (
            <div
              key={i}
              className="border p-3 rounded w-20 text-center cursor-pointer hover:bg-green-100"
              onClick={() => speakHindi(cluster)}
              title={`Hear pronunciation of ${cluster}`}
            >
              <div className="text-3xl font-bold mb-1">{cluster}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakHindi(cluster);
                }}
                className="text-sm mt-1 bg-green-200 px-2 rounded hover:bg-green-400"
              >
                🔊 Pronounce
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Example Words Using New Consonants</h2>
        <div className="space-y-4">
          {newConsonants.map(({ cluster, examples }) => (
            <div key={cluster} className="mb-2">
              <h3 className="font-semibold text-lg mb-1">Words with "{cluster}"</h3>
              <div className="flex flex-wrap gap-3">
                {examples.map(({ word, meaning }) => (
                  <div
                    key={word}
                    className="border rounded p-3 w-40 text-center bg-yellow-50"
                  >
                    <div className="text-2xl font-bold">{word}</div>
                    <div className="italic text-sm mb-1">{meaning}</div>
                    <button
                      onClick={() => speakHindi(word)}
                      className="text-sm bg-yellow-200 px-2 rounded hover:bg-yellow-400"
                      title={`Hear pronunciation of ${word}`}
                    >
                      🔊 Pronounce
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-8">
        <button
          onClick={() => alert("Great job! Keep practicing your consonants.")}
          className="bg-purple-600 text-white px-6 py-3 rounded text-lg hover:bg-purple-800"
        >
          Finish Level 5
        </button>
      </section>
    </div>
  );
};

export default Level5BhashaMitra;
