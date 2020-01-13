import React from "react";
import ReactDOM from "react-dom";
import RootRoutes from "./components/Routes";

class App extends React.Component {
  render() {
    return <Componente></Componente>;
  }
}

class Componente extends React.Component {
  render() {
    return <RootRoutes />;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
