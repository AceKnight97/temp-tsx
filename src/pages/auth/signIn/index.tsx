import React from "react";
import { useMergeState } from "../../../helpers/customHooks";
import "./_sign-in.css";

const SignIn: React.FC = () => {
  const [state, setState] = useMergeState({
    current: "SIGN_IN",
  });
  const { current } = state;
  return <div className="sign-in">login</div>;
};

export default SignIn;
