import "dotenv/config.js";
import OpenAI from "openai";
import { Request, Response } from "express";

const key = String(process.env.KEY);

const openai = new OpenAI({
  apiKey: key,
});

export async function consumeAiMia(req: Request, res: Response) {
  try {
    const { data } = req.body;

    let messages: Array<{ role: "system" | "user"; content: string }> = [];

    messages = [
      {
        role: "user",
        content: `I would like you to perform this ${data.type_analysis} analysis on this asset witch is related to the cryptomarket, ${data.asset} and tell me a possible ${data.help}`,
      },
    ];

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

    messages.push({
      role: "system",
      content: chat_gpt_answer,
    });

    console.log({ system: chat_gpt_answer });
    res.json({ system: chat_gpt_answer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
