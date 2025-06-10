import { useAuth0 } from "@auth0/auth0-react";
import { useCreateUser } from "../api/MyUserApiRoute";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallBack = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateUser();

  //useRef" istemaal karke input focus kiya, taake be-zaar re-renders se bacha ja sake
  const hasCreateUser = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    //USER create nh ha to jb
    if (user?.sub && user?.email && !hasCreateUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreateUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading....</>;
};
