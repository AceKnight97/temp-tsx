import { Layout } from "antd";
import React from "react";
import Header from "../../components/Header";
import { useMergeState } from "../../helpers/customHooks";
// import "./_Test.css";

const Test: React.FC = () => {
  const [state, setState] = useMergeState({
    current: "SIGN_IN",
  });
  const { current } = state;
  return (
    <div className="test">
      <Layout.Header>
        <Header title="Test" />
      </Layout.Header>
    </div>
  );
};

export default Test;
