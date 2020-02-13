import React, { Component } from "react";
import { Spin, Button, Col } from "antd";
import { connect } from "react-redux";
import CarForm from "../CarForm";

class Profile extends Component {
  render() {
    return (
      <div className="App">
        {this.props.user == null ? (
          <div className="spin">
            <Spin tip="Carregando..." />
          </div>
        ) : (
          <>
            <h1>Bem vindo(a), {this.props.user.name}</h1>
            <Col span={4}>
              <Button type="primary" className="btn-form">
                ADICIONAR CARRO
              </Button>
            </Col>
            <Col span={20}>
              <CarForm />
            </Col>
          </>
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

export default connect(mapStateToProps, {})(Profile);
