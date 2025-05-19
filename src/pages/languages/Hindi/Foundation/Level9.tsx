import React, { useState } from "react";

const qaLessons = [
  {
    question: { text: "यह क्या है?", meaning: "What is this?", pronunciation: "Yeh kya hai?" },
    answer: { text: "यह घर है।", meaning: "This is a house.", pronunciation: "Yeh ghar hai." },
  },
  {
    question: { text: "तुम कौन हो?", meaning: "Who are you?", pronunciation: "Tum kaun ho?" },
    answer: { text: "मैं छात्र हूँ।", meaning: "I am a student.", pronunciation: "Main chaatr hoon." },
  },
  {
    question: { text: "यह कितना बड़ा है?", meaning: "How big is this?", pronunciation: "Yeh kitna bada hai?" },
    answer: { text: "यह बड़ा है।", meaning: "It is big.", pronunciation: "Yeh bada hai." },
  },
  {
    question: { text: "तुम्हें पानी चाहिए?", meaning: "Do you want water?", pronunciation: "Tumhein paani chahiye?" },
    answer: { text: "हाँ, मुझे पानी चाहिए।", meaning: "Yes, I want water.", pronunciation: "Haan, mujhe paani chahiye." },
  },
  {
    question: { text: "यह क्या रंग है?", meaning: "What color is this?", pronunciation: "Yeh kya rang hai?" },
    answer: { text: "यह लाल है।", meaning: "It is red.", pronunciation: "Yeh laal hai." },
  },
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

const Level9BhashaMitra = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Bhasha Mitra - Level 9: Basic Questions & Answers</h1>

      <p className="mb-8 text-center text-gray-700">
        Learn how to form basic Hindi questions and their answers. Listen to pronunciations and understand meanings.
      </p>

      {qaLessons.map(({ question, answer }, idx) => (
        <div
          key={idx}
          className="mb-8 p-4 border rounded bg-gray-50 shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">
            प्रश्न (Question):
          </h2>
          <div className="flex items-center gap-4 mb-1">
            <div className="text-2xl font-bold">{question.text}</div>
            <button
              onClick={() => speakHindi(question.pronunciation)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              🔊 सुनें
            </button>
          </div>
          <div className="text-gray-600 italic mb-4">Meaning: {question.meaning}</div>

          <h2 className="text-xl font-semibold mb-2 text-green-700">
            उत्तर (Answer):
          </h2>
          <div className="flex items-center gap-4 mb-1">
            <div className="text-2xl font-bold">{answer.text}</div>
            <button
              onClick={() => speakHindi(answer.pronunciation)}
              className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded"
            >
              🔊 सुनें
            </button>
          </div>
          <div className="text-gray-600 italic">Meaning: {answer.meaning}</div>
        </div>
      ))}
    </div>
  );
};

export default Level9BhashaMitra;
