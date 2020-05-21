import React, { Component } from "react";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import { connect } from "react-redux";
import { Col, List, Icon, Button, Row } from "antd";
import Axios from "axios";
import { answerSolicitationRoute } from "../../constants/apiRoutes";
import "./styles.scss";
import moment from "moment";
import "moment/locale/pt-br";

class RideList extends Component {
  constructor(props) {
    super(props);
    setupInterceptors();
    this.state = {
      notifications: this.props.user.notifications,
      notificationsAnswer: this.props.user.notificationsAnswer,
    };
  }

  answer = (id, answer) => {
    Axios.post(answerSolicitationRoute(id, answer)).then((resp) => {
      if (resp.status === 200) {
        this.setState({
          notifications: this.state.notifications.filter(
            (notification) => notification.idRequest !== id
          ),
        });
      }
    });
  };

  render() {
    // console.log(this.state);
    return (
      <>
        <div className="card-solicitations">
          <Row>
            <h1>Solicitações recebidas</h1>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              itemLayout="horizontal"
              locale={{ emptyText: "Nenhuma solicitação encontrada." }}
            >
              {this.state.notifications &&
                this.state.notifications.map((item, i) => (
                  <List.Item key={i}>
                    <Col span={3} className="user-avatar">
                      <Icon type="user" />
                    </Col>
                    <Col span={15}>
                      <List.Item.Meta
                        title={moment(item.ride.dtRide).format(
                          "dddd, DD/MM/YYYY [às] H:mm "
                        )}
                        description={
                          <>
                            <h4>
                              {item.ride.location} - {item.ride.origin}
                            </h4>
                            <h4>{item.passenger.name}</h4>
                          </>
                        }
                      />
                    </Col>
                    <Col span={6}>
                      <div className="vagas-disponiveis">
                        <h4>VAGAS</h4>
                        <h3>{item.requestedSeats}</h3>
                      </div>
                    </Col>
                    <Row className="card-btn">
                      <Col span={12}>
                        <Button
                          type="secondary"
                          onClick={() => {
                            this.answer(item.idRequest, 0);
                          }}
                        >
                          Recusar
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button
                          type="primary"
                          onClick={() => {
                            this.answer(item.idRequest, 1);
                          }}
                        >
                          Aceitar
                        </Button>
                      </Col>
                    </Row>
                  </List.Item>
                ))}
            </List>
          </Row>
        </div>
        <div className="card-solicitations">
          <Row>
            <h1>Novas respostas recebidas</h1>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 3,
                xxl: 3,
              }}
              itemLayout="horizontal"
              locale={{ emptyText: "Nenhuma solicitação encontrada." }}
            >
              {this.state.notificationsAnswer &&
                this.state.notificationsAnswer.map((item, i) => (
                  <List.Item key={i}>
                    <Col span={3} className="user-avatar">
                      <Icon type="user" />
                    </Col>
                    <Col span={15}>
                      <List.Item.Meta
                        title={moment(item.request.data.ride.dtRide).format(
                          "dddd, DD/MM/YYYY [às] H:mm "
                        )}
                        description={
                          <>
                            <h4>
                              {item.request.data.ride.location} -{" "}
                              {item.request.data.ride.origin}
                            </h4>
                            <h4>{item.request.data.ride.user.name}</h4>
                          </>
                        }
                      />
                    </Col>
                    <Col span={6}>
                      <div className="vagas-disponiveis">
                        <h4>VAGAS SOLICITADAS</h4>
                        <h3>{item.requestedSeats}</h3>
                      </div>
                    </Col>
                    <Col span={24}>
                      <h3>
                        {item.answer === "A"
                          ? "Solicitação aceita!!"
                          : "Solicitação Recusada"}
                      </h3>
                    </Col>
                  </List.Item>
                ))}
            </List>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(RideList);
