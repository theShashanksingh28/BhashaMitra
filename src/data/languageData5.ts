// Additional language data - Part 5
import { Language } from './languageData';

const languageData5: Language[] = [
  {
    name: "English",
    nativeName: "English",
    levels: [
      {
        name: "Foundations",
        content: [
          { text: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z", audio: "/audio/english/alphabet.mp3" }
        ]
      },
      {
        name: "Basic Words & Phrases",
        content: [
          { text: "Hello", audio: "/audio/english/hello.mp3" },
          { text: "Thank you", audio: "/audio/english/thank-you.mp3" },
          { text: "Please", audio: "/audio/english/please.mp3" },
          { text: "Yes", audio: "/audio/english/yes.mp3" },
          { text: "No", audio: "/audio/english/no.mp3" }
        ]
      },
      {
        name: "Sentence Building",
        content: [
          { text: "I am a student.", audio: "/audio/english/i-am-student.mp3" },
          { text: "This is a book.", audio: "/audio/english/this-is-book.mp3" }
        ]
      },
      {
        name: "Intermediate Conversations",
        content: [
          { text: "What is your name?", audio: "/audio/english/what-is-your-name.mp3" },
          { text: "How are you?", audio: "/audio/english/how-are-you.mp3" }
        ]
      },
      {
        name: "Advanced Topics",
        content: [
          { text: "I will be going to the market tomorrow.", audio: "/audio/english/going-to-market.mp3" }
        ],
        locked: true
      },
      {
        name: "Common Expressions",
        content: [
          { text: "I don't know.", audio: "/audio/english/i-dont-know.mp3" }
        ],
        locked: true
      },
      {
        name: "Cultural Phrases",
        content: [
          { text: "Hello (Greeting)", audio: "/audio/english/traditional-greeting.mp3" }
        ],
        locked: true
      },
      {
        name: "Travel Phrases",
        content: [
          { text: "Where is the railway station?", audio: "/audio/english/where-is-station.mp3" }
        ],
        locked: true
      },
      {
        name: "Emergency Phrases",
        content: [
          { text: "I need help!", audio: "/audio/english/i-need-help.mp3" }
        ],
        locked: true
      }
    ]
  },
  {
    name: "Kashmiri",
    nativeName: "كٲشُر",
    levels: [
      {
        name: "Foundations",
        content: [
          { text: "حروف علت (Vowels):", audio: "/audio/kashmiri/vowels-intro.mp3" },
          { text: "ا، و، ی", audio: "/audio/kashmiri/vowels.mp3" },
          { text: "حروف صحیح (Consonants):", audio: "/audio/kashmiri/consonants-intro.mp3" },
          { text: "ب، پ، ت، ٹ، ث، ج، چ، ح، خ", audio: "/audio/kashmiri/consonants-1.mp3" },
          { text: "د، ڈ، ذ، ر، ڑ، ز، ژ، س، ش", audio: "/audio/kashmiri/consonants-2.mp3" },
          { text: "ص، ض، ط، ظ، ع، غ، ف، ق، ک", audio: "/audio/kashmiri/consonants-3.mp3" },
          { text: "گ، ل، م، ن، و، ہ، ی", audio: "/audio/kashmiri/consonants-4.mp3" }
        ]
      },
      {
        name: "Basic Words & Phrases",
        content: [
          { text: "سلام (Hello)", audio: "/audio/kashmiri/hello.mp3" },
          { text: "شکریہ (Thank you)", audio: "/audio/kashmiri/thank-you.mp3" },
          { text: "براہ کرم (Please)", audio: "/audio/kashmiri/please.mp3" },
          { text: "ہن (Yes)", audio: "/audio/kashmiri/yes.mp3" },
          { text: "نہ (No)", audio: "/audio/kashmiri/no.mp3" }
        ]
      },
      {
        name: "Sentence Building",
        content: [
          { text: "بہ اَکھ طالب علم چھُس۔ (I am a student)", audio: "/audio/kashmiri/i-am-student.mp3" },
          { text: "یہ اَکھ کتاب چھُ۔ (This is a book)", audio: "/audio/kashmiri/this-is-book.mp3" }
        ]
      },
      {
        name: "Intermediate Conversations",
        content: [
          { text: "تُہند ناو کیا چھُو؟ (What is your name?)", audio: "/audio/kashmiri/what-is-your-name.mp3" },
          { text: "تُہند حال چھُو کیا؟ (How are you?)", audio: "/audio/kashmiri/how-are-you.mp3" }
        ]
      },
      {
        name: "Advanced Topics",
        content: [
          { text: "بہ تمیز بازار متر روان۔ (I will be going to the market tomorrow.)", audio: "/audio/kashmiri/going-to-market.mp3" }
        ],
        locked: true
      },
      {
        name: "Common Expressions",
        content: [
          { text: "مہ زانہ نہ چھُ۔ (I don't know.)", audio: "/audio/kashmiri/i-dont-know.mp3" }
        ],
        locked: true
      },
      {
        name: "Cultural Phrases",
        content: [
          { text: "آداب (Traditional Greeting)", audio: "/audio/kashmiri/traditional-greeting.mp3" }
        ],
        locked: true
      },
      {
        name: "Travel Phrases",
        content: [
          { text: "ریلوے اسٹیشن کوتھ چھُو؟ (Where is the railway station?)", audio: "/audio/kashmiri/where-is-station.mp3" }
        ],
        locked: true
      },
      {
        name: "Emergency Phrases",
        content: [
          { text: "مہ! کمک چایان! (I need help!)", audio: "/audio/kashmiri/i-need-help.mp3" }
        ],
        locked: true
      }
    ]
  }
];

export default languageData5;