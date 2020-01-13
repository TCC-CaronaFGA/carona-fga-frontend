import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../scenes/Login";
import Home from "../../scenes/Home";

//Data Imports

class Routes extends Component {
  MenuItems = [
    { path: "/login", component: props => <Login {...props} /> },
    { path: "/login2", component: props => <Login {...props} /> }
  ];
  render() {
    return (
      <>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          {this.MenuItems.map((route, i) => {
            return (
              <Route
                key={i}
                path={route.path}
                render={props => route.component({ ...props })}
              />
            );
          })}
        </Switch>
      </>
    );
  }
}

export default Routes;
