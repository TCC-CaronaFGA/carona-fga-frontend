import React, { Component } from "react";
import { Layout } from "antd";
import "./styles.scss";
import Navigation from "../../components/Menu";
import { setupInterceptors } from "../../auth/SetupInterceptors";
import { checkLogin } from "./_/actions";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

setupInterceptors();
class LayoutApp extends Component {
  constructor(props){
    super(props);
    this.state = {redirect: false}
  }

  componentDidMount(){
    /*const token = localStorage.getItem("auth_token");
    if(token != null){
      this.props.checkLogin(this.loginCallback.bind(this));
    }
    else {
      this.loginCallback(false);
    }*/
  }

  componentDidUpdate(oldProps){
    /*if(JSON.stringify(this.props.user) !== JSON.stringify(oldProps.user)){
      const token = localStorage.getItem("auth_token");
      if(token != null){
        this.props.checkLogin(this.loginCallback.bind(this));
      }
      else {
        this.loginCallback(false);
      }
    }*/
  }

  loginCallback(didLogin){
    if(!didLogin){
      this.setState({redirect: true});
    }
  }

  render() {
    const { Content, Header } = Layout;
    const {user} = this.props;
    console.log(user);
    return (
      <Layout>
        {this.state.redirect && <Redirect to = "/login" />}
        <Header>
          <Navigation user={user}/>
        </Header>
        <Content>
          <div className="max-container">{this.props.children}</div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps,{checkLogin})(LayoutApp);
