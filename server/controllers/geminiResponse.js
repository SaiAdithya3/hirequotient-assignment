import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function getGeminiResponse(message, username) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
    "${message}":
    you are responding instead of ${username}
    This message indicates that the user you are trying to contact is busy and may not be able to respond immediately. Please make a short message of a response that tells the situation to the user and provide him a reply. If you're uncertain about what to reply, you can mention that the user is busy and will reply later. Alternatively, if you have a specific response in mind, feel free to reply accordingly. If you find the message inappropriate or irrelevant, you can mention that it's not appropriate. Make sure that the response you give is relatable and respectful. And give a short reply; don't be lengthy. If you don't know anything, don't hesitate to answer. Always give a simple and short message.
    `;
    
    try {
        const resultPromise = model.generateContent(prompt);
        const result = await Promise.race([resultPromise, new Promise((_, reject) => setTimeout(() => reject(new Error('API Timeout')), 10000))]);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.log("Error:", error);
        return "The user is currently unavailable.";
    }
}

export const botMessage = async (req, res) => {
    const { message, username } = req.body;
    const response = await getGeminiResponse(message, username);
    res.status(200).json({ response });
};
