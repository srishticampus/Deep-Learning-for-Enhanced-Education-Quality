import React, { useState, useRef } from "react";
import { UserNavbar } from "../navbar/userNavbar";
import { Footer } from "../../landing/footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function SelfIntroduction() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
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

  // Upload Audio and User Data
  const uploadAudio = async () => {
    if (!audioUrl) {
      alert("No recorded audio found!");
      return;
    }

    const response = await fetch(audioUrl);
    console.log(response,"res");
    
    const blob = await response.blob();
    console.log(blob,"blob");
    

    const formData = new FormData();
    formData.append("audioUrl", blob, "recording.wav");
    formData.append("userData", userdata);
    formData.append("id", id);
    

    try {
        console.log(formData,"form");

      // const res = await axios.post("http://your-backend-url.com/api/upload-audio", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      // if (res.status === 200) {
      //   console.log("Audio uploaded successfully!", res.data);
        navigate(`/user/interview-preview/${id}`);
      // } else {
      //   console.error("Upload failed");
      // }
    } catch (error) {
      console.error("Error uploading audio:", error);
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
          <p className="text-gray-600 text-lg leading-relaxed">Please introduce yourself.</p>

          <div className="mt-6 flex items-center gap-4">
            <button
              disabled={isDisable}
              onClick={isRecording ? stopRecording : startRecording}
              className={`btn btn-primary m-5 ${
                isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
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
                <div className="row">
                  <div className="col-6">
                    <button className="btn btn-primary mb-5" onClick={() => window.location.reload()}>
                      Retake
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary mb-5" onClick={uploadAudio}>
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
