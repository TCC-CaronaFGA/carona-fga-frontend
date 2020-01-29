import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./styles.scss";

class Navigation extends Component {
  render() {
    const logged = Object.keys(this.props.user).length !== 0;
    console.log(logged, this.props.user);
    return (
      <>
        {logged ? (
          <>
            <div className="logo" />
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "56px", float: "right" }}
            >
              <Menu.Item key="1">
                <Link to="/search-ride">
                  <Icon type="search" />
                  Procurar
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/create-ride">
                  <Icon type="plus-circle" />
                  Oferecer carona
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/logout">
                  Sair <Icon type="login" />
                </Link>
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <>
            <div className="logo" />
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "56px", float: "right" }}
            >
              <Menu.Item key="2">
                <Link to="/register">Criar conta</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/login">
                  Entrar <Icon type="login" />
                </Link>
              </Menu.Item>
            </Menu>
          </>
        )}
      </>
    );
  }
}

export default Navigation;
