import "dotenv/config.js";
import OpenAI from "openai";
import { Request, Response } from "express";

const PORT = Number(process.env.PORT);
const key = String(process.env.KEY);

console.log("la PORT en teoria: ", PORT);

const openai = new OpenAI({
  apiKey: key,
});

export async function consumeChatGpt(req: Request, res: Response) {
  try {
    const { tema_conversacion, data } = req.body;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `You a rea recruiter`,
          //content: "Make me a questions like an interview about VueJS. Start with the questions, without saying anything else, start with one question",
        },
      ],
      stream: true,
    });

    let chat_gpt_answer = "";

    for await (const chunk of stream) {
      const context = chunk.choices[0]?.delta?.content || "";
      if (context) {
        chat_gpt_answer += context;
      }
    }

    console.log(chat_gpt_answer);
    res.json({ message: chat_gpt_answer });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
  }
}
