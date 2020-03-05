import React, { Component } from "react";
import { Form, Input, Button, Col, notification } from "antd";
import { connect } from "react-redux";
import { createCar } from "../../shared/LayoutApp/_/actions";
import "./styles.scss";

class CarForm extends Component {
  constructor(props) {
    super(props);
    console.log("carProps", props);
    this.state = { redirect: false };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createCar(values, () => this.createCarCallback());
        //this.props.createCar(values, this.createCarCallback.bind(this));
        // console.log("Valores recebidos do formulário do carro: ", values);
        // const requisicao = {
        //   plate: values.plate,
        //   color: values.color,
        //   year: values.year,
        //   model: values.model
        // };
        // console.log("Requisição ", requisicao);
      }
    });
  };

  createCarCallback = success => {
    success
      ? this.setState({ redirect: true })
      : notification.open({
          message: "Erro ao adicionar carro",
          description: "Não foi possível adicionar o carro.",
          style: {
            width: 600,
            marginLeft: 335 - 600
          }
        });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <>
        <div className="section">
          <Col span={6}>
            <div className="car-form">
              <h1>Adicionar carro</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item label="Modelo">
                  {getFieldDecorator("model", {
                    rules: [
                      { required: true, message: "Insira o modelo do carro." }
                    ]
                  })(<Input placeholder="Indique o modelo do carro" />)}
                </Form.Item>
                <Form.Item label="Ano">
                  {getFieldDecorator("year", {
                    rules: [
                      { required: true, message: "Insira o ano do carro." }
                    ]
                  })(<Input placeholder="Indique o ano do carro" />)}
                </Form.Item>
                <Form.Item label="Placa">
                  {getFieldDecorator("plate", {
                    rules: [
                      { required: true, message: "Insira a placa do carro." }
                    ]
                  })(<Input placeholder="Indique a placa do carro" />)}
                </Form.Item>
                <Form.Item label="Cor">
                  {getFieldDecorator("color", {
                    rules: [
                      { required: true, message: "Insira a cor do carro." }
                    ]
                  })(<Input placeholder="Indique a cor do carro" />)}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={this.state.loading}
                    className="btn-form"
                  >
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

export default Form.create({ name: "createCarForm" })(
  connect(null, { createCar })(CarForm)
);
