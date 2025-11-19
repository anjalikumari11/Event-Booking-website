import { GoogleGenerativeAI } from "@google/generative-ai";
import db from "../config/db.js";

export const generateDescription = async (req, res) => {
  try {
    const { title } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Write a professional, attractive and short event description for the event: "${title}". And the format of the desciption is in the plan text and the format of the output is 
    {
    "title": INPUT_TITLE,
    "description: GENERATED_DESCRIPTION in plain text
     } and this is the proper json format only return json.`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replaceAll("```json", "").replaceAll("```", "").replaceAll("undefined", "")
    var jsonOutput = JSON.parse(text);
    res.json({ description: jsonOutput['description'] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "AI Error" });
  }
};

export const aiQuestionAns = async (req, res) => {
  try {
    const { ques } = req.body;
    const [events] = await db.query("SELECT title,price,VIP_price,category,location,end_date FROM events");
    let matchedEvent = null;
    for (let event of events) {
      if (ques.toLowerCase().includes(event.title.toLowerCase())) {
        matchedEvent = event;
        break;
      }
    }
    if (!ques) {
      return res.status(400).json({ error: "Question is required" });
    }
    let eventContext = "No matching event found in database.";
    if (matchedEvent) {
      eventContext = `
      Event found
     Event Name: ${matchedEvent.title}
      Ticket Price: ₹${matchedEvent.price}
        Category: ${matchedEvent.category}
        location: ${matchedEvent.location}
        end date: ${matchedEvent.end_date}
      `;
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an Event Assistant AI.
if any one write hi then greet them nicely 
User asked: "${ques}"

Here is the event information from the database:
${eventContext}

If event found tell the information related to that event if any user write the title and if found then write only price,category or related question give answer accordingly :

 - Tell exact price
 - Give clear answer
If no event found:
 - Tell user "Event not found, please check the name again."

Return simple, clear answer.
`;

    const result = await model.generateContent(prompt);
    let answer = result.response.text();

    answer = answer.replaceAll("```", "");

    res.json({ reply: answer });

  } catch (error) {
    console.log("AI ERROR:", error);
    res.status(500).json({ error: "AI Error" });
  }
};