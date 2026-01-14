import { GoogleGenAI, Type } from "@google/genai";
import { UserData, GeneratedBlessing } from "../types";

export const generateBlessing = async (userData: UserData): Promise<Omit<GeneratedBlessing, 'imageUrl'>> => {
    // 1. Check for API Key
    if (!process.env.API_KEY) {
        throw new Error("API Key is missing. Please set process.env.API_KEY.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // 2. Define the Prompt
    const prompt = `
    Create a personalized Lunar New Year blessing card text.
    
    User Profile:
    - Name: ${userData.name}
    - Gender: ${userData.gender}
    - Zodiac Sign: ${userData.zodiac}
    - Profession: ${userData.profession}

    Instructions:
    1. Analyze the Name: If the name has a specific meaning (e.g., "Crystal" implying clarity/brightness, or a Chinese name with specific characters), reflect that subtly in the blessing.
    2. Analyze the Profession: Incorporate career-specific well-wishes. (e.g., for a Programmer: "Bug-free year", for a Doctor: "Health and wisdom", for Business: "Prosperity").
    3. Tone: Elegant, festive, and sophisticated.

    Output Schema:
    1. 'titleEn': A main headline in English (Max 7 words). Should combine the Zodiac or Professional success.
    2. 'titleCn': A 4-character or short Chinese phrase summarizing the main wish (e.g., "代码如诗" for a coder, or general festive idioms if profession is generic).
    3. 'quoteEn': A poetic, 2-sentence wish. It MUST link the profession or name meaning to the new year fortune.
    4. 'quoteCn': A poetic, 2-sentence wish in Chinese. It must be elegant (雅致) and link the profession or name meaning to the new year.
    `;

    // 3. Define Response Schema
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            titleEn: { type: Type.STRING, description: "Main headline in English." },
            titleCn: { type: Type.STRING, description: "Chinese translation, short and elegant." },
            quoteEn: { type: Type.STRING, description: "A poetic 2 sentence wish linking profession/name." },
            quoteCn: { type: Type.STRING, description: "A poetic 2 sentence wish in Chinese linking profession/name." },
        },
        required: ["titleEn", "titleCn", "quoteEn", "quoteCn"],
    };

    try {
        // 4. Call API
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8, // Slightly higher creative freedom for poetic profession links
            },
        });

        const text = response.text;
        if (!text) {
            throw new Error("No response from Gemini.");
        }

        const data = JSON.parse(text) as Omit<GeneratedBlessing, 'imageUrl'>;
        return data;

    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback in case of error (graceful degradation)
        return {
            titleEn: `May ${userData.name || 'Friend'} shine bright`,
            titleCn: `愿 ${userData.name || '你'} 前程似锦`,
            quoteEn: "May your career soar to new heights and your year be filled with success.",
            quoteCn: "祝你在新的一年里事业有成，步步高升，万事如意。",
        };
    }
};