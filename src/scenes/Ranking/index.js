import React, { Component } from "react";
import { Spin, Table } from "antd";
import { connect } from "react-redux";

class Ranking extends Component {
  dataSource = [
    {
      name: "Vinicius",
      qtdRides: 1
    },
    {
      name: "Ana",
      qtdRides: 10
    },
    {
      name: "Gabriel",
      qtdRides: 4
    },
    {
      name: "Guilherme",
      qtdRides: 6
    },
    {
      name: "Camila",
      qtdRides: 1
    },
    {
      name: "Julia",
      qtdRides: 9
    },
    {
      name: "Rafael",
      qtdRides: 5
    }
  ];

  columns = [
    {
      title: "#",
      dataIndex: "posicao",
      key: "posicao"
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Quantidade",
      dataIndex: "qtdRides",
      key: "qtdRides"
    }
  ];

  render() {
    // const { users } = this.props;

    return (
      <div className="App">
        {this.props.user == null ? (
          <div className="spin">
            <Spin tip="Carregando..." />
          </div>
        ) : (
          <>
            <h1>Ranking</h1>
            {/* <List
              size="small"
              itemLayout="vertical"
              locale={{ emptyText: "Nenhum usuário encontrado." }}
            >
              {this.users.map(user => {
                return (
                  <List.Item>
                    <List.Item.Meta
                      title={user.name}
                      description={<h4>{user.qtdRides} caronas</h4>}
                    />
                  </List.Item>
                );
              })}
            </List> */}
            <Table dataSource={this.dataSource} columns={this.columns} />;
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, {})(Ranking);
