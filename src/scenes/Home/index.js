import React, { Component } from "react";
import "./styles.scss";
import { Spin } from "antd";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="App">
        {(this.props.user == null) ? (
          <div className="spin">
            <Spin tip="Carregando..." />
          </div>
        ) : (
          <p>"Bem vindo {this.props.user.name}"</p>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps,{})(Home);
