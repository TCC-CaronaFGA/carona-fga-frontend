import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./styles.scss";

class LayoutApp extends Component {
  render() {
    const { Content, Header } = Layout;

    return (
      <Layout>
        <Header>
          <div className="logo" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "56px", float: "right" }}
          >
            <Menu.Item key="1">
              <Icon type="search" />
              Procurar
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="plus-circle" />
              Oferecer carona
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/login">
                Entrar <Icon type="login" />
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div className="max-container">{this.props.children}</div>
        </Content>
      </Layout>
    );
  }
}

export default LayoutApp;
