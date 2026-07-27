import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}