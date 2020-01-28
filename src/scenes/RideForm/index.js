import React, { Component } from "react";
import {
  Select,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  TimePicker,
  InputNumber,
  Switch,
  Button
} from "antd";
import "./styles.scss";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { createRide } from "../../shared/LayoutApp/_/actions";
import { connect } from "react-redux";

function onChange(value) {
  console.log("changed", value);
}

class RideForm extends Component {
  constructor(props) {
    super(props);
    console.log("rideProps", props);
    this.state = { loading: true, redirect: false };
  }

  state = {
    fga: false
  };

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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Valores recebidos do formulário da carona: ", values);
      }
    });
  };

  goingToFGA = () => {
    let isGoing = this.state.fga ? false : true;
    this.setState({
      fga: isGoing
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const addressFGA = "Universidade de Brasília - Gama, Gama Leste, Brasília";
    const { Option } = Select;
    const format = "HH:mm";
    return (
      <>
        <div className="section">
          <Col md={12} lg={10} sm={12} xs={24}>
            <div className="ride-form">
              <Row gutter={12}>
                <Col span={20}>
                  <h1>Oferecer carona</h1>
                </Col>
                <Col span={4} style={{ lineHeight: "40px" }}>
                  <Switch
                    onChange={this.goingToFGA}
                    checkedChildren="Ida"
                    unCheckedChildren="Volta"
                    defaultChecked
                    style={{ marginTop: "32px" }}
                  />
                </Col>
              </Row>
              <Form>
                <Form.Item label="Região" hasFeedback>
                  <Select name="location" placeholder="Selecione uma região">
                    {this.LOCATIONS.map((item, i) => {
                      return (
                        <Option value={item} key={i}>
                          {item}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Origem">
                  <Input
                    name="origin"
                    placeholder="Indique o endereço"
                    value={this.state.fga ? addressFGA : null}
                  />
                </Form.Item>
                <Form.Item label="Destino">
                  <Input
                    name="destiny"
                    placeholder="Destino"
                    value={this.state.fga ? null : addressFGA}
                  />
                </Form.Item>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="Data">
                      <DatePicker
                        placeholder="Selecione a data"
                        format="DD-MM-YYYY"
                        dateRender={current => {
                          const style = {};
                          if (current.date() === 1) {
                            style.border = "1px solid #1890ff";
                            style.borderRadius = "50%";
                          }
                          return (
                            <div className="ant-calendar-date" style={style}>
                              {current.date()}
                            </div>
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Horário">
                      <TimePicker
                        defaultValue={moment("08:00", format)}
                        format={format}
                      />
                    </Form.Item>
                  </Col>
                  {/* <Col span={12}>
                    <Form.Item label="Data e horário de saída">
                      <DatePicker placeholder="Selecione a data" />
                    </Form.Item>
                  </Col> */}
                  <Col span={8}>
                    <Form.Item label="Assentos disponíveis">
                      <InputNumber
                        name="availableSeats"
                        min={1}
                        max={4}
                        defaultValue={1}
                        onChange={onChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Observações">
                  <TextArea
                    name="notes"
                    placeholder="Aqui você pode informar alguma restrição ou rota específica. É recomendado indicar o ponto de encontro com referências"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    OFERECER CARONA
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </div>
      </>
    );
  }
}

export default Form.create({ name: "rideForm" })(
  connect(null, { createRide })(RideForm)
);
