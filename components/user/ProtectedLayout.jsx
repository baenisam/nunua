import React, { useContext } from "react";
import { UserContext } from "~/context/UserContext";
import { useRouter } from "next/router";
const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);
  if (!userInfo?.token){
    router.push("/");
  } else {
    return children;
  }
  
};

export default ProtectedLayout;
