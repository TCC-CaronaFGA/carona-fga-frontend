import React, { Component } from "react";
import { Spin, Table } from "antd";
import { connect } from "react-redux";
import "./styles.scss";

class Ranking extends Component {
  data = [
    {
      key: "1",
      name: "Vinicius",
      qtdRides: 1,
    },
    {
      key: "2",
      name: "Ana",
      qtdRides: 10,
    },
    {
      key: "3",
      name: "Gabriel",
      qtdRides: 4,
    },
    {
      key: "4",
      name: "Guilherme",
      qtdRides: 6,
    },
    {
      key: "5",
      name: "Camila",
      qtdRides: 9,
    },
    {
      key: "6",
      name: "Julia",
      qtdRides: 1,
    },
    {
      key: "7",
      name: "Rafael",
      qtdRides: 8,
    },
  ];

  columns = [
    {
      title: "#",
      dataIndex: "posicao",
      key: "posicao",
    },
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Caronas",
      dataIndex: "qtdRides",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.qtdRides - b.qtdRides,
    },
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
            <Table
              dataSource={this.data}
              columns={this.columns}
              onChange={onChange}
            />
            ;
          </>
        )}
      </div>
    );
  }
}

function onChange(pagination, filters, sorter, extra) {
  // console.log("params", pagination, filters, sorter, extra);
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {})(Ranking);
