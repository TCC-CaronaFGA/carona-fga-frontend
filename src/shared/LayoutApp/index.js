import React, { Component } from "react";
import { Layout } from "antd";
import "./styles.scss";
import Navigation from "../../components/Menu";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import axios from 'axios';
import { authStatusRoute } from "../../constants/routes";
import { history } from "../../components/Routes";

setupInterceptors();
class LayoutApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
    const token = localStorage.getItem("auth_token");
    if(token != null)
      axios.get(authStatusRoute).then(response => {
        if(response.status === 200){
          this.setState({user: response.data});
        }
        else{
          history.push("/");
        }
      });
    else{
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

export default LayoutApp;
