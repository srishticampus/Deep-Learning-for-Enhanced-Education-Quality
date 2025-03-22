import { useParams } from "react-router-dom";
import { ChevronLeft, CircleCheck } from "lucide-react";
import { Footer } from "../../landing/footer";
import { UserNavbar } from "../navbar/userNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";

export const InterviewScore = () => {
  const [application, setApplication] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getMyApplications(id);
    }
  }, [id]);

  const BackBtn=()=>{
    navigate('/user/application-status')
    window.location.reload()
  }
  const getMyApplications = async (id) => {
    try {
      const res = await axiosInstance.get(`application/${id}/`);
      if (res.status === 200) {
        setApplication(res.data);
      }
    } catch (error) {
      console.log("ERROR ON GET MY APPLICATIONS", error);
    }
  };

  const getFeedback = (score) => {
    if (score <= 5) return "Very poor performance. You need clarity on fundamental topics.Your understanding of basic concepts is significantly weak. You struggled with answering most of the questions, and your explanations lacked depth and accuracy. This indicates a major gap in foundational knowledge, which needs to be addressed before progressing further.";
    if (score <= 10) return "Poor performance. Work on understanding core concepts better.You have a basic idea about some topics but lack clarity in essential concepts. You may have attempted some questions but struggled with explaining them clearly or applying them correctly. Your answers indicate gaps in your knowledge that need improvement.";
    if (score <=15) return "Not well, but acceptable. Some clarity is needed in explanations.Your performance is slightly below average. You seem to have a general understanding of some topics but struggle to articulate your thoughts clearly. Some of your answers were incomplete or lacked depth, indicating that more clarity is needed in certain areas.";
    if (score <= 20) return "Okay, but you need more practice to improve.You are on the right track, but there are still noticeable gaps in your understanding. Your performance was fair, and you showed some level of competency, but you need more hands-on practice to strengthen your skills.";
    if (score <= 25) return "Good job! Your performance is decent, but minor clarity issues remain.You performed well, and your understanding of key concepts is solid. However, some minor gaps in knowledge or slight inconsistencies in explanations were observed. You are doing well, but refining certain areas will help you achieve a higher level of expertise..";
    if (score <= 30) return "Very good performance! Awesome effort, just a little fine-tuning needed. You did a great job! Your knowledge is strong, and your answers were mostly accurate and well-structured. There were only minor areas where improvement could make your responses even better. A little more refinement, and you will be at an excellent level!";
    return "Excellent performance! Keep up the great work!. You nailed it! Your understanding of concepts, problem-solving approach, and communication skills were exceptional. You demonstrated confidence, accuracy, and depth in your answers, making you a strong candidate. ";
  };

  useEffect(()=>{
    console.log('window.myMediaStream', window.myMediaStream)

    if (window.myMediaStream) {
      console.log('window.myMediaStream', window.myMediaStream)
      window.myMediaStream.getTracks().forEach((track) => track.stop());
    }
  })
  return (
    <div>
      <UserNavbar />

      <div className="tw-min-h-96 tw-flex tw-items-center tw-justify-center">
        <div className="tw-text-center">
          <div className="tw-flex tw-justify-center tw-text-green-500">
            <CircleCheck size={80} />
          </div>
          <h1 className="tw-text-5xl tw-font-bold">
            Score {application?.score || 0}
          </h1>
          <h3 className="tw-mt-4">Interview Successfully Completed!</h3>
          <p className='tw-mt-3'>
            Thank you for your time, we will let you know the status as soon as possible.
          </p>

          {/* Feedback Section */}
          <div className="card m-5">
          <div className="tw-mt-4 tw-text-lg tw-font-semibold tw-text-gray-700 m-5">
            <h2 style={{fontSize:"30px"}}>Feedback</h2>
            <h5 style={{marginTop:"15px"}}>{getFeedback(application?.score || 0)}</h5>

          </div>
          <div className="tw-flex tw-justify-center tw-m-5">
            <button
              className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-full tw-flex tw-items-center tw-gap-2"
              onClick={() => BackBtn()}
            >
              <ChevronLeft className="tw-w-4 tw-h-4" />
              Back 
            </button>
          </div></div>

          
        </div>
      </div>

      <Footer />
    </div>
  );
};
