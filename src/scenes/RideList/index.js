import React, { Component } from "react";
import { Form, Row, Col, List, Icon, Modal, Button } from "antd";
import "./styles.scss";
import Search from "antd/lib/input/Search";

class RideList extends Component {
  constructor(props) {
    super(props);
    const rides = [
      {
        dtRide: "8:20",
        location: "Taguatinga",
        origin: "Pistão Sul",
        destiny: "Universidade de Brasília - Gama",
        availableSeats: 1,
        notes: null,
        idCar: 1,
        idUser: 1,
        course: "Engenharia de software"
      },
      {
        dtRide: "8:20",
        location: "Ceilândia",
        origin: "Rua 1",
        destiny: "Universidade de Brasília - Gama",
        availableSeats: 2,
        notes: null,
        idCar: 2,
        idUser: 2,
        course: "Engenharia de energia"
      },
      {
        dtRide: "8:20",
        location: "Águas CLaras",
        origin: "Rua 2",
        destiny: "Universidade de Brasília - Gama",
        availableSeats: 3,
        notes: null,
        idCar: 3,
        idUser: 3,
        course: "Engenharia eletrônica"
      },
      {
        dtRide: "8:20",
        location: "Taguatinga",
        origin: "Pistão Norte",
        destiny: "Universidade de Brasília - Gama",
        availableSeats: 4,
        notes: null,
        idCar: 4,
        idUser: 4,
        course: "Engenharia automotiva"
      },
      {
        dtRide: "8:20",
        location: "Asa Sul",
        origin: "SQS 311",
        destiny: "Universidade de Brasília - Gama",
        availableSeats: 1,
        notes: null,
        idCar: 5,
        idUser: 5,
        course: "Engenharia aeroespacial"
      },
      {
        dtRide: "8:20",
        location: "Asa norte",
        origin: "SQN 311",
        destiny: "Universidade de Brasília - Gama",
        availableSeats: 2,
        notes: null,
        idCar: 6,
        idUser: 6,
        course: "Engenharia de software"
      }
    ];
    this.state = {
      rides,
      filteredRides: rides,
      isFiltered: false
    };
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
                      <h5>{item.idUser} (userID)</h5>
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
