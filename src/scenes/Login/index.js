import React, { Component } from "react";
import { Form, Icon, Input, Button, Row } from "antd";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import {connect} from "react-redux";
import { login } from "../../shared/LayoutApp/_/actions";
import { Redirect } from "react-router-dom";
import "./styles.scss";

setupInterceptors();
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {loading: true, redirect: false};
  }

  componentDidMount(){
    const token = localStorage.getItem("auth_token");
    if(token != null){
      this.props.checkLogin(this.loginCallback.bind(this));
    }
    else {
      this.loginCallback(false);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true});
        this.props.login(values, this.loginCallback.bind(this));
      }
    });
  };

  loginCallback(didLogin){
    if(didLogin){
      this.setState({redirect: true})
    }
    else{
      this.setState({loading: false});
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="section">
        {this.state.redirect && <Redirect to = "/" />}
        <div className="login">
          <h1 className="login-title">
            Carona<b>FGA</b>
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
                  loading={this.state.loading}
                  className="btn-form"
                >
                  ENTRAR
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </div>
    );
  }
}
export default Form.create({name: 'loginForm'})(connect(null, {login})(Login));
