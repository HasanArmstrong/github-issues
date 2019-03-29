import React, { Component } from "react";
import Issue from "./Issue";
import "./App.css";
const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();
    const state = {};
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      state.token = accessToken;
      this.state = {
        token: accessToken
      };
    }

    if (existingToken) {
      state.token = existingToken;
    }
    this.state = {
      token: state.token
    };
  }

  render() {
    return (
      <div className="App">
        <Issue />
      </div>
    );
  }
}

export default App;
