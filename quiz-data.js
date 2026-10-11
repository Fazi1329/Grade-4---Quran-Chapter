/**
 * Grade 4 Islamic Studies Quiz Data
 * Chapter 7: The Qur'an (اَلْقُرْآن), Pages 27 - 31
 * Strictly based on the textbook content.
 */

const QUIZ_DATA = {
  chapter: {
    number: 7,
    titleEnglish: "The Qur'an",
    titleArabic: "اَلْقُرْآن",
    grade: "Grade 4",
    totalMarks: 28,
  },

  sections: [
    {
      id: "section-a",
      title: "Section A: Answer the Following Questions",
      arabicTitle: "أَجِبْ عَنِ الْأَسْئِلَةِ الآتِيَةِ",
      description: "Type thoughtful answers based on Chapter 7. Read each question carefully and write your response in the box.",
      totalMarks: 8,
      questions: [
        {
          id: "sa-1",
          number: 1,
          question: "Why do you think Allah sends Prophets to mankind?",
          marks: 3,
          pageReference: "Page 27 & Page 31 (Exercise A.1)",
          placeholder: "Type your answer here (e.g. Allah sent Prophets to bring people back to the Straight Path...)",
          hint: "Think about what happened when people fell into evil ways and ignored their Creator.",
          modelAnswer: "Allah sent His Prophets (like Nuh, Ibraaheem, Daawood, Musa, and Isa) to bring people back to the Straight Path after people fell into evil ways and ignored Allah, their Creator.",
          // Scoring keywords/concepts:
          // Concept 1: bring people back to the Straight Path (or right path/guidance)
          // Concept 2: people fell into evil ways / ignored Allah / forgot how to live
          keywordsRequired: [
            {
              concept: "Straight Path / Guide back to Allah",
              matches: ["straight path", "right path", "guidance", "guide", "guide people", "back to allah", "worship allah"],
              weight: 1.5
            },
            {
              concept: "People fell into evil ways / ignored Allah / showed how to live",
              matches: ["evil ways", "ignored allah", "disobeyed", "forgot", "sin", "evil", "show them how to live", "teach how to live"],
              weight: 1.5
            }
          ]
        },
        {
          id: "sa-2",
          number: 2,
          question: "The Qur'an is the most precious gift to mankind. Explain why.",
          marks: 3,
          pageReference: "Page 27, 28, 30 & Page 31 (Exercise A.2)",
          placeholder: "Explain in 1-2 sentences why the Qur'an is Allah's most precious gift...",
          hint: "Mention that it is Allah's final revelation, guides every part of life, and is preserved forever.",
          modelAnswer: "The Qur'an is Allah's most precious gift because it contains Allah's final and most perfect revelation. It offers guidance for every aspect of life for all people, times, and places, and Allah took upon Himself to preserve it unchanged.",
          keywordsRequired: [
            {
              concept: "Final / perfect revelation of Allah / Word of Allah",
              matches: ["final", "perfect revelation", "word of allah", "last message", "last revelation", "most complete"],
              weight: 1.5
            },
            {
              concept: "Guidance for every aspect of life / universal / preserved",
              matches: ["guidance", "every aspect of life", "how to live", "pray", "eat", "all times", "preserve", "never changed", "mankind"],
              weight: 1.5
            }
          ]
        },
        {
          id: "sa-3",
          number: 3,
          question: "Describe what happened when Angel Jibreel (عليه السلام) first appeared to Prophet Muhammad (ﷺ) in the Cave of Hira.",
          marks: 2,
          pageReference: "Page 27 & Page 29",
          placeholder: "Describe Angel Jibreel's command and what the Prophet (ﷺ) answered...",
          hint: "What word did Angel Jibreel say, what did the Prophet reply, and what did Jibreel do?",
          modelAnswer: "Angel Jibreel appeared in the Cave of Hira and said 'Read!' The Prophet (ﷺ) answered 'I cannot read.' Jibreel squeezed him as hard as he could bear three times, and then revealed the first five verses of Surat al-Alaq.",
          keywordsRequired: [
            {
              concept: "Said 'Read!' / Iqra and Prophet said 'I cannot read'",
              matches: ["read", "recite", "cannot read", "iqra", "i cannot read"],
              weight: 1.0
            },
            {
              concept: "Squeezed / embraced three times / revealed verses",
              matches: ["squeezed", "hugged", "seized", "three times", "3 times", "hard", "surat al-alaq", "alaq"],
              weight: 1.0
            }
          ]
        }
      ]
    },

    {
      id: "section-b",
      title: "Section B: One-Word Answers",
      arabicTitle: "أَجِبْ بِكَلِمَةٍ وَاحِدَةٍ",
      description: "Type the exact name, number, or word from the textbook. Spelling variations are accepted!",
      totalMarks: 8,
      questions: [
        {
          id: "ow-1",
          number: 1,
          question: "Name the Angel who brought the revelation to Prophet Muhammad (ﷺ):",
          marks: 1,
          pageReference: "Page 27, 29 & Page 31 (Exercise B.2)",
          placeholder: "Type angel's name...",
          acceptedAnswers: ["jibreel", "jibril", "angel jibreel", "angel jibril", "gabriel", "jibraeel", "jibra'il"],
          hint: "His name begins with 'J' and ends with 'l'. (He is the Angel of Revelation)."
        },
        {
          id: "ow-2",
          number: 2,
          question: "The first revelation given to the Prophet (ﷺ) was the first 5 verses of which Surah?",
          marks: 1,
          pageReference: "Page 28, 29 & Page 31 (Exercise B.1)",
          placeholder: "Type Surah name...",
          acceptedAnswers: ["surat al-alaq", "surah al-alaq", "al-alaq", "al alaq", "alaq", "surah alaq", "surat alaq"],
          hint: "It means 'The Clot'. It begins with 'Iqra' (Read!)."
        },
        {
          id: "ow-3",
          number: 3,
          question: "What is the total number of surahs in the Holy Qur'an?",
          marks: 1,
          pageReference: "Page 28 & Page 31 (Exercise B.3)",
          placeholder: "Type number (digits)...",
          acceptedAnswers: ["114", "one hundred fourteen", "one hundred and fourteen"],
          hint: "It is a 3-digit number between 110 and 120."
        },
        {
          id: "ow-4",
          number: 4,
          question: "In which language was the Holy Qur'an revealed?",
          marks: 1,
          pageReference: "Page 28 & Page 31 (Exercise B.4)",
          placeholder: "Type the language...",
          acceptedAnswers: ["arabic", "arabiyyah", "al-arabiyyah", "arabic language"],
          hint: "The language spoken in the Arabian peninsula with special flow and rhythm."
        },
        {
          id: "ow-5",
          number: 5,
          question: "How many years did it take for the Qur'an to be revealed in stages?",
          marks: 1,
          pageReference: "Page 29 & Page 31 (Exercise B.5)",
          placeholder: "Type number of years...",
          acceptedAnswers: ["23", "23 years", "twenty three", "twenty-three", "about 23 years", "about 23"],
          hint: "A number in the early twenties: over a period of about ___ years."
        },
        {
          id: "ow-6",
          number: 6,
          question: "On which mountain is the Cave of Hira located?",
          marks: 1,
          pageReference: "Page 29",
          placeholder: "Type mountain name...",
          acceptedAnswers: ["mount an-noor", "mount an noor", "an-noor", "an noor", "jabal al-noor", "jabal al noor", "mount noor", "noor"],
          hint: "The Mountain of Light! Mount An-..."
        },
        {
          id: "ow-7",
          number: 7,
          question: "Which Holy Book did Allah give to Prophet Musa (عليه السلام)?",
          marks: 1,
          pageReference: "Page 27",
          placeholder: "Type Holy Book name...",
          acceptedAnswers: ["tawrah", "tawrat", "torah", "the tawrah", "the tawrat", "the torah"],
          hint: "Starts with the letter 'T'."
        },
        {
          id: "ow-8",
          number: 8,
          question: "What is the Arabic word for 'guidance' mentioned on page 29 of the chapter?",
          marks: 1,
          pageReference: "Page 29",
          placeholder: "Type Arabic term for guidance...",
          acceptedAnswers: ["hidaayah", "hidayah", "hidaya", "hidaayat", "hidayat"],
          hint: "'Anyone who seeks guidance (_______) with an open mind will be guided.'"
        }
      ]
    },

    {
      id: "section-c",
      title: "Section C: Drag-and-Drop & Tap Matching Challenge",
      arabicTitle: "تَحَدِّي التَّطَابُقِ وَالسَّحْبِ",
      description: "Match the items correctly. On touchscreens or computers, you can either drag the cards or tap an item and tap its matching target!",
      totalMarks: 12,
      activities: [
        {
          id: "act-1",
          title: "Activity 1: Match the Prophets with their Revealed Books",
          subtitle: "Drag each Holy Book to the Prophet it was revealed to (Page 27).",
          marks: 4,
          pairs: [
            { id: "musa", prompt: "Prophet Musa (عليه السلام)", targetName: "Prophet Musa", correctValue: "Tawrah", description: "Given to Prophet Musa" },
            { id: "daawood", prompt: "Prophet Daawood (عليه السلام)", targetName: "Prophet Daawood", correctValue: "Zaboor", description: "Given to Prophet Daawood" },
            { id: "isa", prompt: "Prophet Isa (عليه السلام)", targetName: "Prophet Isa", correctValue: "Injeel", description: "Given to Prophet Isa" },
            { id: "muhammad", prompt: "Prophet Muhammad (ﷺ)", targetName: "Prophet Muhammad", correctValue: "Qur'an", description: "Allah's final message to mankind" }
          ],
          draggablePool: [
            { id: "item-tawrah", text: "Tawrah", bookType: "Holy Book" },
            { id: "item-zaboor", text: "Zaboor", bookType: "Holy Book" },
            { id: "item-injeel", text: "Injeel", bookType: "Holy Book" },
            { id: "item-quran", text: "Qur'an", bookType: "Holy Book" }
          ]
        },
        {
          id: "act-2",
          title: "Activity 2: Chapter Facts & Milestones Match",
          subtitle: "Connect each Qur'anic milestone to its correct textbook fact (Page 27 - 30).",
          marks: 4,
          pairs: [
            { id: "first-rev", prompt: "First Revelation", targetName: "First Revelation", correctValue: "Surat al-Alaq (96: 1-5)", description: "Cave of Hira, Ramadan 610 CE" },
            { id: "second-rev", prompt: "Second Revelation", targetName: "Second Revelation", correctValue: "Surat al-Muddath-thir (74: 1-5)", description: "Sent down after the first revelation" },
            { id: "prophet-age", prompt: "Prophet's Age at First Revelation", targetName: "Prophet's Age", correctValue: "40 years old", description: "Passed his fortieth year" },
            { id: "purity", prompt: "Purity of the Qur'an's Text", targetName: "Purity of Qur'an", correctValue: "Never changed for 1400 years", description: "Not a syllable or word changed" }
          ],
          draggablePool: [
            { id: "item-alaq", text: "Surat al-Alaq (96: 1-5)", category: "Milestone" },
            { id: "item-muddathir", text: "Surat al-Muddath-thir (74: 1-5)", category: "Milestone" },
            { id: "item-age40", text: "40 years old", category: "Fact" },
            { id: "item-years1400", text: "Never changed for 1400 years", category: "Fact" }
          ]
        },
        {
          id: "act-3",
          title: "Activity 3: Fill-in-the-Blanks Sentence Builder",
          subtitle: "Complete the textbook teachings by placing the correct words into the blanks (Page 28 & 30).",
          marks: 4,
          sentences: [
            {
              id: "sent-1",
              textBefore: "The text of the Qur'an is divided into 114 surahs, and each surah is made up of",
              blankId: "blank-aayaat",
              correctValue: "aayaat",
              textAfter: "(plural of aayah). (Page 28)"
            },
            {
              id: "sent-2",
              textBefore: "No one may touch the well-protected Book except the",
              blankId: "blank-purified",
              correctValue: "purified",
              textAfter: ". (Page 30)"
            },
            {
              id: "sent-3",
              textBefore: "The Prophet (ﷺ) said: 'The best among you are those who",
              blankId: "blank-learn",
              correctValue: "learn",
              textAfter: "the Qur'an and teach it to others.' (Page 30)"
            },
            {
              id: "sent-4",
              textBefore: "The revelation of the Qur'an began on the 21st night of the month of",
              blankId: "blank-ramadan",
              correctValue: "Ramadan",
              textAfter: "in the year 610 CE. (Page 29)"
            }
          ],
          draggablePool: [
            { id: "item-aayaat", text: "aayaat" },
            { id: "item-purified", text: "purified" },
            { id: "item-learn", text: "learn" },
            { id: "item-ramadan", text: "Ramadan" }
          ]
        }
      ]
    }
  ],

  // Teacher marking guide and reference notes for all questions
  teacherGuide: {
    sectionA: [
      {
        qNum: 1,
        question: "Why do you think Allah sends Prophets to mankind?",
        marks: 3,
        keyPoints: [
          "People fell into evil ways and ignored Allah their Creator (1.5 marks)",
          "To bring people back to the Straight Path and show them how to live (1.5 marks)"
        ],
        textbookRef: "Page 27, Paragraph 1; Page 31, Ex A.1"
      },
      {
        qNum: 2,
        question: "The Qur'an is the most precious gift to mankind. Explain.",
        marks: 3,
        keyPoints: [
          "Contains Allah's final and most perfect revelation (1.5 marks)",
          "Offers complete guidance for every aspect of life for all people and times, preserved forever by Allah (1.5 marks)"
        ],
        textbookRef: "Page 27, Paragraph 2; Page 28, Paragraph 2 & 3; Page 31, Ex A.2"
      },
      {
        qNum: 3,
        question: "What happened when Angel Jibreel first commanded 'Read!'?",
        marks: 2,
        keyPoints: [
          "Angel Jibreel said 'Read!' and the Prophet answered 'I cannot read' (1 mark)",
          "Angel Jibreel seized and squeezed him as hard as he could bear three times, then recited the first verses of Surat al-Alaq (1 mark)"
        ],
        textbookRef: "Page 27, Paragraphs 3-6; Page 28"
      }
    ],
    sectionB: [
      { qNum: 1, question: "Angel of revelation", answer: "Angel Jibreel (عليه السلام)", marks: 1, ref: "Page 27, 29, 31" },
      { qNum: 2, question: "First revelation Surah", answer: "Surat al-Alaq (Verses 1-5)", marks: 1, ref: "Page 28, 29, 31" },
      { qNum: 3, question: "Number of surahs", answer: "114", marks: 1, ref: "Page 28, 31" },
      { qNum: 4, question: "Language of the Qur'an", answer: "Arabic", marks: 1, ref: "Page 28, 31" },
      { qNum: 5, question: "Time taken to be revealed", answer: "About 23 years", marks: 1, ref: "Page 29, 31" },
      { qNum: 6, question: "Mountain with Cave of Hira", answer: "Mount An-Noor", marks: 1, ref: "Page 29" },
      { qNum: 7, question: "Book given to Prophet Musa", answer: "Tawrah", marks: 1, ref: "Page 27" },
      { qNum: 8, question: "Arabic word for guidance", answer: "Hidaayah", marks: 1, ref: "Page 29" }
    ],
    sectionC: [
      {
        activity: "Activity 1: Prophets & Books",
        marks: 4,
        mappings: [
          "Musa -> Tawrah",
          "Daawood -> Zaboor",
          "Isa -> Injeel",
          "Muhammad (ﷺ) -> Qur'an"
        ],
        ref: "Page 27"
      },
      {
        activity: "Activity 2: Milestones & Facts",
        marks: 4,
        mappings: [
          "First Revelation -> Surat al-Alaq (96: 1-5)",
          "Second Revelation -> Surat al-Muddath-thir (74: 1-5)",
          "Prophet's Age -> 40 years old",
          "Purity of Text -> Never changed for 1400 years"
        ],
        ref: "Page 28-30"
      },
      {
        activity: "Activity 3: Fill-in-the-Blanks",
        marks: 4,
        mappings: [
          "Blank 1: aayaat (Page 28)",
          "Blank 2: purified (Page 30)",
          "Blank 3: learn (Page 30)",
          "Blank 4: Ramadan (Page 29)"
        ],
        ref: "Page 28-30"
      }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUIZ_DATA;
}
