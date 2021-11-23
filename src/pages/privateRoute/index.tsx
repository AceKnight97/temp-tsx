import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute: React.FC<{
  Component?: any | undefined;
  path: string;
  authenticated?: boolean | false;
}> = ({ Component, path, authenticated }) => (
  <Route
    path={path}
    render={(props: any) =>
      authenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default PrivateRoute;
