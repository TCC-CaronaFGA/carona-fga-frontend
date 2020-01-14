import React, { Component } from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import "./styles.scss";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    return (
      <div className="section">
        <div className="login">
          <header className="login-header">
            <h1 className="login-title">
              Carona<b>FGA</b>
            </h1>
          </header>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="E-mail"
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Senha"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    ENTRAR
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={8}></Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Login;
