import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../scenes/Login";
import Home from "../../scenes/Home";
import RideForm from "../../scenes/RideForm";
import RideList from "../../scenes/RideList";
import Logout from "../../scenes/Logout";
import Register from "../../scenes/Register";
import CarForm from "../../scenes/CarForm";
import Profile from "../../scenes/Profile";
import Ranking from "../../scenes/Ranking";

//Data Imports

class Routes extends Component {
  MenuItems = [
    { path: "/login", component: props => <Login {...props} /> },
    { path: "/logout", component: props => <Logout {...props} /> },
    { path: "/create-ride", component: props => <RideForm {...props} /> },
    { path: "/create-car", component: props => <CarForm {...props} /> },
    { path: "/search-ride", component: props => <RideList {...props} /> },
    { path: "/register", component: props => <Register {...props} /> },
    { path: "/profile", component: props => <Profile {...props} /> },
    { path: "/ranking", component: props => <Ranking {...props} /> }
  ];
  render() {
    return (
      <>
        <Switch>
          <Route
            exact={true}
            path="/"
            component={props => <Home {...props} />}
          />
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
