import React, { Component } from "react";
import { Spin, Col, Row, Icon, notification } from "antd";
import { connect } from "react-redux";
import "./styles.scss";
import Axios from "axios";
import { userRidesRoute } from "../../constants/apiRoutes";

class Evaluation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirect: false,
      rides: [],
      passenger: [],
    };
  }

  componentDidMount() {
    Axios.get(userRidesRoute)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ rides: response.data.data });
        }
      })
      .catch(() => {
        notification.open({ message: "Falha ao recuperar lista de caronas" });
      });
  }

  render() {
    console.log(this.state.rides);
    return (
      <div className="App">
        {this.props.user == null ? (
          <div className="spin">
            <Spin tip="Carregando..." />
          </div>
        ) : (
          <>
            <h1>Minhas caronas</h1>
            <Col span={8}>
              <Row>
                {this.props.user.userType === "D" && (
                  <div className="profile-details minhas-caronas">
                    <ul>
                      {this.state.rides &&
                        this.state.rides.map((item) => (
                          <li key={item.idRide}>
                            <h4>{item.dtRide}</h4>
                            <h4>De: {item.origin}</h4>
                            <h4>Para: {item.destiny}</h4>
                            <h4>
                              Passageiros:
                              {item.passenger &&
                                item.passenger.map((passenger) => (
                                  <li
                                    className="passenger"
                                    key={passenger.idUser}
                                  >
                                    <h4>
                                      <Icon type="user" /> {passenger.name}
                                    </h4>
                                    <h4>{passenger.course}</h4>
                                    <h4>{passenger.phone}</h4>
                                  </li>
                                ))}
                            </h4>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </Row>
            </Col>
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

export default connect(mapStateToProps, {})(Evaluation);
