import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export const ProtectedLayout = ({ children }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Protected", auth.user);
    if (auth.user === undefined || auth.user === null) {
      // console.log(auth.user);
      navigate("/");
    }
  }, [auth.token]);

  return children;
};
