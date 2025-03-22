import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/ai_bot_api/",
  // baseURL: "https://python.sicsglobal.com/ai_powered_interview_bot/api/ai_bot_api/",
});

export const BACKEND_URL = "http://127.0.0.1:8000"
// export const BACKEND_URL = "https://python.sicsglobal.com/ai_powered_interview_bot/"

// https://python.sicsglobal.com/ai_powered_interview_bot/media/profile_images/social-integration-working-team_1.png