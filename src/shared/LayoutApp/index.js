import React, { Component } from "react";
import { Layout } from "antd";
import "./styles.scss";
import Navigation from "../../components/Menu";

class LayoutApp extends Component {
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
