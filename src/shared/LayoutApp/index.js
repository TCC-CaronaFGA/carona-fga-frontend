import React, { Component } from "react";
import { Layout } from "antd";
import "./styles.scss";
import Navigation from "../../components/Menu";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import { history } from "../../components/Routes";
import { checkLogin } from "./_/actions";
import {connect} from "react-redux";

setupInterceptors();
class LayoutApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
    const token = localStorage.getItem("auth_token");
    if(token != null){
      this.props.checkLogin(this.loginCallback.bind(this));
    }
    else {
      this.loginCallback(false);
    }
  }

  loginCallback(didLogin){
    if(!didLogin){
      history.push("/login");
    }
  }

  render() {
    const { Content, Header } = Layout;
    return (
      <Layout>
        <Header>
          <Navigation />
        </Header>
        <Content>
          <div className="max-container">{this.props.children}</div>
        </Content>
      </Layout>
    );
  }
}
    
  export default connect(null,{checkLogin})(LayoutApp);
