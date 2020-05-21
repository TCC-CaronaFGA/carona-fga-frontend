import React, { Component } from "react";
import { Spin, Col, Row, Icon, notification } from "antd";
import { connect } from "react-redux";
import CarForm from "../CarForm";
import "./styles.scss";
import Axios from "axios";
import { carRoute } from "../../constants/apiRoutes";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, redirect: false, cars: [] };
  }

  componentDidMount() {
    Axios.get(carRoute)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ cars: response.data.data });
        }
      })
      .catch(() => {
        notification.open({ message: "Falha ao recuperar lista de carros" });
      });
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
            <Row>
              <h1>Bem vindo(a), {this.props.user.name}</h1>
              <Col span={8}>
                <Row>
                  <div className="profile-details info">
                    <h2>
                      Informações pessoais <Icon type="user" />
                    </h2>
                    <h3>{this.props.user.course}</h3>
                    <h3>{this.props.user.phone}</h3>
                    <h3>{this.props.user.email}</h3>
                    <h3>
                      {this.props.user.userType === "D"
                        ? "Motorista"
                        : "Passageiro"}
                    </h3>
                  </div>
                </Row>
                <Row>
                  <div className="profile-details car-detail">
                    <h2>
                      Meu carro <Icon type="car" />
                    </h2>
                    <ul>
                      {this.state.cars.map((item) => (
                        <li key={item.idCar}>{item.model}</li>
                      )) == 0 && <h3>Nenhum carro cadastrado.</h3>}
                    </ul>
                  </div>
                </Row>
              </Col>
              <Col>
                <CarForm />
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cars: state.cars,
  };
};

export default connect(mapStateToProps, {})(Profile);
