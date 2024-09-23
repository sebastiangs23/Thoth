import "dotenv/config.js";
import OpenAI from "openai";
import { Request, Response } from "express";
import LanguageLevel from "../../models/language_levels/language_levels_model.js";

const key = String(process.env.KEY);

const openai = new OpenAI({
  apiKey: key,
});

export async function consumeChatGpt(req: Request, res: Response) {
  try {
    const { data, conversationHistory } = req.body;

    console.log('lo que me llega', data, conversationHistory)

    let messages : Array<{role: "system" | "user", content:string}> = [];

    if (!conversationHistory) {
      const englishLevel: any = await LanguageLevel.findOne({
        where: {
          id: data.id_language_level,
        },
        attributes: ["level"],
      });

      if (englishLevel) {
        messages = [
          {
            role: "user",
            content: `We are in a ${data.situation}. My name is ${data.name} ${data.last_name}. You will take on the role appropriate to the situation and lead the conversation about ${data.topic}. Please simulate a real-life conversation without acknowledging that you are an AI and avoid starting responses with labels like "Interviewer:". For example, if the situation is a daily standup, act as a project manager and ask me relevant questions about the project's progress. Keep the conversation natural, focus on relevant questions, and avoid any meta-commentary about being a bot or AI. The convesation is in this English level ${englishLevel.level}`,
          },
        ];
      } else if (conversationHistory) {

        messages = [...conversationHistory, {
          role: "user",
          content: "mensaje de usuario que tengo que sacar de azure xd"
        }];
        
      }
    };

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      stream: true,
    });

    let chat_gpt_answer = "";

    for await (const chunk of stream) {
      const context = chunk.choices[0]?.delta?.content || "";
      if (context) {
        chat_gpt_answer += context;
      }
    }

    console.log({ system: chat_gpt_answer });
    res.json({ system: chat_gpt_answer });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
  }
}
