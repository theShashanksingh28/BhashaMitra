// Language data with levels and content

export interface ContentItem {
  text: string;
  audio?: string;
  translation?: string;
}

export interface Level {
  name: string;
  content: ContentItem[];
  locked?: boolean;
}

export interface Language {
  name: string;
  nativeName: string;
  levels: Level[];
}

const languageData: Language[] = [
  {
    name: "Assamese",
    nativeName: "অসমীয়া",
    levels: [
      {
        name: "Foundations",
        content: [
          { text: "স্বৰবৰ্ণ (Vowels):", audio: "/audio/assamese/vowels-intro.mp3" },
          { text: "অ, আ, ই, ঈ, উ, ঊ, ঋ, এ, ঐ, ও, ঔ", audio: "/audio/assamese/vowels.mp3" },
          { text: "ব্যঞ্জনবৰ্ণ (Consonants):", audio: "/audio/assamese/consonants-intro.mp3" },
          { text: "ক, খ, গ, ঘ, ঙ", audio: "/audio/assamese/consonants-1.mp3" },
          { text: "চ, ছ, জ, ঝ, ঞ", audio: "/audio/assamese/consonants-2.mp3" },
          { text: "ট, ঠ, ড, ঢ, ণ", audio: "/audio/assamese/consonants-3.mp3" },
          { text: "ত, থ, দ, ধ, ন", audio: "/audio/assamese/consonants-4.mp3" },
          { text: "প, ফ, ব, ভ, ম", audio: "/audio/assamese/consonants-5.mp3" },
          { text: "য, ৰ, ল, শ, ষ, স, হ", audio: "/audio/assamese/consonants-6.mp3" }
        ]
      },
      {
        name: "Basic Words & Phrases",
        content: [
          { text: "নমস্কাৰ (Hello)", audio: "/audio/assamese/hello.mp3" },
          { text: "ধন্যবাদ (Thank you)", audio: "/audio/assamese/thank-you.mp3" },
          { text: "অনুগ্ৰহ কৰি (Please)", audio: "/audio/assamese/please.mp3" },
          { text: "হ'য় (Yes)", audio: "/audio/assamese/yes.mp3" },
          { text: "নহয় (No)", audio: "/audio/assamese/no.mp3" }
        ]
      },
      {
        name: "Sentence Building",
        content: [
          { text: "মই এজন ছাত্ৰ (I am a student)", audio: "/audio/assamese/i-am-student.mp3" },
          { text: "এইটো এখন কিতাপ (This is a book)", audio: "/audio/assamese/this-is-book.mp3" }
        ]
      },
      {
        name: "Intermediate Conversations",
        content: [
          { text: "আপোনাৰ নাম কি? (What is your name?)", audio: "/audio/assamese/what-is-your-name.mp3" },
          { text: "আপুনি কেনে আছেন? (How are you?)", audio: "/audio/assamese/how-are-you.mp3" }
        ]
      },
      {
        name: "Advanced Topics",
        content: [
          { text: "মই কাইলৈ মাৰ্কেটলৈ যাম। (I will be going to the market tomorrow.)", audio: "/audio/assamese/going-to-market.mp3" }
        ],
        locked: true
      },
      {
        name: "Common Expressions",
        content: [
          { text: "মোক নাজানো। (I don't know.)", audio: "/audio/assamese/i-dont-know.mp3" }
        ],
        locked: true
      },
      {
        name: "Cultural Phrases",
        content: [
          { text: "নমস্কাৰ (Traditional Greeting)", audio: "/audio/assamese/traditional-greeting.mp3" }
        ],
        locked: true
      },
      {
        name: "Travel Phrases",
        content: [
          { text: "ৰেলৱে ষ্টেচন ক'ত? (Where is the railway station?)", audio: "/audio/assamese/where-is-station.mp3" }
        ],
        locked: true
      },
      {
        name: "Emergency Phrases",
        content: [
          { text: "মোক সাহায্য প্ৰয়োজন! (I need help!)", audio: "/audio/assamese/i-need-help.mp3" }
        ],
        locked: true
      }
    ]
  }
];

export default languageData;