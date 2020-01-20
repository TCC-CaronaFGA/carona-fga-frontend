import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../scenes/Login";
import Home from "../../scenes/Home";
import RideForm from "../../scenes/RideForm";
import RideList from "../../scenes/RideList";

//Data Imports

class Routes extends Component {
  MenuItems = [
    { path: "/login", component: props => <Login {...props} /> },
    { path: "/create-ride", component: props => <RideForm {...props} /> },
    { path: "/search-ride", component: props => <RideList {...props} /> }
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
