import { useEffect, useState } from "react";
import { LEXI_USER_DATA } from "../constants/constants";

export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(LEXI_USER_DATA)) || false;
    setUserData(userData);
  }, []);

  return userData;
};
