import { UserData } from "../types";

// Note: In a production environment, this key should be in process.env.
const API_KEY = "sk-sbjwfksfppvpftyzuzpttpesrdcwfvhgpzfetwhejvrhkeyk";
const API_URL = "https://api.siliconflow.cn/v1/images/generations";

export const generateImage = async (userData: UserData): Promise<string> => {
  const { zodiac, profession, gender, name } = userData;

  // 1. Determine Art Style based on Gender & Profession
  let styleKeywords = "";
  let colorPalette = "";
  let atmosphere = "";
  let clothing = "";

  // Gender & Profession Logic
  if (gender === 'male') {
    if (profession.toLowerCase().match(/tech|engineer|code|developer|it/)) {
        styleKeywords = "Isometric 3D render, blind box toy style, clean matte finish, futuristic details, OC renderer";
        colorPalette = "Deep navy, cool grey, gold accents, electric blue";
        atmosphere = "Modern, innovative, structured";
        clothing = "modern tech-wear with traditional knots";
    } else if (profession.toLowerCase().match(/business|finance|manager|ceo/)) {
        styleKeywords = "High-end vector illustration, noise texture, geometric minimalism, flat design";
        colorPalette = "Black, gold, emerald green, rich red";
        atmosphere = "Luxurious, prosperous, stable";
        clothing = "stylized suit with tang suit elements";
    } else if (profession.toLowerCase().match(/doctor|medical|health/)) {
        styleKeywords = "Soft clay 3D render, smooth rounded shapes, healing aesthetics, bright lighting";
        colorPalette = "White, sage green, sky blue, warm beige";
        atmosphere = "Calm, clean, caring";
        clothing = "white coat style traditional robe";
    } else {
        // Generic Male
        styleKeywords = "New Chinese Ink Painting, bold brush strokes combined with modern flat design";
        colorPalette = "Red, Gold, Ink Black, Cream";
        atmosphere = "Majestic, strong, festive";
        clothing = "traditional Tang suit";
    }
  } else {
    // Female
    if (profession.toLowerCase().match(/tech|engineer|code|developer|it/)) {
        styleKeywords = "Pop mart style 3D character, glass texture, soft gradient lighting, c4d";
        colorPalette = "Pastel purple, cyan, white, silver";
        atmosphere = "Smart, dreamy, clean";
        clothing = "futuristic Cheongsam (Qipao)";
    } else if (profession.toLowerCase().match(/art|design|writer|creative/)) {
        styleKeywords = "Watercolor illustration, wet-on-wet technique, blooming flowers, ethereal, detailed";
        colorPalette = "Pink, Peach, Lavender, Creamy White";
        atmosphere = "Romantic, artistic, flowing";
        clothing = "elegant Hanfu with flowing sleeves";
    } else if (profession.toLowerCase().match(/business|finance|manager/)) {
        styleKeywords = "Elegant flat illustration, fashion editorial style, thin lines, vector art";
        colorPalette = "Burgundy, rose gold, beige, warm grey";
        atmosphere = "Sophisticated, chic, successful";
        clothing = "modern professional blazer with embroidery";
    } else {
        // Generic Female
        styleKeywords = "Paper cut light box art, multi-layered depth, warm backlighting, intricate details";
        colorPalette = "Warm red, orange, soft pink, gold";
        atmosphere = "Warm, cozy, traditional yet modern";
        clothing = "festive Qipao";
    }
  }

  // 2. Profession Props Logic
  const professionProp = profession 
    ? `holding a stylized item related to ${profession} (e.g. laptop, book, medical kit, pen, briefcase)` 
    : "holding a traditional lucky red envelope (Hongbao) or lantern";

  // 3. Construct the Strict Prompt
  // Put the most important constraints (Subject) at the very beginning.
  const prompt = `
    (masterpiece, best quality, 8k resolution),
    SOLO ${zodiac}. A SINGLE ${zodiac} animal character.
    NO other animals. NO humans.
    
    Subject: A cute and majestic Anthropomorphic ${zodiac} character.
    Appearance: The ${zodiac} is wearing ${clothing}.
    Action: The character is ${professionProp}.
    Expression: Joyful, confident, welcoming new year fortune.
    
    Art Style: ${styleKeywords}.
    Color Palette: ${colorPalette}.
    Atmosphere: ${atmosphere}.
    Background: Minimalist Lunar New Year pattern, lucky clouds, clean solid color or simple gradient, no cluttered text.
    
    --no human face, --no text, --no watermark, --no multiple animals, --no deformed limbs, --no extra fingers, --no blurry.
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Kwai-Kolors/Kolors", 
        prompt: prompt,
        image_size: "1024x1024", 
        batch_size: 1,
        num_inference_steps: 30,
        guidance_scale: 6, // Increased guidance to stick to the prompt strictly
        seed: Math.floor(Math.random() * 99999999)
      }),
    });

    if (!response.ok) {
      throw new Error(`Image API Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data && data.data && data.data.length > 0 && data.data[0].url) {
      return data.data[0].url;
    } else {
      throw new Error("Invalid response format from Image API");
    }

  } catch (error) {
    console.error("Failed to generate image:", error);
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuA1Yyx-gWEBFWPUPGWjM2UFsahWiBW4zFzGkCsoo4onfjjq95iygtXvelTbsPDH4eKfe1troUwXTyegnPHH6v0oprrcf8ZxG_IZhON3id-W6mzv9ZfMOkoRyhe2rHIPd8orJw3zVI_DqLkTVxaSM3mrFH8xyZ9lFRObQ-MWc5-PI4PKmCQ1yI4JvoDqYD-ZZcznUIccZU4e8X5vU8MI2qzC8hYxM_KsxK4iK6CbZ-SsVAaeC5OtbtuDVWiXnUPiwfYEQJQ_mOPDLL0";
  }
};