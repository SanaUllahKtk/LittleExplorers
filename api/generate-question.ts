import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subject, age, level } = req.body;
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const themes = [
      "space exploration and aliens",
      "underwater ocean life",
      "dinosaurs and prehistoric times",
      "superheroes and magic",
      "everyday life at home or school",
      "cooking and food",
      "sports and games",
      "animals in the jungle or zoo",
      "robots and future technology",
      "pirates and treasure hunting",
      "fantasy kingdoms with dragons",
      "music and arts",
      "nature and camping",
      "detectives and mysteries",
      "fairytales and castles",
      "vehicles and racing"
    ];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    let ageInstructions = "";
    if (age >= 2 && age <= 4) {
      ageInstructions = "Targeting Pre-Schoolers: Focus on visual elements, simple concepts. Lessons should rely heavily on images, animations, sounds, and voice instructions with minimal text (conceptually, formulate questions that are extremely simple, like identifying colors, counting to 5, basic shapes).";
    } else if (age >= 5 && age <= 6) {
      ageInstructions = "Targeting early elementary (4-6 years old): Focus on independent learning and foundational academics (Phonics, Counting, basic shapes). Activities should encourage exploration, problem-solving, and interactive learning.";
    } else {
      ageInstructions = "Targeting elementary (6-10 years old): Focus on structured elementary education (Math, Science, Reading). Lessons should become more structured while remaining interactive and enjoyable.";
    }

    const prompt = `Generate a highly unique, random, and engaging multiple choice educational question for a child regarding the subject: ${subject}. 
    The child is ${age} years old and is at ${level} difficulty level. 
    ${ageInstructions}
    IMPORTANT: DO NOT ask questions that require looking at a picture, unless you provide a large emoji as that picture. You must provide an 'imageEmoji' (1-3 emojis) that visually represents the question or serves as the picture the user is supposed to look at. The question must be fully understandable from the text and the provided 'imageEmoji'.
    Make sure to incorporate the following fun theme to make it unique and engaging: "${randomTheme}".
    Tailor the topic, difficulty, and language to exactly match this age and level. 
    For example, if they are a pre-schooler (age 3-5), use very simple concepts (counting 1-10, basic colors, animal sounds) but keep the theme. If older, make it appropriately more challenging.
    If it is a Math question, make sure the answer is completely different every time (for example, use random numbers like ${Math.floor(Math.random() * 20)} and ${Math.floor(Math.random() * 20)} as part of the problem).
    Make sure the topic and question vary significantly from typical examples. Random seed for variety: ${Math.random()}
    The question MUST be a multiple choice question (mcq) with EXACTLY 4 options. The "correctAnswer" MUST be exactly equal to one of the 4 options provided.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        temperature: 1.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING, description: "The question text" },
            imageEmoji: { type: Type.STRING, description: "1 to 3 emojis that visually represent the question or serve as the picture for the question" },
            type: { type: Type.STRING, description: "Must always be 'mcq'" },
            options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Array of exactly 4 string options" },
            correctAnswer: { type: Type.STRING, description: "The correct answer, must perfectly match one of the options" }
          },
          required: ["question", "imageEmoji", "type", "options", "correctAnswer"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || '{}');
    if (parsedData.options && Array.isArray(parsedData.options)) {
      for (let i = parsedData.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [parsedData.options[i], parsedData.options[j]] = [parsedData.options[j], parsedData.options[i]];
      }
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}