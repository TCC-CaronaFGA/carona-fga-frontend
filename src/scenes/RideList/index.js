import React, { Component } from "react";
import { Form, Row, Col, List, Icon, Select } from "antd";
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

  render() {
    const { Option } = Select;
    return (
      <>
        <h1>Caronas disponíveis</h1>
        <Form>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Filtre pela região">
                <Select placeholder="Selecione uma região">
                  {this.LOCATIONS.map((item, i) => {
                    return (
                      <Option value={item} key={i}>
                        {item}
                      </Option>
                    );
                  })}
                </Select>
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
