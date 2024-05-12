import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function getGeminiResponse(message, username) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
  "${message}":
  you are responding instead of ${username}
   This message indicates that the user you are trying to contact is busy and may not able to respond immediately. Please make a short message of a response that tells the situation to the user and provide him a reply. f you're uncertain about what to reply, you can mention that the user is busy and will reply later. Alternatively, if you have a specific response in mind, feel free to reply accordingly. If you find the message inappropriate or irrelevant, you can mention that it's not appropriate. Make sure that the reponse you give is relatable and respectful. and give short reply dont be lengthy. if you dont know anything dont hesitate to answer.always give a simple and short message. 
  `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}

export const botMessage = async (req, res) => {
    const { message, username } = req.body;
    const response = await getGeminiResponse(message);
    res.status(200).json({ response });
};