import React, { Component } from "react";
import { Form, Input, Button, Select, Radio, Row, Col } from "antd";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import { Redirect } from "react-router-dom";
import "../../shared/LayoutApp/styles.scss";
import "./styles.scss";

setupInterceptors();
class Register extends Component {
  COURSES = [
    "Engenharias",
    "Engenharia Aeroespacial",
    "Engenharia Automotiva",
    "Engenharia Eletrònica",
    "Engenharia de Energia",
    "Engenharia de Software"
  ];

  constructor(props) {
    super(props);
    this.state = { loading: true, redirect: false };
  }

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
		const { Option } = Select;
		
    return (
      <div className="section">
        {this.state.redirect && <Redirect to="/" />}
        <div className="register">
          <h1 className="register-title">Registre-se</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item label="Nome">
              {getFieldDecorator("name", {
									rules: [
										{
											required: true,
											message: 'Insira seu nome.',
										},
									],
								})
								(<Input />)} 
              </Form.Item>
              <Form.Item label="E-mail">
                 {getFieldDecorator("email", {
									rules: [
										{
											type: 'email',
											message: 'Insira um e-mail válido.',
										},
										{
											required: true,
											message: 'Insira seu e-mail.',
										},
									],
								})
								(<Input />)} 
              </Form.Item>
              <Form.Item label="Curso" hasFeedback>
              {getFieldDecorator("course", {
                  rules: [
                    {
                      required: true,
                      message: "Selecione seu curso."
                    }
                  ]
                })(
                  <Select placeholder="Selecione um curso">
                    {this.COURSES.map((item, i) => {
                      return (
                        <Option value={item} key={i}>
                          {item}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
              <Row gutter={24}>
                <Col span="12">
                  <Form.Item label="Celular">
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: 'Insira seu telefone.' }],
                    })(<Input />)}
                  </Form.Item>
                </Col>
                <Col span="12">
                  <Form.Item label="Gênero">
                    {getFieldDecorator("course", {
                      rules: [
                        {
                          required: true,
                          message: "Selecione seu gênero."
                        }
                      ]
                    })(
                      <Radio.Group onChange={this.onChange} value={this.state.value}>
                      <Radio value={"F"}>Feminino</Radio>
                      <Radio value={"M"}>Masculino</Radio>
                    </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span="12">
                  <Form.Item label="Senha" hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Insira sua senha."
                        },
                        {
                          validator: this.validateToNextPassword
                        }
                      ]
                    })(<Input.Password />)}
                  </Form.Item>
                </Col>
                <Col span="12">
                  <Form.Item label="Confirmar senha" hasFeedback>
                    {getFieldDecorator("confirm", {
                      rules: [
                        {
                          required: true,
                          message: "Confira sua senha."
                        },
                        {
                          validator: this.compareToFirstPassword
                        }
                      ]
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
									htmlType="submit"
									className="btn-form"
                >
                  CRIAR CONTA
                </Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    );
  }
}

export default Form.create({name: 'registerForm'})(Register);