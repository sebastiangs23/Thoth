import { Request, Response } from "express";
import UserScores from "../../models/user_score/user_scores_model";
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
function callback(error: any){
  console.log(error);
}

/*__________________
|   SCORE AUDIO   */
export default async function audioScore(req: Request, res: Response) {
  try {
    
    if (!req.file || !req.file.buffer) {
      return res.status(400).send("No file uploaded or file is corrupted.");
    }
    console.log('__dirname ', __dirname);

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

    // 5) Califico la pronunciación
    const pronunciationAssesstmentConfig = new sdkazure.PronunciationAssessmentConfig(
      textToMatch,
      sdkazure.PronunciationAssessmentGradingSystem.HundredMark,
      sdkazure.PronunciationAssessmentGranularity.FullText,
      true
    );
    pronunciationAssesstmentConfig.enableProsodyAssessment = true;

    const recognizer = new sdkazure.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssesstmentConfig.applyTo(recognizer);


    // 6) Hago uso de la function para extraer el resultado de la calificación
    const pronunciation_level:any = [];
    const words:any = [];
    const statistics_sentece = {
      accuracy_score: {},
      pronunciation_score: {},
      completeness_score: {},
      fluency_score: {},
      prosody_score: {},
    };

    async function onRecognizedResult(result: any) {
      try {
        const resultPronunciation = sdkazure.PronunciationAssessmentResult.fromResult(
          result
        );

        statistics_sentece.accuracy_score = resultPronunciation.accuracyScore;
        statistics_sentece.pronunciation_score = resultPronunciation.pronunciationScore;
        statistics_sentece.completeness_score = resultPronunciation.completenessScore;
        statistics_sentece.fluency_score = resultPronunciation.fluencyScore;
        statistics_sentece.prosody_score = resultPronunciation.prosodyScore;

        pronunciation_level.push(statistics_sentece);

        _.forEach(resultPronunciation.detailResult.Words, (word, idx) => {
          console.log("    ", idx + 1, ": word: ", word.Word);
          console.log("AccuracyScore: ",word.PronunciationAssessment ? word.PronunciationAssessment.AccuracyScore : "");
          console.log("ErrorType ", word.PronunciationAssessment ? word.PronunciationAssessment.ErrorType : "");

          const statistics_word = {
            index: idx + 1,
            word: word.Word,
            pronunciation: word.PronunciationAssessment ? word.PronunciationAssessment.AccuracyScore : "",
            pronunciationAssessment: word.PronunciationAssessment ? word.PronunciationAssessment.ErrorType : "",
          };

          words.push(statistics_word);
        });

        pronunciation_level.push(words);

        // 6.1) Guardo el registro del score del usuario
        const user_score = await UserScores.findAll();

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
