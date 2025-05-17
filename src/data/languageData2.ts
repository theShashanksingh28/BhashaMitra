// Additional language data
import { Language } from './languageData';

const languageData2: Language[] = [
  {
    name: "Bengali",
    nativeName: "বাংলা",
    levels: [
      {
        name: "Foundations",
        content: [
          { text: "স্বরবর্ণ (Vowels):", audio: "/audio/bengali/vowels-intro.mp3" },
          { text: "অ, আ, ই, ঈ, উ, ঊ, ঋ, এ, ঐ, ও, ঔ", audio: "/audio/bengali/vowels.mp3" },
          { text: "ব্যঞ্জনবর্ণ (Consonants):", audio: "/audio/bengali/consonants-intro.mp3" },
          { text: "ক, খ, গ, ঘ, ঙ", audio: "/audio/bengali/consonants-1.mp3" },
          { text: "চ, ছ, জ, ঝ, ঞ", audio: "/audio/bengali/consonants-2.mp3" },
          { text: "ট, ঠ, ড, ঢ, ণ", audio: "/audio/bengali/consonants-3.mp3" },
          { text: "ত, থ, দ, ধ, ন", audio: "/audio/bengali/consonants-4.mp3" },
          { text: "প, ফ, ব, ভ, ম", audio: "/audio/bengali/consonants-5.mp3" },
          { text: "য, র, ল, শ, ষ, স, হ", audio: "/audio/bengali/consonants-6.mp3" },
          { text: "ক্ষ, ত্র, জ্ঞ", audio: "/audio/bengali/consonants-7.mp3" }
        ]
      },
      {
        name: "Basic Words & Phrases",
        content: [
          { text: "নমস্কার (Hello)", audio: "/audio/bengali/hello.mp3" },
          { text: "ধন্যবাদ (Thank you)", audio: "/audio/bengali/thank-you.mp3" },
          { text: "দয়া করে (Please)", audio: "/audio/bengali/please.mp3" },
          { text: "হ্যাঁ (Yes)", audio: "/audio/bengali/yes.mp3" },
          { text: "না (No)", audio: "/audio/bengali/no.mp3" }
        ]
      },
      {
        name: "Sentence Building",
        content: [
          { text: "আমি একজন ছাত্র। (I am a student)", audio: "/audio/bengali/i-am-student.mp3" },
          { text: "এটা একটি বই। (This is a book)", audio: "/audio/bengali/this-is-book.mp3" }
        ]
      },
      {
        name: "Intermediate Conversations",
        content: [
          { text: "আপনার নাম কি? (What is your name?)", audio: "/audio/bengali/what-is-your-name.mp3" },
          { text: "আপনি কেমন আছেন? (How are you?)", audio: "/audio/bengali/how-are-you.mp3" }
        ]
      },
      {
        name: "Advanced Topics",
        content: [
          { text: "আমি আগামীকাল বাজারে যাব। (I will be going to the market tomorrow.)", audio: "/audio/bengali/going-to-market.mp3" }
        ],
        locked: true
      },
      {
        name: "Common Expressions",
        content: [
          { text: "আমি জানি না। (I don't know.)", audio: "/audio/bengali/i-dont-know.mp3" }
        ],
        locked: true
      },
      {
        name: "Cultural Phrases",
        content: [
          { text: "নমস্কার (Traditional Greeting)", audio: "/audio/bengali/traditional-greeting.mp3" }
        ],
        locked: true
      },
      {
        name: "Travel Phrases",
        content: [
          { text: "রেল স্টেশন কোথায়? (Where is the railway station?)", audio: "/audio/bengali/where-is-station.mp3" }
        ],
        locked: true
      },
      {
        name: "Emergency Phrases",
        content: [
          { text: "আমাকে সাহায্য করুন! (I need help!)", audio: "/audio/bengali/i-need-help.mp3" }
        ],
        locked: true
      }
    ]
  },
  {
    name: "Hindi",
    nativeName: "हिन्दी",
    levels: [
      {
        name: "Foundations",
        content: [
          { text: "स्वर (Vowels):", audio: "/audio/hindi/vowels-intro.mp3" },
          { text: "अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ, अं, अः", audio: "/audio/hindi/vowels.mp3" },
          { text: "व्यंजन (Consonants):", audio: "/audio/hindi/consonants-intro.mp3" },
          { text: "क, ख, ग, घ, ङ", audio: "/audio/hindi/consonants-1.mp3" },
          { text: "च, छ, ज, झ, ञ", audio: "/audio/hindi/consonants-2.mp3" },
          { text: "ट, ठ, ड, ढ, ण", audio: "/audio/hindi/consonants-3.mp3" },
          { text: "त, थ, द, ध, न", audio: "/audio/hindi/consonants-4.mp3" },
          { text: "प, फ, ब, भ, म", audio: "/audio/hindi/consonants-5.mp3" },
          { text: "य, र, ल, व", audio: "/audio/hindi/consonants-6.mp3" },
          { text: "श, ष, स, ह", audio: "/audio/hindi/consonants-7.mp3" }
        ]
      },
      {
        name: "Basic Words & Phrases",
        content: [
          { text: "नमस्ते (Hello)", audio: "/audio/hindi/hello.mp3" },
          { text: "धन्यवाद (Thank you)", audio: "/audio/hindi/thank-you.mp3" },
          { text: "कृपया (Please)", audio: "/audio/hindi/please.mp3" },
          { text: "हाँ (Yes)", audio: "/audio/hindi/yes.mp3" },
          { text: "नहीं (No)", audio: "/audio/hindi/no.mp3" }
        ]
      },
      {
        name: "Sentence Building",
        content: [
          { text: "मैं एक छात्र हूँ। (I am a student)", audio: "/audio/hindi/i-am-student.mp3" },
          { text: "यह एक किताब है। (This is a book)", audio: "/audio/hindi/this-is-book.mp3" }
        ]
      },
      {
        name: "Intermediate Conversations",
        content: [
          { text: "आपका नाम क्या है? (What is your name?)", audio: "/audio/hindi/what-is-your-name.mp3" },
          { text: "आप कैसे हैं? (How are you?)", audio: "/audio/hindi/how-are-you.mp3" }
        ]
      },
      {
        name: "Advanced Topics",
        content: [
          { text: "मैं कल बाजार जाऊँगा। (I will be going to the market tomorrow.)", audio: "/audio/hindi/going-to-market.mp3" }
        ],
        locked: true
      },
      {
        name: "Common Expressions",
        content: [
          { text: "मुझे नहीं पता। (I don't know.)", audio: "/audio/hindi/i-dont-know.mp3" }
        ],
        locked: true
      },
      {
        name: "Cultural Phrases",
        content: [
          { text: "नमस्कार (Traditional Greeting)", audio: "/audio/hindi/traditional-greeting.mp3" }
        ],
        locked: true
      },
      {
        name: "Travel Phrases",
        content: [
          { text: "रेलवे स्टेशन कहां है? (Where is the railway station?)", audio: "/audio/hindi/where-is-station.mp3" }
        ],
        locked: true
      },
      {
        name: "Emergency Phrases",
        content: [
          { text: "मुझे मदद चाहिए! (I need help!)", audio: "/audio/hindi/i-need-help.mp3" }
        ],
        locked: true
      }
    ]
  }
];

export default languageData2;