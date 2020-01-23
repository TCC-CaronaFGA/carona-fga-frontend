import React, { Component } from "react";
import { Form, Icon, Input, Button, Row } from "antd";
import "./styles.scss";
import { setupInterceptors } from "../../auth/SetupInterceptors";

setupInterceptors();
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        this.props.auth.login(values);
      }
    });
  };

  constructor(props){
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Consumer } = React.createContext({auth: null});
    return (
      <Consumer>
        {value =>
      <div className="section">
        <div className="login">
          <h1 className="login-title">
            Cadrona<b>FGA</b>
          </h1>
          <Row>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
              {getFieldDecorator("email", {
                })(<Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="E-mail"
                />)}
              </Form.Item>
              <Form.Item>
              {getFieldDecorator("password", {
                })(<Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Senha"
                />)}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={this.state.loading}
                >
                  ENTRAR
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </div>}</Consumer>
    );
  }
}
export default Form.create({name: 'loginForm'})(Login);
