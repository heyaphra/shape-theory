import React, { Component } from "react";
import { Context } from "./";

const { REACT_APP_SOCKET_PORT: SOCKET_PORT } = process.env;
const SOCKET_HOST = window.location.hostname;

class Provider extends Component {
  state = {};

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export { Provider };
