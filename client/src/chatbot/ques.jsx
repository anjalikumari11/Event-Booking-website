import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askGemini(question) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(question);
  const response = result.response.text();

  console.log(response);
  return response;
}

askGemini("What is React?");
// hello hello hello 
