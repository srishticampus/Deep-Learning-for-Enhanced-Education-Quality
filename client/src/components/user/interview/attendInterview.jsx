import React, { useState, useRef, useEffect, startTransition } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { UserNavbar } from "../navbar/userNavbar";
import { Footer } from "../../landing/footer";
import { useNavigate } from "react-router-dom";
import { APPLICATION_STATUS, LEXI_USER_ID } from "../../../constants/constants";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useUserData } from "../../../hooks/useUserData";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { useParams } from "react-router-dom";
import { errorToast, successToast } from "../../../utils/showToast";
export const AttendInterview = () => {
  const [questions, setQuestions] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [stream, setStream] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const menuRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [trackingScore, setTrackingScore] = useState(Array(30).fill(-1));
  const userData = useUserData();
  const { id } = useParams();
  /////////generate questions////////

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem(LEXI_USER_ID)) || null;
    if (!userId) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      navigate("/user/signin");
      return;
    }
    // it should runs only once
    if (questions.length === 0) {
      generateQues(userId);
    }
  }, []);

  const generateQues = async (userId) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(`generate-mcqs/${userId}/`);
      if (res.status === 200) {
        setQuestions(res.data?.mcqs?.slice(0, 30) || []);
        setCurrentQuestion(res.data?.mcqs[0] || {});
        setError(false);
        setupMedia();
      }
    } catch (error) {
      console.log("Error on generate mcqs", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateScore = (key) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
    setSelectedOption(key);
    const answer = currentQuestion.answer;
    const questionId = currentQuestion.id;
    const existingScore = [...trackingScore];
    if (answer === key) {
      existingScore[questionId - 1] = 1;
    } else {
      existingScore[questionId - 1] = 0;
    }
    setTrackingScore(existingScore);
  };

  const submitAnswers = () => {
    let finalScore = 0;
    trackingScore.forEach((score) => {
      if (score === 1) {
        finalScore += 1;
      }
    });
    submitInterviewResult(finalScore);
  };
  //generate questions end  */
  const submitInterviewResult = async (score) => {
    try {
      const response = await axiosInstance.post(`/update-application-status/`, {
        application_id: id,
        status: APPLICATION_STATUS.TECHNIAL_INTERVIEW_COMPLETED,
      });
      const secondRes = await axiosInstance.post(`/update-score/${id}/`, {
        score,
      });

      if (response.status === 200 && secondRes.status === 200) {
        successToast("Interview completed successfully");
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        navigate("/user/interview-score/" + id);
      }
    } catch (error) {
      console.error("Error submitting interview score:", error);
    }
  };

  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(
          (device) => device.kind === "videoinput"
        );
        if (videoInputs.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoInputs[0].deviceId);
        }
      } catch (err) {
        console.error("Error getting video devices:", err);
      }
    };

    getVideoDevices();
  }, []);
  const setupMedia = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 500);
    } catch (err) {
      console.error("Error accessing media devices:", err);

      if (err.name === "NotReadableError") {
        errorToast(
          "Your camera is already in use by another application. Close any other apps using the camera."
        );
      } else if (err.name === "NotAllowedError") {
        errorToast(
          "Camera access is blocked. Please allow camera permissions in your browser settings."
        );
      }
    }
  };
  useEffect(() => {
    if (selectedDeviceId) {
      setupMedia();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop()); // Stop camera on unmount
      }
    };
  }, [selectedDeviceId]);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = audioEnabled;
      });
      stream.getVideoTracks().forEach((track) => {
        track.enabled = videoEnabled;
      });
    }
  }, [audioEnabled, videoEnabled, stream]);

  const toggleAudio = () => setAudioEnabled(!audioEnabled);
  const toggleVideo = () => setVideoEnabled(!videoEnabled);

  const getOptions = (question) => [
    { key: "option1", value: question.option1 },
    { key: "option2", value: question.option2 },
    { key: "option3", value: question.option3 },
    { key: "option4", value: question.option4 },
  ];

  if (isLoading) {
    return (
      <div>
        <UserNavbar />
        <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen">
          <h1>
            Please wait a moment while we generate relevant questions for you...
          </h1>
          <div className="tw-animate-spin tw-rounded-full tw-h-16 tw-w-16 tw-border-b-2 tw-border-gray-900"></div>
        </div>

        <Footer />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <UserNavbar />
        <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-flex-col">
          <h1 className="tw-text-xl tw-font-bold tw-text-red-500">
            Oops! Something went wrong. Please try again later.
          </h1>

          <button
            onClick={() => {
              if (stream) {
                stream.getTracks().forEach((track) => track.stop());
              }
              navigate(-1);
            }}
            className="tw-mt-4 tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded"
          >
            Go Back
          </button>
        </div>

        <Footer />
      </div>
    );
  }
  return (
    <>
      <UserNavbar />
      <div className="tw-min-h-screen tw-bg-gray-50 tw-p-6">
        <div className="tw-container tw-mx-auto">
          <div className="tw-grid tw-grid-cols-[1fr,300px] tw-gap-6">
            {/* Main Content */}
            <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-8">
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
                <div className="tw-text-gray-600">
                  Question {currentQuestion.id}/{questions.length}
                </div>
                {/* <div className="tw-text-blue-600 tw-font-semibold">
                  Time Remaining : {formatTime(timeRemaining)}
                </div> */}
              </div>

              <div className="tw-mb-8">
                <h2 className="tw-text-xl tw-font-semibold tw-mb-6">
                  {currentQuestion?.question}
                </h2>
                <div className="tw-space-y-4">
                  {getOptions(currentQuestion).map(({ key, value }) => {
                    console.log("key va", key, value, selectedOption);
                    return (
                      <label
                        key={key}
                        className={`tw-flex tw-items-center tw-p-4 tw-border tw-rounded-lg tw-cursor-pointer tw-transition-colors
                    ${
                      selectedOption === key
                        ? "tw-border-blue-500 tw-bg-blue-50"
                        : "tw-border-gray-200 hover:tw-bg-gray-50"
                    }`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          className="tw-h-4 tw-w-4 tw-text-blue-600"
                          checked={selectedOption === key}
                          onChange={() => {
                            calculateScore(key);
                          }}
                        />
                        <span className="tw-ml-3">{value}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="tw-flex tw-w-full tw-justify-around">
                <button
                  className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2"
                  disabled={currentQuestion?.id === 1}
                  onClick={() => {
                    const prevId = currentQuestion?.id - 1;
                    if (prevId > 0) {
                      const prevQuestion = questions.find(
                        (q) => q.id === prevId
                      );
                      setCurrentQuestion(prevQuestion);

                      setSelectedOption(selectedAnswers[prevId] || null);
                    }
                  }}
                >
                  Prev
                  <ChevronLeft className="tw-w-4 tw-h-4" />
                </button>

                {currentQuestion?.id === questions.length && (
                  <button
                    className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2"
                    onClick={() => {
                      submitAnswers();
                    }}
                  >
                    Submit
                    <ChevronRight className="tw-w-4 tw-h-4" />
                  </button>
                )}
                {currentQuestion?.id !== questions.length && (
                  <button
                    className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2"
                    onClick={() => {
                      const nextId = (currentQuestion?.id % 30) + 1;
                      const nextQuest = questions.find((q) => q.id === nextId);
                      setCurrentQuestion(nextQuest);
                      setSelectedOption(selectedAnswers[nextId] || null);
                    }}
                  >
                    Next
                    <ChevronRight className="tw-w-4 tw-h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="tw-space-y-6">
              {/* Video Preview */}
              <div className="tw-bg-gray-800 tw-rounded-xl tw-overflow-hidden">
                <div className="tw-aspect-video tw-relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`tw-h-full tw-w-full tw-object-cover ${
                      !videoEnabled ? "" : ""
                    }`}
                  />
                  {!videoEnabled && (
                    <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-900">
                      <div className="tw-h-20 tw-w-20 tw-rounded-full tw-bg-blue-600 tw-flex tw-items-center tw-justify-center">
                        <span className="tw-text-2xl tw-font-bold tw-text-white">
                          {capitalizeFirstLetter(
                            userData?.username?.slice(0, 1) || "A"
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="tw-absolute tw-bottom-4 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-flex tw-gap-2">
                    <button
                      onClick={toggleAudio}
                      className={`tw-rounded-full tw-p-2 tw-transition ${
                        audioEnabled ? "tw-bg-blue-600" : "tw-bg-red-600"
                      }`}
                    >
                      {audioEnabled ? (
                        <Mic className="tw-h-5 tw-w-5 tw-text-white" />
                      ) : (
                        <MicOff className="tw-h-5 tw-w-5 tw-text-white" />
                      )}
                    </button>

                    <div className="tw-relative" ref={menuRef}>
                      <div className="tw-flex tw-gap-1">
                        <button
                          onClick={toggleVideo}
                          className={`tw-rounded-full tw-p-2 tw-transition ${
                            videoEnabled ? "tw-bg-blue-600" : "tw-bg-red-600"
                          }`}
                        >
                          {videoEnabled ? (
                            <Video className="tw-h-5 tw-w-5 tw-text-white" />
                          ) : (
                            <VideoOff className="tw-h-5 tw-w-5 tw-text-white" />
                          )}
                        </button>
                    
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tw-p-4 tw-text-white">
                  <h3 className="tw-font-medium">{userData?.username}</h3>
                </div>
              </div>

              {/* Question Navigation */}
              <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-4">
                <h3 className="tw-text-gray-600 tw-mb-4">
                  Question Navigation
                </h3>
                <div className="tw-grid tw-grid-cols-5 tw-gap-2">
                  {questions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentQuestion(q);
                        setSelectedOption(selectedAnswers[q.id] || null);
                      }}
                      className={`tw-h-10 tw-w-10 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-font-medium tw-transition
                      ${
                        trackingScore[i] !== -1
                          ? "tw-bg-blue-600 tw-text-white"
                          : "tw-border tw-border-gray-200 tw-text-gray-600 hover:tw-bg-gray-50"
                      }`}
                    >
                      {q.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
