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
}