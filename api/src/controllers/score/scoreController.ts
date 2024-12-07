import "dotenv/config.js";
import { Request, Response } from "express";
import db from "../../db/postgresql.js";
import LanguageLevel from "../../models/language_levels/language_levels_model.js";

/*____________________
| ----- AZURE ----- */
import UserScores from "../../models/user_score/user_scores_model.js";
import * as sdkazure from "microsoft-cognitiveservices-speech-sdk";
import _ from "lodash";
import * as path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath.path);

/*_________________________________________
|   PATH WHERE MY FILES WILL BE LOCATED   */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*________________________________________
|   FUNCTION TO FIX THE CORRUPT AUDIO   */
function convertAudio(inputPath: any, outputPath: any) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .on("end", () => {
        console.log("Conversion completed.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error in conversion:", err);
        reject(err);
      })
      .run();
  });
}

/*_______________
|   CALLBACK   */
function callback(error: any) {
  console.log(error);
}

/*__________________
|   SCORE AUDIO   */
export async function audioScore(req: Request, res: Response) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).send("No file uploaded or file is corrupted.");
    }
    console.log("__dirname ", __dirname);

    // 1) Tomo el audio corrupto
    const tempFilePath = path.join(__dirname, "input_audio.wav");
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // 2) Lo reparo para que sea aceptable por el azure
    const outputFilePath = path.join(__dirname, "output_audio.wav");
    await convertAudio(tempFilePath, outputFilePath);

    // 3) Realizo las configuraciones (credenciales, lengua y la frase a comparar)
    const speechConfig = sdkazure.SpeechConfig.fromSubscription(
      "b26e3d8292384860871e4f1eb684a283",
      "eastus"
    );

    speechConfig.speechRecognitionLanguage = "en-US";
    const textToMatch = req.body.dialog;

    // 4) Leo el audio, hago que el azure lo reconozca
    const fileBuffer = fs.readFileSync(outputFilePath);

    if (fileBuffer.length === 0) {
      throw new Error("El buffer de audio está vacío.");
    }

    const audioConfig = sdkazure.AudioConfig.fromWavFileInput(fileBuffer);

    console.log("quiero ver que dice", audioConfig);

    // 5) Califico la pronunciación
    const pronunciationAssesstmentConfig =
      new sdkazure.PronunciationAssessmentConfig(
        textToMatch,
        sdkazure.PronunciationAssessmentGradingSystem.HundredMark,
        sdkazure.PronunciationAssessmentGranularity.FullText,
        true
      );
    pronunciationAssesstmentConfig.enableProsodyAssessment = true;

    const recognizer = new sdkazure.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssesstmentConfig.applyTo(recognizer);

    async function onRecognizedResult(result: any) {
      try {
        const resultPronunciation =
          sdkazure.PronunciationAssessmentResult.fromResult(result);

        // 6) Hago uso de la function para extraer el resultado de la calificación
        const pronunciation_level: any = [];
        const words: any = [];
        const statistics_sentece = {
          accuracy_score: {},
          pronunciation_score: {},
          completeness_score: {},
          fluency_score: {},
          prosody_score: {},
        };

        statistics_sentece.accuracy_score = resultPronunciation.accuracyScore;
        statistics_sentece.pronunciation_score =
          resultPronunciation.pronunciationScore;
        statistics_sentece.completeness_score =
          resultPronunciation.completenessScore;
        statistics_sentece.fluency_score = resultPronunciation.fluencyScore;
        statistics_sentece.prosody_score = resultPronunciation.prosodyScore;

        pronunciation_level.push(statistics_sentece);

        _.forEach(resultPronunciation.detailResult.Words, (word, idx) => {
          console.log("    ", idx + 1, ": word complete params: ", word);
          // console.log("AccuracyScore: ",word.PronunciationAssessment ? word.PronunciationAssessment.AccuracyScore : "");
          // console.log("ErrorType ", word.PronunciationAssessment ? word.PronunciationAssessment.ErrorType : "");

          const statistics_word = {
            index: idx + 1,
            word: word.Word,
            pronunciation: word.PronunciationAssessment
              ? word.PronunciationAssessment.AccuracyScore
              : "",
            pronunciationAssessment: word.PronunciationAssessment
              ? word.PronunciationAssessment.ErrorType
              : "",
          };

          words.push(statistics_word); //Esto no me trae toda la inforamcion completa me trae un string vacio
        });

        pronunciation_level.push(words);
        
        console.log(req.body.id_plan, 'no encontro ninguno');
        // 6.1) Guardo el registro del score del usuario        
        if (req.body.id_plan == 2) {
          await UserScores.create({
            id_user: req.body.id_user,
            id_dialog: null,
            score: pronunciation_level,
          });
          console.log(req.body.id_plan, 'entro en este plan');
        } else if (req.body.id_plan == 1) {
          await UserScores.create({
            id_user: req.body.id_user,
            id_dialog: req.body.id_dialog,
            score: pronunciation_level,
          });
          console.log(req.body.id_plan, 'entro en este plan');
        }

        recognizer.close();
        fs.unlink(tempFilePath, callback);
        fs.unlink(outputFilePath, callback);

        res.json({
          pronunciation_level,
        });
      } catch (e) {
        fs.unlink(tempFilePath, callback);
        fs.unlink(outputFilePath, callback);
        res.json({ error: true });
        console.log("Error en la fn onRecognized: ", e);
      }
    }

    // 7) Hago uso de la function para devolver los resultados
    recognizer.recognizeOnceAsync(
      (result) => {
        onRecognizedResult(result);
      },
      (err) => {
        res.status(500).send("Error processing audio. " + err);
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

/*_______________________
|   GET AVERAGE USER   */
export async function getUserScoreAverage(req: Request, res: Response) {
  try {
    const { id_user } = req.params;

    const userData = await db.query(
      `
      SELECT 
          id_user,
          AVG((score->0->>'accuracy_score')::numeric) AS avg_accuracy_score,
          AVG((score->0->>'pronunciation_score')::numeric) AS avg_pronunciation_score,
          AVG((score->0->>'completeness_score')::numeric) AS avg_completeness_score,
          AVG((score->0->>'fluency_score')::numeric) AS avg_fluency_score,
          AVG((score->0->>'prosody_score')::numeric) AS avg_prosody_score
      FROM users_scores
      where id_user = :id_user
      GROUP BY id_user;`,
      {
        replacements: {
          id_user,
        },
      }
    );

    res.json(userData[0]);
  } catch (error) {
    console.log(error);
  }
}

/*_________________________
|-----   CHATGPT ------  */
const key = String(process.env.KEY);
import "dotenv/config.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: key,
});

export async function consumeChatGpt(req: Request, res: Response) {
  try {
    const { data, chat } = req.body;

    console.log("data", data);
    console.log("chat", chat);

    let chatJSON = JSON.parse(chat);

    let messages: Array<{ role: "system" | "user"; content: string }> = [];

    if (!chat) { //La primera vez que se crea el chat
      
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
            content: `We are in a ${data.situation}. My name is ${data.name} ${data.last_name}. You will take on the role appropriate to the situation and lead the conversation about ${data.topic}. Please simulate a real-life conversation without acknowledging that you are an AI and avoid starting responses with labels like "Interviewer:". For example, if the situation is a daily standup, act as a project manager and ask me relevant questions about the project's progress. Keep the conversation natural, focus on relevant questions, and avoid any meta-commentary about being a bot or AI. The conversation is in this English level ${englishLevel.level}.
      
            APPLY_RULES_NOW: Whenever I say the word 'APPLY_RULES_NOW', you must immediately reinforce and apply the following rules throughout the conversation, no matter how long it lasts:
            - You are in a ${data.situation} situation and must continue acting accordingly.
            - The main topic is ${data.topic}. Stay focused on this topic at all times.
            - The language must remain in English, tailored to the proficiency level: ${englishLevel.level}.
            - Keep your responses concise, relevant, and directly related to the situation. Avoid unnecessary information or straying from the character you are portraying.
            - You should never mention that you are an AI, nor break character. Stay consistent in your role for the entire conversation, no matter how long it gets.

            If at any point you stray from these rules, immediately correct yourself and return to the established role and situation as soon as I say 'APPLY_RULES_NOW'.`,
          },
        ];
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

      res.json({system: chat_gpt_answer});

    } else { //Cuando el usuario ya empieza a mandar audios

      if (!req.file || !req.file.buffer) {
        return res.status(400).send("No file uploaded or file is corrupted.");
      }
      console.log("__dirname ", __dirname);

      // 1) Tomo el audio corrupto
      const tempFilePath = path.join(__dirname, "input_audio.wav");
      fs.writeFileSync(tempFilePath, req.file.buffer);

      // 2) Lo reparo para que sea aceptable por el azure
      const outputFilePath = path.join(__dirname, "output_audio.wav");
      await convertAudio(tempFilePath, outputFilePath);

      // 3) Realizo las configuraciones (credenciales, lengua y la frase a comparar)
      const speechConfig = sdkazure.SpeechConfig.fromSubscription(
        "b26e3d8292384860871e4f1eb684a283",
        "eastus"
      );

      speechConfig.speechRecognitionLanguage = "en-US";

      // 4) Leo el audio, hago que el azure lo reconozca
      const fileBuffer = fs.readFileSync(outputFilePath);

      if (fileBuffer.length === 0) {
        throw new Error("El buffer de audio está vacío.");
      }

      const audioConfig = sdkazure.AudioConfig.fromWavFileInput(fileBuffer);

      // Crear el reconocedor de habla
      const recognizer = new sdkazure.SpeechRecognizer(
        speechConfig,
        audioConfig
      );

      // 5) Transcribir el audio
      recognizer.recognizeOnceAsync(async (result) => {
        try {
          if (result.reason === sdkazure.ResultReason.RecognizedSpeech) {
            console.log(`Texto transcrito: ${result.text}`); 

            if(!result.text){
              throw new Error('El texto está vacio');
            }

            let userMessage:any = [{
              role: "user",
              content: `Remember: Stay in character. The topic is ${data.topic}, and the conversation should be focused on ${data.situation}. Do not break character. APPLY_RULES_NOW
              message: ${result.text}`
            }];
            

            chatJSON.push({
              role: "user",
              content: `${result.text}`
            });


            console.log("Mensaje que se le envia GPT", userMessage);

            const stream = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: userMessage,
              stream: true,
            });

            let chat_gpt_answer = "";

            for await (const chunk of stream) {
              const context = chunk.choices[0]?.delta?.content || "";
              if (context) {
                chat_gpt_answer += context;
              }
            }

            chatJSON.push({ system: chat_gpt_answer })
            console.log('response ',chatJSON);
            res.json(chatJSON);
          }
        } catch (error) {
          console.log('ERROR: ', error);
          res.status(500).send({
            message: "Error al transcribir el audio: ",
            error,
          });
        }
      });
    };

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
  }
}
