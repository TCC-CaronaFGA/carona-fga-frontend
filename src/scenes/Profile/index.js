import React, { Component } from "react";
import { Spin, Col } from "antd";
import { connect } from "react-redux";
import CarForm from "../CarForm";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, redirect: false, cars: [] };
  }

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
              <ul>
                {this.state.cars.map(item => (
                  <li key={item.idCar}>{item.model}</li>
                ))}
              </ul>
            </Col>
            <Col>
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
    user: state.user,
    cars: state.cars
  };
};

export default connect(mapStateToProps, {})(Profile);
