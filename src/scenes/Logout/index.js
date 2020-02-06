import React, { Component } from "react";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import { connect } from "react-redux";
import { logout } from "../../shared/LayoutApp/_/actions";
import { Spin } from "antd";
import { Redirect } from "react-router-dom";
import "./styles.scss";

setupInterceptors();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
    const token = localStorage.getItem("auth_token");
    if (token != null) {
      this.props.logout(this.logoutCallback.bind(this));
    } else {
      this.logoutCallback();
    }
  }

  logoutCallback() {
    localStorage.removeItem("auth_token");
    this.setState({ redirect: true });
  }

  render() {
    return (
      <div className="spin">
        {this.state.redirect && <Redirect to="/login" />}
        <Spin tip="Carregando..." />
      </div>
    );
  }
}
export default connect(null, { logout })(Login);
