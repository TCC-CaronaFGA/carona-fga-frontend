import React, { Component } from "react";
import { Form, Row, Col, List, Icon, Modal, Button } from "antd";
import "./styles.scss";
import Search from "antd/lib/input/Search";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import Axios from "axios";
import { rideRoute } from "../../constants/apiRoutes";

class RideList extends Component {
  constructor(props) {
    super(props);
    setupInterceptors();
    const rides = [];
    this.state = {
      rides,
      filteredRides: rides,
      isFiltered: false
    };
  }

  componentDidMount() {
    Axios.get(rideRoute).then(response => {
      if (response.status === 200) {
        console.log("porran");
        this.setState({
          rides: response.data.data,
          filteredRides: response.data.data
        });
      }
    });
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
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
    "SIA"
  ];

  filterList = event => {
    const value = event.target.value;
    const rides = this.state.rides;
    if (value.length >= 1) {
      let filteredRides = rides.filter(ride => {
        return ride.location.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
      this.setState({ filteredRides, isFiltered: true });
    } else {
      this.setState({
        filteredRides: rides,
        isFiltered: false
      });
    }
  };

  render() {
    // const { Option } = Select;
    console.log(this.state.rides);
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
          </Row>
        </Form>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          itemLayout="horizontal"
          locale={{ emptyText: "Nenhuma carona encontrada." }}
        >
          {this.state.filteredRides.map(item => (
            <List.Item>
              <Col span={3}>
                <Icon type="car" />
              </Col>
              <Col span={15}>
                <List.Item.Meta
                  title={item.dtRide}
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
              <Button type="primary" onClick={() => this.setModalVisible(true)}>
                mais detalhes
              </Button>
              <Modal
                className="modal"
                title="Informações da carona"
                centered
                visible={this.state.modalVisible}
                okText="Solicitar carona"
                cancelText="Fechar"
                onOk={() => this.setModalVisible(false)}
                onCancel={() => this.setModalVisible(false)}
              >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
              </Modal>
            </List.Item>
          ))}
        </List>
      </>
    );
  }
}

export default RideList;
