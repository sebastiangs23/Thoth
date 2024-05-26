import { Request, Response } from "express";
import * as sdkazure from "microsoft-cognitiveservices-speech-sdk";
import _ from "lodash";
import fs from 'fs';

export default async function audioScore(req: Request, res: Response) {
  try {
    console.log('Data received');
    console.log(req.body.dialog);
    console.log(req.file);

    if (!req.file || !req.file.buffer) {
      return res.status(400).send('No file uploaded or file is corrupted.');
    }

    if (req.file && req.file.buffer) {
      // Guardar el archivo temporalmente en el servidor para verificación
      console.log('hola')
      fs.writeFileSync('tempfile.wav', req.file.buffer);
    }

    const speechConfig = sdkazure.SpeechConfig.fromSubscription("b26e3d8292384860871e4f1eb684a283", "eastus");
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = sdkazure.AudioConfig.fromWavFileInput(req.file.buffer);

    const textToMatch = req.body.dialog;

    console.log('paso 2 bien', req.body.dialog)
    const pronunciationAssessmentConfig = new sdkazure.PronunciationAssessmentConfig(
      textToMatch,
      sdkazure.PronunciationAssessmentGradingSystem.HundredMark,
      sdkazure.PronunciationAssessmentGranularity.FullText,
      true
    );
    pronunciationAssessmentConfig.enableProsodyAssessment = true;
    console.log('paso 3 bien');
    
    let recognizer = new sdkazure.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssessmentConfig.applyTo(recognizer);

    console.log('paso 4')
    const result = await new Promise<sdkazure.SpeechRecognitionResult>((resolve, reject) => {
      recognizer.recognizeOnceAsync(resolve, reject);
    });

    console.log('paso 5')
    const resultPronunciation = sdkazure.PronunciationAssessmentResult.fromResult(result);
    let pronunciation_level = [];
    let words:any = [];
    
    let statistics_sentence = {
      accuracy_score: resultPronunciation.accuracyScore,
      pronunciation_score: resultPronunciation.pronunciationScore,
      completeness_score: resultPronunciation.completenessScore,
      fluency_score: resultPronunciation.fluencyScore,
      prosody_score: resultPronunciation.prosodyScore
    };

    pronunciation_level.push(statistics_sentence);
    console.log('paso 6')
    resultPronunciation.detailResult.Words.forEach((word, idx) => {
      let statistics_word = {
        index: idx + 1,
        word: word.Word,
        pronunciation: word.PronunciationAssessment ? word.PronunciationAssessment.AccuracyScore : 0,
        pronunciationAssessment: word.PronunciationAssessment ? word.PronunciationAssessment.ErrorType : ""
      };
      words.push(statistics_word);
    });

    pronunciation_level.push(words);

    recognizer.close();
    res.json({ pronunciation_level });
  } catch (error) {
    console.error("Error en el controlador audioScore:", error);
    res.status(500).send("Internal Server Error");
  }
}