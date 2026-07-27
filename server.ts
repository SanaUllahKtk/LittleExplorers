import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/generate-question', async (req, res) => {
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
  });

  app.post('/api/generate-learning-card', async (req, res) => {
    try {
      const { subject, age, level } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate 3 completely different, fun, engaging, and educational learning cards for a child about ${subject}. 
      The child is ${age} years old and at ${level} difficulty level.
      Each card should have a catchy title, a short fun fact or simple explanation (2-3 sentences), and an emoji that represents the topic.
      Make them completely random and different every time. Seed: ${Math.random()}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          temperature: 1.2,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                fact: { type: Type.STRING },
                emoji: { type: Type.STRING }
              },
              required: ["title", "fact", "emoji"]
            }
          }
        }
      });
      res.json(JSON.parse(response.text || '[]'));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/generate-quick-info', async (req, res) => {
    try {
      const { age, level } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate a completely random, fascinating "Quick Information" fun fact for a child that is UNRELATED to typical school subjects like Math or English. 
      Topics could be weird space facts, deep sea creatures, bizarre historical events, cool animal abilities, etc.
      The child is ${age} years old and at ${level} difficulty level.
      The response should be 2-3 sentences max, super engaging, and include an emoji.
      Seed: ${Math.random()}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          temperature: 1.2,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              info: { type: Type.STRING },
              emoji: { type: Type.STRING }
            },
            required: ["info", "emoji"]
          }
        }
      });
      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/validate-answer', async (req, res) => {
    try {
      const { question, correctAnswer, userAnswer } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const prompt = `Question: "${question}"
Correct Answer: "${correctAnswer}"
Student Answer: "${userAnswer}"

You are a teacher evaluating a young child's answer. Be extremely lenient.
Is the student's answer correct or close enough?
Consider it correct if:
- It's a number written as a word or digit (e.g., "4" vs "four" vs "4 ducks").
- The student's answer contains the correct digit or core word (e.g., "4" is in "I have 4").
- It has spelling mistakes but sounds similar.
- It contains the right concept even if phrased differently.

Respond strictly in JSON format with a single boolean property "isCorrect". True if it is conceptually correct or even partially on track. False only if it is completely incorrect.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              isCorrect: { type: Type.BOOLEAN, description: "Whether the answer is correct" }
            }
          }
        }
      });
      
      let responseText = (response.text || '').trim();
      if (responseText.startsWith('```json')) {
        responseText = responseText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (responseText.startsWith('```')) {
        responseText = responseText.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }

      let parsed = {};
      try {
        parsed = JSON.parse(responseText || '{}');
      } catch (e) {
        console.error('Failed to parse validate answer JSON:', responseText);
        parsed = { isCorrect: responseText.toLowerCase().includes('true') };
      }

      res.json(parsed);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/hint', async (req, res) => {
    try {
      const { question, options, type, age, level } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const prompt = `Given the educational question: "${question}"
      ${type === 'mcq' && options ? `Options: ${options.join(', ')}` : ''}
      Provide a short, encouraging hint for a child (age ${age}, ${level}) to help them figure out the answer. 
      Tailor the language and hint complexity to their age group. Don't give away the answer directly.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hint: { type: Type.STRING }
            }
          }
        }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/solve', async (req, res) => {
    try {
      const { question, options, type, correctAnswer, age, level } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const prompt = `Given the educational question: "${question}"
      The correct answer is: "${correctAnswer}"
      Provide a friendly, easy-to-understand explanation for a child (age ${age}, ${level}) on WHY this is the correct answer. 
      Tailor the language to their age group. Walk them through the reasoning step by step in a fun way.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              explanation: { type: Type.STRING }
            }
          }
        }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
