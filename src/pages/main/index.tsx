import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMergeState } from "../../helpers/customHooks";
import SignIn from "../auth/signIn";
import Full from "../full";
import "./_main.css";
import PrivateRoute from "../privateRoute/index";

const Main: React.FC<{}> = () => {
  const [state, setState] = useMergeState({});
  const {} = state;
  const authenticated = true;
  return (
    <div className="main">
      <Router>
        <Switch>
          <Route exact path="/login" component={SignIn} />
          <PrivateRoute
            path="/"
            Component={Full}
            authenticated={authenticated}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default Main;
