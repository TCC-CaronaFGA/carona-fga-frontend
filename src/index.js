import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return <Componente></Componente>;
  }
}

class Componente extends React.Component {
  render() {
    return <div>fga-rideshare</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
