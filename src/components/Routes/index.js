import React from "react";
import { Switch, Router } from "react-router-dom";

import { createBrowserHistory } from "history";
import Routes from "./routes";
import LayoutApp from "../../shared/LayoutApp";

let PUBLIC_URL = "";
let basename = "";

if (process.env.PUBLIC_URL) {
  PUBLIC_URL = `${process.env.PUBLIC_URL}`;
  basename = PUBLIC_URL.split("/").pop();
}

export const history = createBrowserHistory({ basename: basename });

const RootRoutes = () => {
  return (
    <Router history={history}>
      <LayoutApp>
        <Switch>
          <Routes />
        </Switch>
      </LayoutApp>
    </Router>
  );
};

export default RootRoutes;
