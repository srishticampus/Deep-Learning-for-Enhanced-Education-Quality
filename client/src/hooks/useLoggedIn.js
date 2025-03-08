import { useEffect, useState } from "react";
import { IS_LEXI_USER_LOGGED_IN } from "../constants/constants";

export const useUserLoggedin = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    const loginStatus = localStorage.getItem(IS_LEXI_USER_LOGGED_IN) || false;
    setIsUserLoggedIn(loginStatus);
  }, []);

  return isUserLoggedIn;
};
