import React from "react";
import { useMergeState } from "../../helpers/customHooks";
import { Layout, Space, Spin } from "antd";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import SideBar from "../../components/sideBar";
import Applications from "../applications";
import "./_full.css";
import Test from "../test";
// import supergraphic from "../../assets/bosch/supergraphic.svg";

const SIDE_BAR_MENU = [
  {
    name: "Applications",
    link: "/applications",
  },
  {
    name: "Test",
    link: "/test",
  },
];
const Full: React.FC = () => {
  const [state, setState] = useMergeState({
    current: "SIGN_IN",
  });
  const { current } = state;
  return (
    <>
      <div className="supergraphic-line"></div>
      {/* <img src={supergraphic} alt="Bosch supergraphic" /> */}
      <Layout className="full">
        <Layout.Sider>
          <SideBar menu={SIDE_BAR_MENU} />
        </Layout.Sider>
        <Layout>
          <Layout.Content className="full-lay-content">
            <Switch>
              <Route path="/applications" component={Applications} />
              <Route path="/test" component={Test} />
              <Redirect from="/" to="/applications" />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Full;
