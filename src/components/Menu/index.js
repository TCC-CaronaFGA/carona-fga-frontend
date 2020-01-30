import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import "./styles.scss";
import Sider from "antd/lib/layout/Sider";

class Navigation extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const logged = Object.keys(this.props.user).length !== 0;
    console.log(logged, this.props.user);
    return (
      <>
        {logged ? (
          <>
            {/* <div className="logo" />
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
            </Menu> */}
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0
              }}
            >
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
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
                  <Link to="/profile">
                    <Icon type="user" />
                    Meu perfil
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/solicitations">
                    <Icon type="notification" />
                    Solicitações
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/evaluations">
                    <Icon type="star" />
                    Avaliações
                  </Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/ranking">
                    <Icon type="trophy" />
                    Ranking
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/logout">
                    <Icon type="login" />
                    Sair
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
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
