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
    const { nombre_ia, nivel_ingles , tema_conversacion, data } = req.params;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Simularemos una conversación entre 2 personas, tu seras el primero que hablara y el que normalmente hara las preguntas , pero yo te preguntare aveces cosas, hablaremos en este nivel de ingles ${nivel_ingles}, el tema sera ${tema_conversacion}, que tus respuestas sean metiendote exclusivamente en el personaje, solo responde los dialogos sin decir inicialmente "sure ..." ni nada de eso y que tus dialogos sean breves y directos`,
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
