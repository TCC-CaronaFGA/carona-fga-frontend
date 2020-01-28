import React, { Component } from "react";
import "./styles.scss";
import { Spin } from "antd";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="App">
        {this.props.user == null ? (
          <div className="spin">
            <Spin tip="Carregando..." />
          </div>
        ) : (
          <h1>Bem vindo(a), {this.props.user.name}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {})(Home);
