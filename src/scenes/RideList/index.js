import React, { Component } from "react";
import { Form, Row, Col, List, Icon } from "antd";
import "./styles.scss";

class RideList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caronas: [
        {
          horario: "8:20",
          regiao: "Taguatinga",
          origem: "Pistão Sul",
          destino: "Universidade de Brasília - Gama",
          nomeMotirista: "Gabriel",
          curso: "Engenharia de software",
          assentosDisponiveis: 1
        },
        {
          horario: "9:20",
          regiao: "Águas Claras",
          origem: "Águas Claras",
          destino: "Universidade de Brasília - Gama",
          nomeMotirista: "Gabriel",
          curso: "Engenharia de software",
          assentosDisponiveis: 2
        },
        {
          horario: "9:20",
          regiao: "Taguatinga",
          origem: "CNB2",
          destino: "Universidade de Brasília - Gama",
          nomeMotirista: "Gabriel",
          curso: "Engenharia de software",
          assentosDisponiveis: 3
        },
        {
          horario: "9:20",
          regiao: "Ceilândia",
          origem: "Universidade de Brasília - Gama",
          destino: "Ceilândia",
          nomeMotirista: "Gabriel",
          curso: "Engenharia de software",
          assentosDisponiveis: 4
        },
        {
          horario: "9:20",
          regiao: "Taguatinga",
          origem: "Tagua",
          destino: "Universidade de Brasília - Gama",
          nomeMotirista: "Gabriel",
          curso: "Engenharia de software",
          assentosDisponiveis: 1
        },
        {
          horario: "9:20",
          regiao: "Ceilândia",
          origem: "Universidade de Brasília - Gama",
          destino: "Ceilândia",
          nomeMotirista: "Gabriel",
          curso: "Engenharia de software",
          assentosDisponiveis: 2
        }
      ]
    };
  }

  render() {
    return (
      <>
        <h1>Caronas disponíveis</h1>
        <Form>
          <Row gutter={30}>
            <Col span={8}>
              <Form.Item>Filtro por região</Form.Item>
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
          {this.state.caronas.map(item => (
            <List.Item>
              <Col span={3}>
                <Icon type="car" />
              </Col>
              <Col span={15}>
                <List.Item.Meta
                  title={item.horario}
                  description={
                    <>
                      <h4>{item.origem}</h4>
                      <h5>{item.nomeMotirista}</h5>
                      <h5>{item.curso}</h5>
                    </>
                  }
                />
              </Col>
              <Col span={6}>
                <div className="vagas-disponiveis">
                  <h4>VAGAS</h4>
                  <h3>{item.assentosDisponiveis}</h3>
                </div>
              </Col>
            </List.Item>
          ))}
        </List>
      </>
    );
  }
}

export default RideList;
