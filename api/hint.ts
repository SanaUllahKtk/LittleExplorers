import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}