import { Request, Response } from 'express';
import * as sdkazure from 'microsoft-cognitiveservices-speech-sdk';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function audioScore(req: Request, res: Response) {
  try {
    console.log(req.file);
    console.log("req.file");

    if (!req.file || !req.file.buffer) {
      return res.status(400).send('No file uploaded or file is corrupted.');
    }

    // Verificar el mimetype
    if (req.file.mimetype !== 'audio/wav') {
      return res.status(400).send('Invalid file type. Only WAV files are supported.');
    }

    console.log('PASO 1');
    const speechConfig = sdkazure.SpeechConfig.fromSubscription('b26e3d8292384860871e4f1eb684a283', 'eastus');

    // Guardar el archivo temporalmente
    console.log('__dirname ', __dirname);
    const tempFilePath = path.join(__dirname, `${uuidv4()}.wav`);
    console.log('Saving temporary file to: ', tempFilePath);

    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Verificar si el archivo se ha guardado correctamente
    if (!fs.existsSync(tempFilePath)) {
      console.log('File not saved correctly');
      return res.status(500).send('Error saving audio file.');
    }

    console.log('File saved correctly: ', tempFilePath);
    const audioConfig = sdkazure.AudioConfig.fromWavFileInput(fs.readFileSync(tempFilePath));

    console.log('PASO 2');
    speechConfig.speechRecognitionLanguage = 'en-US';

    console.log('PASO 3');
    const textToMatch = req.body.dialog;

    console.log('PASO 4');
    const pronunciationAssesstmentConfig = new sdkazure.PronunciationAssessmentConfig(
      textToMatch,
      sdkazure.PronunciationAssessmentGradingSystem.HundredMark,
      sdkazure.PronunciationAssessmentGranularity.FullText,
      true,
    );
    pronunciationAssesstmentConfig.enableProsodyAssessment = true;

    console.log('PASO 5');
    let recognizer = new sdkazure.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssesstmentConfig.applyTo(recognizer);
    console.log('recognizer ', recognizer);

    let pronunciation_level: any = [];
    let words: any = [];
    let statistics_sentece = {
      accuracy_score: {},
      pronunciation_score: {},
      completeness_score: {},
      fluency_score: {},
      prosody_score: {}
    };

    let statistics_word = {
      index: 0,
      word: "",
      pronunciation: {},
      pronunciationAssessment: ""
    };

    console.log('PASO 6');

    async function onRecognizedResult(result: any) {
      try {
        const resultPronunciation = sdkazure.PronunciationAssessmentResult.fromResult(result);

        console.log('PASO 6.1');

        statistics_sentece.accuracy_score = resultPronunciation.accuracyScore;
        statistics_sentece.pronunciation_score = resultPronunciation.pronunciationScore;
        statistics_sentece.completeness_score = resultPronunciation.completenessScore;
        statistics_sentece.fluency_score = resultPronunciation.fluencyScore;
        statistics_sentece.prosody_score = resultPronunciation.prosodyScore;

        pronunciation_level.push(statistics_sentece);

        console.log('PASO 6.2');
        _.forEach(resultPronunciation.detailResult.Words, (word, idx) => {
          console.log('PASO 6.3');
          console.log("    ", idx + 1, ": word: ", word.Word);
          console.log("AccuracyScore: ", word.PronunciationAssessment ? word.PronunciationAssessment.AccuracyScore : "");
          console.log('ErrorType ', word.PronunciationAssessment ? word.PronunciationAssessment.ErrorType : "");

          statistics_word.index = idx + 1;
          statistics_word.word = word.Word;
          statistics_word.pronunciation = word.PronunciationAssessment ? word.PronunciationAssessment.AccuracyScore : "";
          statistics_word.pronunciationAssessment = word.PronunciationAssessment ? word.PronunciationAssessment.ErrorType : "";
          words.push(statistics_word);
        });

        pronunciation_level.push(words);

        recognizer.close();

        console.log('LAST STEP');
        res.json({
          pronunciation_level,
        });

      } catch (e) {
        res.json({ error: true });
        console.log('Error en el controlador onRecognized: qualifyStudentAudioSentence ', e);
      } finally {
        // Eliminar el archivo temporal
        //fs.unlinkSync(tempFilePath);
      }
    }

    console.log('PASO 77');
    recognizer.recognizeOnceAsync((result) => {
      console.log('BEFORE ENTER TO THE FUNCTION ONRECOGNIZEDRESULT');
      onRecognizedResult(result);
    }, (err) => {
      console.log('Error en recognizeOnceAsync: ', err);
      res.status(500).send('Error processing audio.');
      //fs.unlinkSync(tempFilePath); // Eliminar el archivo temporal en caso de error
    });

  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
