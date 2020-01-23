import React, { Component } from "react";
import "./styles.scss";
import { Spin } from "antd";

class Home extends Component {
  render() {
    const { Consumer } = this.props;
    return (
      <Consumer>
        {value =>
          <div className="App">
            {(value.auth.user == null) ? (
              <div className="spin">
                <Spin tip="Carregando..." />
              </div>
            ) : (
              <p>"Bem vindo {value.auth.user.name}"</p>
              )}
          </div>
        }
      </Consumer>
    );
  }
}

export default Home;
