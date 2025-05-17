// Additional language data - Part 7
import { Language } from './languageData';

const languageData7: Language[] = [
  {
    name: "Malayalam",
    nativeName: "മലയാളം",
    levels: [
      {
        name: "Foundations",
        content: [
          { text: "സ്വരാക്ഷരങ്ങൾ (Vowels):", audio: "/audio/malayalam/vowels-intro.mp3" },
          { text: "അ, ആ, ഇ, ഈ, ഉ, ഊ, ഋ, എ, ഏ, ഐ, ഒ, ഓ, ഔ", audio: "/audio/malayalam/vowels.mp3" },
          { text: "വ്യഞ്ജനാക്ഷരങ്ങൾ (Consonants):", audio: "/audio/malayalam/consonants-intro.mp3" },
          { text: "ക, ഖ, ഗ, ഘ, ങ", audio: "/audio/malayalam/consonants-1.mp3" },
          { text: "ച, ഛ, ജ, ഝ, ഞ", audio: "/audio/malayalam/consonants-2.mp3" },
          { text: "ട, ഠ, ഡ, ഢ, ണ", audio: "/audio/malayalam/consonants-3.mp3" },
          { text: "ത, ഥ, ദ, ധ, ന", audio: "/audio/malayalam/consonants-4.mp3" },
          { text: "പ, ഫ, ബ, ഭ, മ", audio: "/audio/malayalam/consonants-5.mp3" },
          { text: "യ, ര, ല, വ", audio: "/audio/malayalam/consonants-6.mp3" },
          { text: "ശ, ഷ, സ, ഹ", audio: "/audio/malayalam/consonants-7.mp3" },
          { text: "ക്ഷ, ത്ര, ജ്ഞ", audio: "/audio/malayalam/consonants-8.mp3" }
        ]
      },
      {
        name: "Basic Words & Phrases",
        content: [
          { text: "നമസ്കാരം (Hello)", audio: "/audio/malayalam/hello.mp3" },
          { text: "നന്ദി (Thank you)", audio: "/audio/malayalam/thank-you.mp3" },
          { text: "ദയവായി (Please)", audio: "/audio/malayalam/please.mp3" },
          { text: "അതെ (Yes)", audio: "/audio/malayalam/yes.mp3" },
          { text: "ഇല്ല (No)", audio: "/audio/malayalam/no.mp3" }
        ]
      },
      {
        name: "Sentence Building",
        content: [
          { text: "ഞാൻ ഒരു വിദ്യാർത്ഥിയാണ്. (I am a student)", audio: "/audio/malayalam/i-am-student.mp3" },
          { text: "ഇത് ഒരു പുസ്തകമാണ്. (This is a book)", audio: "/audio/malayalam/this-is-book.mp3" }
        ]
      },
      {
        name: "Intermediate Conversations",
        content: [
          { text: "നിങ്ങളുടെ പേര് എന്താണ്? (What is your name?)", audio: "/audio/malayalam/what-is-your-name.mp3" },
          { text: "നിങ്ങൾ എങ്ങനെയുണ്ട്? (How are you?)", audio: "/audio/malayalam/how-are-you.mp3" }
        ]
      },
      {
        name: "Advanced Topics",
        content: [
          { text: "ഞാൻ നാളെ മാർക്കറ്റിൽ പോകും. (I will be going to the market tomorrow.)", audio: "/audio/malayalam/going-to-market.mp3" }
        ],
        locked: true
      },
      {
        name: "Common Expressions",
        content: [
          { text: "എനിക്ക് അറിയില്ല. (I don't know.)", audio: "/audio/malayalam/i-dont-know.mp3" }
        ],
        locked: true
      },
      {
        name: "Cultural Phrases",
        content: [
          { text: "നമസ്കാരം (Traditional Greeting)", audio: "/audio/malayalam/traditional-greeting.mp3" }
        ],
        locked: true
      },
      {
        name: "Travel Phrases",
        content: [
          { text: "റെയിൽവേ സ്റ്റേഷൻ എവിടെയാണ്? (Where is the railway station?)", audio: "/audio/malayalam/where-is-station.mp3" }
        ],
        locked: true
      },
      {
        name: "Emergency Phrases",
        content: [
          { text: "എനിക്ക് സഹായം വേണം! (I need help!)", audio: "/audio/malayalam/i-need-help.mp3" }
        ],
        locked: true
      }
    ]
  },
  {
    name: "Manipuri",
    nativeName: "মৈতৈলোন্",
    levels: [
      {
        name: "Foundations",
        content: [
          { text: "ꯃꯍꯥꯆ (Vowels):", audio: "/audio/manipuri/vowels-intro.mp3" },
          { text: "ꯑ, ꯑꯥ, ꯏ, ꯏꯩ, ꯎ", audio: "/audio/manipuri/vowels.mp3" },
          { text: "ꯃꯌꯦꯛꯁꯤꯡ (Consonants):", audio: "/audio/manipuri/consonants-intro.mp3" },
          { text: "ꯀ, ꯁ, ꯂ, ꯃ, ꯄ, ꯅ, ꯆ, ꯇ, ꯈ, ꯉ", audio: "/audio/manipuri/consonants-1.mp3" },
          { text: "ꯊ, ꯋ, ꯌ, ꯍ, ꯎ", audio: "/audio/manipuri/consonants-2.mp3" }
        ]
      },
      {
        name: "Basic Words & Phrases",
        content: [
          { text: "খুরুমজরি (Hello)", audio: "/audio/manipuri/hello.mp3" },
          { text: "থাগচারি (Thank you)", audio: "/audio/manipuri/thank-you.mp3" },
          { text: "অনুরোগী (Please)", audio: "/audio/manipuri/please.mp3" },
          { text: "হৌদে (Yes)", audio: "/audio/manipuri/yes.mp3" },
          { text: "নাহে (No)", audio: "/audio/manipuri/no.mp3" }
        ]
      },
      {
        name: "Sentence Building",
        content: [
          { text: "অঙি বিদ্যালয়গী ছাত্র অমনি। (I am a student)", audio: "/audio/manipuri/i-am-student.mp3" },
          { text: "অসি লাই অমনি। (This is a book)", audio: "/audio/manipuri/this-is-book.mp3" }
        ]
      },
      {
        name: "Intermediate Conversations",
        content: [
          { text: "নাখোয়গী মিং কমানি? (What is your name?)", audio: "/audio/manipuri/what-is-your-name.mp3" },
          { text: "নাখোয় কমদৌরি? (How are you?)", audio: "/audio/manipuri/how-are-you.mp3" }
        ]
      },
      {
        name: "Advanced Topics",
        content: [
          { text: "অঙি হায়েঙ বাজারদা চত্লগনি। (I will be going to the market tomorrow.)", audio: "/audio/manipuri/going-to-market.mp3" }
        ],
        locked: true
      },
      {
        name: "Common Expressions",
        content: [
          { text: "অঙি খঙদে মাঙ-ঙদা। (I don't know.)", audio: "/audio/manipuri/i-dont-know.mp3" }
        ],
        locked: true
      },
      {
        name: "Cultural Phrases",
        content: [
          { text: "খুরুমজরি (Traditional Greeting)", audio: "/audio/manipuri/traditional-greeting.mp3" }
        ],
        locked: true
      },
      {
        name: "Travel Phrases",
        content: [
          { text: "রেলবে স্টেশন কদায়দগী? (Where is the railway station?)", audio: "/audio/manipuri/where-is-station.mp3" }
        ],
        locked: true
      },
      {
        name: "Emergency Phrases",
        content: [
          { text: "অঙগী মদদ লৌরো! (I need help!)", audio: "/audio/manipuri/i-need-help.mp3" }
        ],
        locked: true
      }
    ]
  }
];

export default languageData7;