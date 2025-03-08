import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Clock,
  ListChecks,
  ChevronDown,
  Settings,
} from "lucide-react";
import { UserNavbar } from "../navbar/userNavbar";
import { Footer } from "../../landing/footer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export const InterviewPreview = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [stream, setStream] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [showDeviceMenu, setShowDeviceMenu] = useState(false);
  const videoRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setVideoDevices(videoInputs);
        if (videoInputs.length > 0 && !selectedDeviceId) {
          setSelectedDeviceId(videoInputs[0].deviceId);
        }
      } catch (err) {
        console.error("Error getting video devices:", err);
      }
    };

    getVideoDevices();
  }, []);

  useEffect(() => {
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
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    if (selectedDeviceId || videoDevices.length === 0) {
      setupMedia();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDeviceMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleAudio = () => setAudioEnabled(!audioEnabled);
  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const toggleDeviceMenu = () => setShowDeviceMenu(!showDeviceMenu);

  const handleDeviceChange = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setShowDeviceMenu(false);
  };

  const navigateToInterview = () => {
    navigate("/user/attend-interview/" + id);
  };
  return (
    <>
      <UserNavbar />
      <div className="tw-min-h-screen tw-bg-gray-50 tw-py-8">
        <div className="tw-container tw-mx-auto tw-px-4">
          <header className="tw-mb-8 tw-text-center">
            <h1 className="tw-text-2xl tw-font-semibold tw-text-gray-800">
              Attend Interview
            </h1>
          </header>

          <div className="tw-mx-auto tw-max-w-4xl">
            <div className="tw-grid tw-gap-8 md:tw-grid-cols-2">
              <div className="tw-rounded-xl tw-bg-gray-800 tw-p-6">
                <div className="tw-relative tw-aspect-video tw-overflow-hidden tw-rounded-lg tw-bg-gray-900">
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
                    <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
                      <div className="tw-h-24 tw-w-24 tw-rounded-full tw-bg-blue-600 tw-text-center tw-text-4xl tw-font-bold tw-text-white tw-flex tw-items-center tw-justify-center">
                        ...
                      </div>
                    </div>
                  )}
                  <div className="tw-absolute tw-bottom-4 tw-left-1/2 tw-flex -tw-translate-x-1/2 tw-gap-4">
                    <button
                      onClick={toggleAudio}
                      className={`tw-rounded-full tw-p-3 tw-transition ${
                        audioEnabled ? "tw-bg-blue-600" : "tw-bg-red-600"
                      }`}
                    >
                      {audioEnabled ? (
                        <Mic className="tw-h-6 tw-w-6 tw-text-white" />
                      ) : (
                        <MicOff className="tw-h-6 tw-w-6 tw-text-white" />
                      )}
                    </button>
                    <div className="tw-relative" ref={menuRef}>
                      <div className="tw-flex tw-gap-1">
                        <button
                          onClick={toggleVideo}
                          className={`tw-rounded-full tw-p-3 tw-transition ${
                            videoEnabled ? "tw-bg-blue-600" : "tw-bg-red-600"
                          }`}
                        >
                          {videoEnabled ? (
                            <Video className="tw-h-6 tw-w-6 tw-text-white" />
                          ) : (
                            <VideoOff className="tw-h-6 tw-w-6 tw-text-white" />
                          )}
                        </button>
                        {/* <button
                          onClick={toggleDeviceMenu}
                          className={`tw-rounded-r-full tw-border-l tw-border-l-gray-700 tw-p-3 tw-transition ${
                            videoEnabled ? "tw-bg-blue-600" : "tw-bg-red-600"
                          }`}
                        >
                          <ChevronDown className="tw-h-6 tw-w-6 tw-text-white" />
                        </button> */}
                      </div>

                      {showDeviceMenu && (
                        <div className="tw-absolute tw-bottom-full tw-mb-2 tw-w-44 tw-h-40 tw-overflow-auto tw-rounded-lg tw-bg-white tw-shadow-lg tw-text-sm">
                          <div className="tw-p-2">
                            <div className="tw-mb-2 tw-px-3 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-500">
                              Select Camera
                            </div>
                            {videoDevices.map((device) => (
                              <button
                                key={device.deviceId}
                                onClick={() =>
                                  handleDeviceChange(device.deviceId)
                                }
                                className="tw-flex tw-w-full tw-items-center tw-gap-3 tw-rounded-lg tw-px-3 tw-py-2 tw-text-left tw-text-sm tw-text-gray-700 hover:tw-bg-gray-100"
                              >
                                <Video className="tw-h-4 tw-w-4" />
                                <span className="tw-flex-1">
                                  {device.label ||
                                    `Camera ${
                                      videoDevices.indexOf(device) + 1
                                    }`}
                                </span>
                                {selectedDeviceId === device.deviceId && (
                                  <div className="tw-h-2 tw-w-2 tw-rounded-full tw-bg-blue-600"></div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="tw-flex tw-flex-col tw-justify-center">
                <h2 className="tw-mb-4 tw-text-3xl tw-font-bold tw-text-gray-800">
                  Ready to Join?
                </h2>
                <p className="tw-mb-8 tw-text-gray-600">
                  Your interview is starting soon! Find a quiet place, check
                  your audio and video, and have your documents ready. Click
                  join and enter with confidence!
                </p>

                <div className="tw-mb-8 tw-flex tw-gap-6">
                  <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                    <Clock className="tw-h-5 tw-w-5" />
                    <span>40mins</span>
                  </div>
                  <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
                    <ListChecks className="tw-h-5 tw-w-5" />
                    <span>22 Questions</span>
                  </div>
                </div>

                <button
                  onClick={navigateToInterview}
                  className="tw-rounded-lg tw-bg-blue-600 tw-px-8 tw-py-3 tw-text-white tw-transition hover:tw-bg-blue-700"
                >
                  Start Now
                </button>

                <p className="tw-mt-4 tw-text-sm tw-text-gray-500 tw-italic">
                  "Keep your mic and video ON for verification and better
                  communication."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
