import { Request, Response } from "express";
import * as sdkazure from "microsoft-cognitiveservices-speech-sdk";
import _ from "lodash";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath.path);

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default async function audioScore(req: Request, res: Response) {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).send("No file uploaded or file is corrupted.");
    }

    const tempFilePath = path.join(__dirname, "input_audio.wav");
    fs.writeFileSync(tempFilePath, req.file.buffer);
    const outputFilePath = path.join(__dirname, "output_audio.wav");

    await convertAudio(tempFilePath, outputFilePath);

    //Ese audio transformado :)
    console.log("PASO 1");
    const speechConfig = sdkazure.SpeechConfig.fromSubscription(
      "b26e3d8292384860871e4f1eb684a283",
      "eastus"
    );
    console.log("outputFilePath --> ", outputFilePath);

    const stats = fs.statSync(outputFilePath);
    console.log("stats ..> ", stats);

    const fileBuffer = fs.readFileSync(outputFilePath);
    console.log("fileBuffer ---> ", fileBuffer);
    if (fileBuffer.length === 0) {
      throw new Error("El buffer de audio está vacío.");
    }

    if (stats.size === 0) {
      throw new Error("El archivo de audio está vacío.");
    }

    const audioConfig = sdkazure.AudioConfig.fromWavFileInput(fileBuffer); //mi audio aqui

    console.log("PASO 2");
    speechConfig.speechRecognitionLanguage = "en-US";

    console.log("PASO 3");
    const textToMatch = req.body.dialog;
    console.log("textToMath -->", textToMatch);

    console.log("PASO 4");
    const pronunciationAssesstmentConfig = new sdkazure.PronunciationAssessmentConfig(
      textToMatch,
      sdkazure.PronunciationAssessmentGradingSystem.HundredMark,
      sdkazure.PronunciationAssessmentGranularity.FullText,
      true
    );
    pronunciationAssesstmentConfig.enableProsodyAssessment = true;

    console.log("PASO 5");
    const recognizer = new sdkazure.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssesstmentConfig.applyTo(recognizer);

    const pronunciation_level:any = [];
    const words:any = [];
    const statistics_sentece = {
      accuracy_score: {},
      pronunciation_score: {},
      completeness_score: {},
      fluency_score: {},
      prosody_score: {},
    };

    console.log("PASO 6");

    async function onRecognizedResult(result: any) {
      try {
        const resultPronunciation = sdkazure.PronunciationAssessmentResult.fromResult(
          result
        );
        console.log("resultPronunciation -->", resultPronunciation);
        console.log("PASO 6.1");

        statistics_sentece.accuracy_score = resultPronunciation.accuracyScore;
        statistics_sentece.pronunciation_score =
          resultPronunciation.pronunciationScore;
        statistics_sentece.completeness_score =
          resultPronunciation.completenessScore;
        statistics_sentece.fluency_score = resultPronunciation.fluencyScore;
        statistics_sentece.prosody_score = resultPronunciation.prosodyScore;

        pronunciation_level.push(statistics_sentece);

        console.log("PASO 6.2");
        _.forEach(resultPronunciation.detailResult.Words, (word, idx) => {
          console.log("PASO 6.3");
          console.log("    ", idx + 1, ": word: ", word.Word);
          console.log(
            "AccuracyScore: ",
            word.PronunciationAssessment
              ? word.PronunciationAssessment.AccuracyScore
              : ""
          );
          console.log(
            "ErrorType ",
            word.PronunciationAssessment
              ? word.PronunciationAssessment.ErrorType
              : ""
          );

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
          words.push(statistics_word);
        });

        pronunciation_level.push(words);

        recognizer.close();

        console.log("LAST STEP");
        res.json({
          pronunciation_level,
        });
      } catch (e) {
        res.json({ error: true });
        console.log("Error en la fn onRecognized: ", e);
      }
    }

    console.log("PASO 77");
    recognizer.recognizeOnceAsync(
      (result) => {
        console.log("BEFORE ENTER TO THE FUNCTION ONRECOGNIZEDRESULT");
        console.log("result ", result);
        onRecognizedResult(result);
      },
      (err) => {
        console.log("Error en recognizeOnceAsync: ", err);
        res.status(500).send("Error processing audio.");
      }
    );

  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
