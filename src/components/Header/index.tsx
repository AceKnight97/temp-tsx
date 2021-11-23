import { PageHeader } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { useMergeState } from "../../helpers/customHooks";
import "./_header.css";

const Header: React.FC<{
  title?: string | "";
  isBack?: boolean | false;
  children?: Node | undefined;
}> = ({ title, isBack, children }) => {
  const history = useHistory();
  const [state, setState] = useMergeState({});
  // console.log({ history });
  return (
    <div className="header">
      <PageHeader onBack={isBack ? history.goBack : undefined} title={title} />

      <div className="header-right">{children}</div>
    </div>
  );
};

export default Header;
