import React, { Component } from "react";
import { Spin, List } from "antd";
import { connect } from "react-redux";
import "./styles.scss";

class Ranking extends Component {
  data = [
    {
      key: "1",
      name: "1º - Thiago",
      qtdRides: 10,
    },
    {
      key: "2",
      name: "2º - Ana",
      qtdRides: 8,
    },
    {
      key: "3",
      name: "3º - Gabriel",
      qtdRides: 8,
    },
    {
      key: "4",
      name: "Guilherme",
      qtdRides: 7,
    },
    {
      key: "5",
      name: "Camila",
      qtdRides: 4,
    },
    {
      key: "6",
      name: "Julia",
      qtdRides: 3,
    },
    {
      key: "7",
      name: "Rafael",
      qtdRides: 2,
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
            <List
              className="ranking"
              size="small"
              itemLayout="vertical"
              locale={{ emptyText: "Nenhum usuário encontrado." }}
            >
              {this.data.map((user) => {
                return (
                  <List.Item className="item-ranking">
                    <List.Item.Meta
                      title={user.name}
                      description={<h4>{user.qtdRides} caronas</h4>}
                    />
                  </List.Item>
                );
              })}
            </List>
            {/* <Table
              dataSource={this.data}
              columns={this.columns}
              onChange={onChange}
            /> */}
          </>
        )}
      </div>
    );
  }
}

// function onChange(pagination, filters, sorter, extra) {
//   // console.log("params", pagination, filters, sorter, extra);
// }

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {})(Ranking);
