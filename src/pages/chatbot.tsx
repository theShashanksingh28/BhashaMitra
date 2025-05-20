import React, { useState, useRef, useEffect } from "react";

interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  onstart: (event: Event) => void;
  onerror: (event: Event) => void;
  onend: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const DictionaryTranslatorChatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Enter any English word to get its meaning and Hindi translation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = (text: string, lang = "hi-IN") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const fetchMeaning = async (word: string) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) throw new Error("Word not found");
      const data = await response.json();
      return (
        data[0]?.meanings[0]?.definitions[0]?.definition ||
        "No definition found"
      );
    } catch (error) {
      return `Couldn't find meaning: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const fetchTranslation = async (text: string) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|hi`
      );
      if (!response.ok) throw new Error("Translation failed");
      const data = await response.json();
      return data.responseData.translatedText || "No translation found";
    } catch (error) {
      return `Couldn't translate: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const word = input.trim().toLowerCase();
    const userMessage = { sender: "user", text: word };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const [meaning, translation] = await Promise.all([
        fetchMeaning(word),
        fetchTranslation(word),
      ]);

      const botResponses = [
        { sender: "bot", text: `Meaning: ${meaning}` },
        { 
          sender: "bot", 
          text: `Hindi Translation: ${translation}`,
          translation: translation // Store translation separately for speaking
        },
      ];

      setMessages((prev) => [...prev, ...botResponses]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSpeakHindi = (text: string) => {
    // Extract just the Hindi text (remove "Hindi Translation:" prefix if present)
    const hindiText = text.replace(/^Hindi Translation:\s*/i, '');
    speak(hindiText, "hi-IN");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
              {msg.text.includes("Hindi Translation:") && (
                <button
                  onClick={() => handleSpeakHindi(msg.text)}
                  className="ml-2 p-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                  title="Listen to Hindi pronunciation"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 italic">Loading...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex gap-2"
      >
        <input
          type="text"
          placeholder="Enter an English word..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        />
        <button
          type="button"
          onClick={startListening}
          disabled={loading}
          className={`p-2 rounded-lg ${
            listening ? "bg-yellow-500" : "bg-green-500"
          } text-white hover:opacity-90 transition-colors`}
          title="Click to speak"
        >
          🎤
        </button>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`px-4 py-2 rounded-lg ${
            loading || !input.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white transition-colors`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default DictionaryTranslatorChatbot;