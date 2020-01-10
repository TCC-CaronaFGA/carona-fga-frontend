import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./style.scss";

const { Header } = Layout;

class Inicio extends Component {
  render() {
    return (
      <>
        <Layout className="layout">
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
        </Layout>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </>
    );
  }
}

export default Inicio;
