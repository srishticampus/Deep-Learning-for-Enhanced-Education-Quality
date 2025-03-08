import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound/notFound";
import Landing from "./pages/landing/landing";
import { Signup } from "./pages/user/signup/signup";
import { SignIn } from "./pages/user/signin/signin";
import { Contact } from "./pages/user/contact/contact";
import { About } from "./pages/user/about/about";
import { Jobs } from "./pages/user/jobs/jobs";
import "./App.css";
import { ForgetPassword } from "./pages/user/forgetPassword/forgetPassword";
import { AdminSignIn } from "./pages/admin/signin/signin";
import { AdminDashboard } from "./pages/admin/dashboard/adminDashboard";
import {
  ProtectAdminRoutes,
  ProtectUserRoutes,
} from "./pages/admin/protectRoute";
import { UserHome } from "./pages/user/home/userHome";
import { UserProfile } from "./components/user/profile/userProfile";
import { ScheduleInterview } from "./components/ui/scheduleInterview/scheduleInterview";
import { ApplicationStatus } from "./pages/user/applicationStatus/applicationStatus";
import { InterviewPreview } from "./components/user/interview/interviewPreview";
import { AttendInterview } from "./components/user/interview/attendInterview";
import { InterviewScore } from "./components/user/interview/interviewScore";

function App() {
  return (
    <BrowserRouter basename="/lexsi">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/forget-password" element={<ForgetPassword />} />
        <Route path="/user/about" element={<About />} />
        <Route element={<ProtectUserRoutes />}>
          <Route path="/user/home" element={<UserHome />} />
          <Route
            path="/user/application-status"
            element={<ApplicationStatus />}
          />
        </Route>
        <Route path="/user/jobs" element={<Jobs />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/contact" element={<Contact />} />
        <Route path="/user/interview-preview/:id" element={<InterviewPreview />} />
        <Route path="/user/attend-interview/:id" element={<AttendInterview />} />
        <Route path="/user/interview-score/:id" element={<InterviewScore />} />

        {/* admin  */}
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route element={<ProtectAdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* this route should be last */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
