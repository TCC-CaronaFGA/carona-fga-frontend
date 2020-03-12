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
  Button,
  notification
} from "antd";
import "./styles.scss";
import TextArea from "antd/lib/input/TextArea";
import { createRide } from "../../shared/LayoutApp/_/actions";
import { connect } from "react-redux";
import { carRoute, rideRoute } from "../../constants/apiRoutes";
import Axios from "axios";
import { setupInterceptors } from "../../auth/SetupInterceptors";

function onChange(value) {
  // console.log("changed", value);
}

class RideForm extends Component {
  constructor(props) {
    super(props);
    console.log("rideProps", props);
    this.state = { loading: true, redirect: false, cars: [] };
    setupInterceptors();
  }

  componentDidMount() {
    Axios.get(carRoute)
      .then(response => {
        if (response.status === 200) {
          this.setState({ cars: response.data.data });
        }
      })
      .catch(() => {
        notification.open({ message: "falha ao recuperar lista de carros" });
      });
  }

  state = {
    fga: false
  };

  addressFGA = "Universidade de Brasília - Gama, Gama Leste, Brasília";

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
        const requisicao = {
          location: values.location,
          origin: values.origin,
          destiny: values.destiny,
          dtRide:
            values.date.format("YYYY-MM-DD") +
            " " +
            values.time.format("hh:mm"),
          availableSeats: values.availableSeats,
          notes: values.notes,
          idCar: values.car
        };
        Axios.post(rideRoute, requisicao)
          .then(response => {
            if (response.status === 200) {
              notification.open({
                message: "Carona criada com sucesso!"
              });
            }
          })
          .catch(() => {
            notification.open({
              message: "Falha ao criar carona."
            });
          });
      }
    });
  };

  goingToFGA = () => {
    let isGoing = this.state.fga ? false : true;
    this.setState({
      fga: isGoing
    });
    this.props.form.setFieldsValue({
      origin: isGoing ? this.addressFGA : "",
      destiny: isGoing ? "" : this.addressFGA
    });
  };

  render() {
    // console.log(this.props.form);
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
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
              <Form onSubmit={this.handleSubmit}>
                <Form.Item label="Carro" hasFeedback>
                  {getFieldDecorator("car", {
                    rules: [
                      {
                        required: true,
                        message: "Selecione o carro."
                      }
                    ]
                  })(
                    <Select name="car" placeholder="Selecione um carro">
                      {this.state.cars.map(item => {
                        return (
                          <Option value={item.idCar} key={item.idCar}>
                            {`${item.model} ${item.color} `}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Região" hasFeedback>
                  {getFieldDecorator("location", {
                    rules: [
                      {
                        required: true,
                        message: "Insira a região."
                      }
                    ]
                  })(
                    <Select name="location" placeholder="Selecione uma região">
                      {this.LOCATIONS.map((item, i) => {
                        return (
                          <Option value={item} key={i}>
                            {item}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Origem">
                  {getFieldDecorator("origin", {
                    rules: [
                      {
                        required: true,
                        message: "Insira a origem."
                      }
                    ]
                  })(<Input placeholder="Indique o endereço" />)}
                </Form.Item>
                <Form.Item label="Destino">
                  {getFieldDecorator("destiny", {
                    rules: [
                      {
                        required: true,
                        message: "Insira o destino."
                      }
                    ]
                  })(<Input placeholder="Destino" />)}
                </Form.Item>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="Data">
                      {getFieldDecorator("date", {
                        rules: [
                          {
                            required: true,
                            message: "Insira a data."
                          }
                        ]
                      })(
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
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Horário">
                      {getFieldDecorator("time", {
                        rules: [
                          {
                            type: "object",
                            required: true,
                            message: "Insira o horário de saída."
                          }
                        ]
                      })(
                        <TimePicker placeholder="08:00" format="HH:mm" />

                        // <Input type="time"/>
                      )}
                    </Form.Item>
                  </Col>
                  {/* <Col span={12}>
                      <Form.Item label="Data e horário de saída">
                        <DatePicker placeholder="Selecione a data" />
                      </Form.Item>
                  </Col> */}
                  <Col span={8}>
                    <Form.Item label="Assentos disponíveis">
                      {getFieldDecorator("availableSeats", {
                        rules: [
                          {
                            required: true,
                            message:
                              "Insira a quantidade de assentos disponíveis."
                          }
                        ]
                      })(
                        <InputNumber
                          name="availableSeats"
                          min={1}
                          max={4}
                          onChange={onChange}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Observações">
                  {getFieldDecorator("notes")(
                    <TextArea
                      name="notes"
                      placeholder="Aqui você pode informar alguma restrição ou rota específica. É recomendado indicar o ponto de encontro com referências"
                    />
                  )}
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
