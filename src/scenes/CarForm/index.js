import React, { Component } from "react";
import { Form, Input, Button, Col } from "antd";
import "./styles.scss";

class CarForm extends Component {
  render() {
    return (
      <>
        <div className="section">
          <Col span={6}>
            <div className="car-form">
              <h1>Adicionar carro</h1>
              <Form>
                <Form.Item label="Modelo">
                  <Input placeholder="Indique o modelo do carro" />
                </Form.Item>
                <Form.Item label="Ano">
                  <Input placeholder="Indique o ano do carro" />
                </Form.Item>
                <Form.Item label="Placa">
                  <Input placeholder="Indique a placa do carro" />
                </Form.Item>
                <Form.Item label="Cor">
                  <Input placeholder="Indique a cor do carro" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="btn-form">
                    ADICIONAR CARRO
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

export default CarForm;