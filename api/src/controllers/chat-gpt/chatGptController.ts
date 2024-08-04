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
    const { data } = req.body;

    console.log('lo que me llega', data)

    const englishLevel: any = await LanguageLevel.findOne({
      where: {
        id: data.id_language_level
      },
      attributes: ['id']
    });

    if(englishLevel){
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Simularemos una conversación, empezaras hablando , hablaremos en este nivel de ingles ${englishLevel.id}, el tema sera ${data.topic}, que tus respuestas sean metiendote exclusivamente en el personaje, solo responde los dialogos sin decir inicialmente "sure ..." ni nada de eso y que tus dialogos sean breves y directos`,
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
    }else {
      console.log('nose encontro ningun nivel con ese id')
    }

    
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
  }
}
