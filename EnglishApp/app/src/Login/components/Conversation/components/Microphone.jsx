import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import base64 from "react-native-base64";

export default function Microphone({ dialog }) {
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [permissionResponse, setPermissionResponse] = useState({
    status: "granted",
  });

  async function requestPermission() {
    const response = await Audio.requestPermissionsAsync();
    setPermissionResponse(response);
  }

  async function startRecording() {
    try {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (error) {
      console.error("An error occurred while trying to start recording", error);
    }
  }

  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      await processAndSendAudio(uri, dialog);
    } catch (error) {
      console.error("An error occurred while trying to stop recording", error);
    }
  }

  async function processAndSendAudio(uri, dialog) {
    try {
      // Read the recorded file
      const audioFile = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const audioBuffer = Uint8Array.from(base64.decode(audioFile), c => c.charCodeAt(0));
  
      // Generate WAV headers
      const header = createWaveHeader({
        numChannels: 1,
        sampleRate: 44100,
        bitsPerSample: 16,
        dataSize: audioBuffer.length
      });
  
      // Combine the header and the audio data
      const wavArrayBuffer = new Uint8Array(header.length + audioBuffer.length);
      wavArrayBuffer.set(header, 0);
      wavArrayBuffer.set(audioBuffer, header.length);
  
      // Write the combined data to a new file
      const wavUri = `${FileSystem.documentDirectory}audio_with_header.wav`;
      await FileSystem.writeAsStringAsync(wavUri, base64.encodeFromByteArray(wavArrayBuffer), {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const formData = new FormData();
      formData.append('voice', {
        uri: wavUri,
        type: 'audio/wav',
        name: 'audio_with_header.wav',
      });
      formData.append('dialog', dialog);
  
      const response = await axios.post(
        'http://192.168.1.10:5000/score/audio',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error al intentar evaluar el audio', error.response ? error.response.data : error);
    }
  }

  function createWaveHeader(opts) {
    const numChannels = opts.numChannels || 1;
    const sampleRate = opts.sampleRate || 44100;
    const bitsPerSample = opts.bitsPerSample || 16;
    const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const dataSize = opts.dataSize;

    const buffer = new ArrayBuffer(44);
    const dv = new DataView(buffer);

    let p = 0;

    function writeString(s) {
      for (let i = 0; i < s.length; i++) {
        dv.setUint8(p + i, s.charCodeAt(i));
      }
      p += s.length;
    }

    function writeUint32(d) {
      dv.setUint32(p, d, true);
      p += 4;
    }

    function writeUint16(d) {
      dv.setUint16(p, d, true);
      p += 2;
    }

    writeString("RIFF"); // ChunkID
    writeUint32(dataSize + 36); // ChunkSize
    writeString("WAVE"); // Format
    writeString("fmt "); // Subchunk1ID
    writeUint32(16); // Subchunk1Size
    writeUint16(1); // AudioFormat
    writeUint16(numChannels); // NumChannels
    writeUint32(sampleRate); // SampleRate
    writeUint32(byteRate); // ByteRate
    writeUint16(blockAlign); // BlockAlign
    writeUint16(bitsPerSample); // BitsPerSample
    writeString("data"); // Subchunk2ID
    writeUint32(dataSize); // Subchunk2Size

    return new Uint8Array(buffer);
  }

  return (
    <View>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {audioUri && <Text>Audio file saved at: {audioUri}</Text>}
    </View>
  );
}
