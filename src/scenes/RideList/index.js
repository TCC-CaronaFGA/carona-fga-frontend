import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  List,
  Icon,
  Modal,
  Button,
  InputNumber,
  notification,
  Select,
} from "antd";
import "./styles.scss";
import Search from "antd/lib/input/Search";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import Axios from "axios";
import { rideRoute } from "../../constants/apiRoutes";
import { connect } from "react-redux";
import { solicitRide } from "../../shared/LayoutApp/_/actions";
import moment from "moment";
import "moment/locale/pt-br";

class RideList extends Component {
  constructor(props) {
    super(props);
    setupInterceptors();
    const rides = [];
    this.state = {
      rides,
      filteredRides: rides,
      isFiltered: false,
    };
  }

  componentDidMount() {
    Axios.get(rideRoute).then((response) => {
      if (response.status === 200) {
        this.setState({
          rides: response.data.data,
          filteredRides: response.data.data,
        });
      }
    });
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  requestRide() {
    // console.log(this.props);
  }

  LOCATIONS = [
    "Ceilândia",
    "Samambaia",
    "Taguatinga",
    "Plano Piloto",
    "Planaltina",
    "Águas Claras",
    "Recanto das Emas",
    "Gama",
    "Guará",
    "Santa Maria",
    "Sobradinho II",
    "São Sebastião",
    "Vicente Pires",
    "Itapoã",
    "Sobradinho",
    "Sudoeste/Octogonal",
    "Brazlândia",
    "Riacho Fundo II",
    "Paranoá",
    "Riacho Fundo",
    "SCIA",
    "Lago Norte",
    "Cruzeiro",
    "Lago Sul",
    "Jardim Botânico",
    "Núcleo Bandeirante",
    "Park Way",
    "Candangolândia",
    "Varjão",
    "Fercal",
    "SIA",
  ];

  filterList = (event) => {
    const value = event.target.value;
    const rides = this.state.rides;
    if (value.length >= 1) {
      let filteredRides = rides.filter((ride) => {
        return ride.location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredRides, isFiltered: true });
    } else {
      this.setState({
        filteredRides: rides,
        isFiltered: false,
      });
    }
  };

  handleSubmit = (e, rideId) => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.solicitRide(
          values,
          rideId,
          this.solicitRideCallback.bind(this)
        );
        // console.log(
        //   "Valores recebidos do formulário da solicitaçao da carona: ",
        //   values
        // );
        // const requisicao = {
        //   dtRide: values.dtRide,
        //   origin: values.origin,
        //   location: values.location,
        //   requestedSeats: values.requestedSeats,
        // };
        // console.log("Requisição ", requisicao);
      }
    });
  };

  solicitRideCallback = (success) => {
    if (success) {
      this.setState({ redirect: true });
      notification.open({
        message: "Carona solicitada com sucesso!",
        description: "",
        style: {
          width: 600,
          marginLeft: 335 - 600,
        },
      });
    } else
      notification.open({
        message:
          "Erro ao solicitar carona (Você inseriu a quantidade de assentos?)!",
        description: "",
        style: {
          width: 600,
          marginLeft: 335 - 600,
        },
      });
  };

  filterGender = (value) => {
    const rides = this.state.rides;
    // console.log(value);
    let filteredRides = rides.filter((ride) => {
      // console.log(ride.user.gender);
      if (ride.user.gender === value) {
        return true;
      } else {
        return false;
      }
    });
    if (filteredRides.length > 0) {
      this.setState({ filteredRides, isFiltered: true });
    } else {
      this.setState({ filteredRides: [] });
    }
    if (value === undefined) {
      const filteredRides = this.updateState();
      this.setState({ filteredRides, isFiltered: false });
    }
    // console.log(filteredRides);
  };

  updateState() {
    if (this.state.rides) {
      let rides = Object.values(this.state.rides).flat();
      return rides;
    }
  }

  render() {
    const { filteredRides } = this.state;
    console.log(this.state.filteredRides);
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    // console.log(this.state.rides);

    return (
      <>
        <h1>Caronas disponíveis</h1>
        <Form style={{ padding: "0" }}>
          <Row gutter={24} style={{ margin: "0 0 16px 16px" }}>
            <Col lg={6} md={10} sm={12} xs={24}>
              {/* <Form.Item label="Filtre pela região" className="filter-title">
                <Select
                  placeholder="Selecione uma região"
                  className="filter"
                  allowClear={true}
                >
                  {this.LOCATIONS.map((item, i) => {
                    return (
                      <Option value={item} key={i}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item> */}
              <Form.Item>
                <Search
                  className="filter"
                  placeholder="Pesquisar por região"
                  onChange={this.filterList}
                ></Search>
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={12} xs={24}>
              <Form.Item>
                <Select
                  placeholder="Escolher carona apenas com ..."
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.filterGender}
                >
                  <Option key={1} value="F">
                    Mulheres
                  </Option>
                  <Option key={0} value="M">
                    Homens
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {this.state.filteredRides === 0 ? (
          <div className="section">
            <div className="details">
              <h2>
                Para oferecer uma carona é necessário <br />
                adicionar pelo menos um carro em seu perfil
              </h2>
            </div>
          </div>
        ) : (
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
            locale={{ emptyText: "Nenhuma carona encontrada." }}
          >
            {filteredRides.map((item, i) => (
              <List.Item key={i}>
                <Col span={3}>
                  <Icon type="car" />
                </Col>
                <Col span={15}>
                  <List.Item.Meta
                    title={moment(item.dtRide).format(
                      "dddd, DD/MM/YYYY [às] H:mm "
                    )}
                    description={
                      <>
                        <h4>
                          {item.location} - {item.origin}
                        </h4>
                        <h5>{item.user.name}</h5>
                      </>
                    }
                  />
                </Col>
                <Col span={6}>
                  <div className="vagas-disponiveis">
                    <h4>VAGAS</h4>
                    <h3>{item.availableSeats}</h3>
                  </div>
                </Col>
                <Button
                  type="primary"
                  onClick={() => this.setModalVisible(true)}
                >
                  mais detalhes
                </Button>
                <Modal
                  className="modal"
                  title="Informações da carona"
                  centered
                  visible={this.state.modalVisible}
                  okText={
                    item.idUser !== this.props.user.idUser
                      ? "Solicitar carona"
                      : null
                  }
                  cancelText="Cancelar"
                  onOk={() =>
                    item.idUser !== this.props.user.idUser
                      ? (this.handleSubmit(null, item.idRide),
                        this.setModalVisible(false))
                      : this.setModalVisible(false)
                  }
                  onCancel={() => this.setModalVisible(false)}
                >
                  <Form onSubmit={this.handleSubmit}>
                    <h4>Quando?</h4>
                    <h5>
                      {moment(item.dtRide).format(
                        "dddd, DD/MM/YYYY [às] H:mm "
                      )}
                    </h5>
                    <h4>De onde?</h4>
                    <h5>{item.origin}</h5>
                    <h4>Para onde?</h4>
                    <h5>{item.location}</h5>
                    <h4>Com quem?</h4>
                    <h5>
                      {item.user.name} - {item.user.course} - {item.user.phone}
                    </h5>
                    {item.idUser !== this.props.user.idUser && (
                      <>
                        <h4>Assentos solicitados?</h4>
                        <Form.Item>
                          {getFieldDecorator("requestedSeats")(
                            <InputNumber
                              name="requestedSeats"
                              min={1}
                              max={4}
                            />
                          )}
                        </Form.Item>
                      </>
                    )}
                  </Form>
                </Modal>
              </List.Item>
            ))}
          </List>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default Form.create({ name: "solicitRideForm" })(
  connect(mapStateToProps, { solicitRide })(RideList)
);
