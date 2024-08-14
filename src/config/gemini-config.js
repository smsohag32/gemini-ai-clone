import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAcGPdf2f9bEyKbAGMFNTjuVrBqGnEFYIM";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
   model: "gemini-1.5-flash",
});

const generationConfig = {
   temperature: 1,
   topP: 0.95,
   topK: 64,
   maxOutputTokens: 8192,
   responseMimeType: "text/plain",
};

async function gemini(inputText) {
   const chatSession = model.startChat({
      generationConfig,
      history: [],
   });

   const result = await chatSession.sendMessage(inputText);
   return result.response.text();
}

export default gemini;
