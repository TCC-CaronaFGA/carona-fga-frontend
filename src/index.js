import React from "react";
import ReactDOM from "react-dom";
import Inicio from "./scenes/Inicio";
import Login from "./scenes/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return <Componente></Componente>;
  }
}

class Componente extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Inicio} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
