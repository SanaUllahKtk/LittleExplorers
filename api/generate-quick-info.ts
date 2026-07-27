import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}