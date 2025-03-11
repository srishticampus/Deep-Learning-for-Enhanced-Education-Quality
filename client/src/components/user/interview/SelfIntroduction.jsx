import React, { useState, useRef } from "react";
import { UserNavbar } from "../navbar/userNavbar";
import { Footer } from "../../landing/footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../../apis/axiosInstance";

function SelfIntroduction() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [transilateddata, setTransilatedData] = useState({});
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const userdata = localStorage.getItem("lexi-user-data");
  console.log(userdata, "userdata");

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsDisable(true);
    }
  };
  const GotoMockInterview = () => {
    navigate(`/user/interview-preview/${id}`);
  };

  const userid=localStorage.getItem("lexi-user-id")
  // Upload Audio and User Data
  const uploadAudio = async () => {
    if (!audioUrl) {
      alert("No recorded audio found!");
      return;
    }
    const convertWebMToWav = async (webmBlob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(webmBlob);

        reader.onloadend = async () => {
          try {
            const audioContext = new (window.AudioContext ||
              window.webkitAudioContext)();
            const audioBuffer = await audioContext.decodeAudioData(
              reader.result
            );
            const wavBlob = encodeWAV(audioBuffer);
            resolve(wavBlob);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (error) => reject(error);
      });
    };

    const encodeWAV = (audioBuffer) => {
      const numOfChannels = audioBuffer.numberOfChannels;
      const sampleRate = audioBuffer.sampleRate;
      const format = 1; // PCM
      const bitDepth = 16;

      let samples = audioBuffer.getChannelData(0); // Mono
      let buffer = new ArrayBuffer(44 + samples.length * 2);
      let view = new DataView(buffer);

      // WAV Header
      writeString(view, 0, "RIFF");
      view.setUint32(4, 32 + samples.length * 2, true);
      writeString(view, 8, "WAVE");
      writeString(view, 12, "fmt ");
      view.setUint32(16, 16, true);
      view.setUint16(20, format, true);
      view.setUint16(22, numOfChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numOfChannels * 2, true);
      view.setUint16(32, numOfChannels * 2, true);
      view.setUint16(34, bitDepth, true);
      writeString(view, 36, "data");
      view.setUint32(40, samples.length * 2, true);

      // Write PCM Data
      let offset = 44;
      for (let i = 0; i < samples.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, samples[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }

      return new Blob([view], { type: "audio/wav" });
    };

    const writeString = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    const response = await fetch(audioUrl);
    const blob = await response.blob();
    const wavBlob = await convertWebMToWav(blob);

    const formData = new FormData();
    formData.append("audio_file", wavBlob, "recording.mp3"); // Ensure key matches API requirement
    formData.append("user", userid); // Extract user ID

    try {
      const apiResponse = await axiosInstance.post(
        "/self-introduction/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("API Response:", apiResponse.data);
      setTransilatedData(apiResponse.data);
      // Navigate to the next page, possibly passing transcription data
    } catch (error) {
      console.error("Error uploading audio:", error);
      alert("Failed to upload audio. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <UserNavbar />
      <div className="container mx-auto px-6 flex flex-col items-center justify-center flex-grow py-10 text-center p-3">
        <div className="max-w-2xl p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-4xl font-bold text-secondary mb-4 p-4">
            Mock Interview - Start With Your Introduction
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Please introduce yourself.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button
              disabled={isDisable}
              onClick={isRecording ? stopRecording : startRecording}
              className={`btn btn-primary m-5 ${
                isRecording
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          </div>
          {/* Audio Playback */}
          <div className="text-center">
            {audioUrl && (
              <div>
                <audio controls className="w-100 my-4 px-5">
                  <source src={audioUrl} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>

                <p>{transilateddata.transcription}</p>
                {!transilateddata ||
                !transilateddata.transcription ||
                transilateddata.transcription.indexOf(
                  "Could not understand the audio"
                ) > -1 ? (
                  " "
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={GotoMockInterview}
                  >
                    {" "}
                    Start Now
                  </button>
                )}
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-primary mb-5"
                      onClick={() => window.location.reload()}
                    >
                      Retake
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary mb-5"
                      onClick={uploadAudio}
                    >
                      Upload & Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelfIntroduction;
