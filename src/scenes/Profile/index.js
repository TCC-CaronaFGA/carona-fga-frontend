import React, { Component } from "react";
import { Spin, Col, Row, Icon, notification, Button } from "antd";
import { connect } from "react-redux";
import CarForm from "../CarForm";
import "./styles.scss";
import Axios from "axios";
import { carRoute } from "../../constants/apiRoutes";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false,
      cars: [],
      showCarForm: false,
    };
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

  showCarForm = () => {
    return <CarForm />;
  };

  render() {
    return (
      <div className="App">
        {this.props.user == null ? (
          <div className="spin">
            <Spin tip="Carregando..." />
          </div>
        ) : (
          <>
            <h1>Bem vindo(a), {this.props.user.name} :)</h1>
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
                <div className="profile-details">
                  <h2>
                    Caronas oferecidas <Icon type="star" />
                  </h2>
                  <h3>{this.props.user.points} caronas</h3>
                </div>
              </Row>
            </Col>
            <Col span={8}>
              <div className="profile-details car-detail">
                <h2>
                  Meu carro <Icon type="car" />
                </h2>
                <ul>
                  {this.state.cars.map((item) => (
                    <li key={item.idCar}>
                      <h4>
                        {item.model} - {item.color} - {item.plate}
                      </h4>
                    </li>
                  ))}
                  {this.state.cars === 0 && (
                    <h5>
                      Adicione um carro ao seu perfil para oferecer caronas.
                    </h5>
                  )}
                </ul>
                <Button
                  onClick={() => this.setState({ showCarForm: true })}
                  type="primary"
                  className="btn-form"
                >
                  {" "}
                  Adicionar carro
                </Button>
              </div>
            </Col>
            {this.state.showCarForm ? this.showCarForm() : null}
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
