import React, { Component } from "react";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import { connect } from "react-redux";
import { Col, List, Icon, Button } from "antd";
import Axios from "axios";
import { answerSolicitationRoute } from "../../constants/apiRoutes";

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
        <div>
          <h1>Solicações recebidas</h1>
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
                  <Col span={3}>
                    <Icon type="user" />
                  </Col>
                  <Col span={15}>
                    <List.Item.Meta
                      title={item.ride.dtRide}
                      description={
                        <>
                          <h4>
                            {item.ride.location} - {item.ride.origin}
                          </h4>
                          <h5>{item.passenger.name}</h5>
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
                  <Button
                    type="primary"
                    onClick={() => {
                      this.answer(item.idRequest, 1);
                    }}
                  >
                    Aceitar
                  </Button>
                  <Button
                    type="secondary"
                    onClick={() => {
                      this.answer(item.idRequest, 0);
                    }}
                  >
                    Recusar
                  </Button>
                </List.Item>
              ))}
          </List>
        </div>
        <div>
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
                  <Col span={3}>
                    <Icon type="user" />
                  </Col>
                  <Col span={15}>
                    <List.Item.Meta
                      title={item.request.data.ride.dtRide}
                      description={
                        <>
                          <h4>
                            {item.request.data.ride.location} -{" "}
                            {item.request.data.ride.origin}
                          </h4>
                          <h5>{item.request.data.ride.user.name}</h5>
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
                    {item.answer === "A"
                      ? "Solicitação aceita!!"
                      : "Solicitação Recusada"}
                  </Col>
                </List.Item>
              ))}
          </List>
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
