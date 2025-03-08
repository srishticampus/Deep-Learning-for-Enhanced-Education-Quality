import { ChevronLeft,  CircleCheck } from "lucide-react";
import { Footer } from "../../landing/footer";
import { UserNavbar } from "../navbar/userNavbar";
import { useParams } from "react-router-dom";
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
  const getMyApplications = async (id) => {
    try {
      const res = await axiosInstance.get(`application/${id}/`);
      if (res.status === 200) {
        const data = res.data;
        setApplication(data);
      }
    } catch (error) {
      console.log("ERROR ON GET MY APPLICATIONS", error);
    }
  };
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
            Thank you for your time, We will let you know the status as soon as possible. 
          </p>

          <div className="tw-flex tw-justify-center tw-mt-5 ">
            <button
              className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-full tw-flex tw-items-center tw-gap-2"
              onClick={() => {
                navigate('/user/application-status');
              }}
            >
              <ChevronLeft className="tw-w-4 tw-h-4" />
              Back 
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
