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

function onChange(value) {
  console.log("changed", value);
}

class RideForm extends Component {
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
    const format = "HH:mm";
    return (
      <>
        <div className="content">
          <Row gutter={24}>
            <Col span={20}>
              <h1>Oferecer carona</h1>
            </Col>
            <Col span={4} style={{ lineHeight: "41px" }}>
              <Switch
                checkedChildren="Ida"
                unCheckedChildren="Volta"
                defaultChecked
              />
            </Col>
          </Row>
          <Form>
            <Form.Item label="Região de origem" hasFeedback>
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
            <Form.Item label="Origem">
              <Input placeholder="Indique o endereço" />
            </Form.Item>
            <Form.Item label="Destino">
              <Input
                placeholder="Destino"
                value="Universidade de Brasília - Gama, Gama Leste, Brasília"
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
              <Col span={8}>
                <Form.Item label="Assentos disponíveis">
                  <InputNumber
                    min={1}
                    max={4}
                    defaultValue={1}
                    onChange={onChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                OFERECER CARONA
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

export default RideForm;
