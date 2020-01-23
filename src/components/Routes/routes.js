import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../scenes/Login";
import Home from "../../scenes/Home";
import RideForm from "../../scenes/RideForm";
import RideList from "../../scenes/RideList";
import LayoutApp from "../../shared/LayoutApp";

//Data Imports

class Routes extends Component {
  MenuItems = [
    { path: "/login", component: props => <Login {...props} /> },
    { path: "/create-ride", component: props => <LayoutApp{...props} ><RideForm Consumer = {this.props.Consumer} /></LayoutApp> },
    { path: "/search-ride", component: props => <LayoutApp{...props} ><RideList Consumer = {this.props.Consumer}/></LayoutApp> }
  ];
  render() {
    return (
      <>
        <Switch>
          <Route exact={true} path="/" component={props => <LayoutApp{...props} ><Home Consumer = {this.props.Consumer}/></LayoutApp>} />
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
