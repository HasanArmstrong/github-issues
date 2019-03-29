import React, { Component } from 'react';
import './App.css';
import SearchContainer from './SearchContainer';
const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {

constructor() {
  super();
  const existingToken = sessionStorage.getItem('token');
  const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1] : null;

  if (!accessToken && !existingToken) {
    window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
  }

  if (accessToken) {
    console.log(`New accessToken: ${accessToken}`);

    sessionStorage.setItem("token", accessToken);
    this.state = {
        token: accessToken
    }
  }

  if (existingToken) {
    this.state = {
      token: existingToken
    };
  }    
}



handleSearch(owner, repo) {
  //use for searchContainer,ex: update 'facebook/react' to state.value
  console.log(owner, repo)
  this.setState({value: `${owner}/${repo}`}, () => console.log(this.state))
}

  render() {
    return (
      <div className="App">
        <SearchContainer handleSearch={(owner, repo) => this.handleSearch(owner, repo)}/>
      </div>
    );
  }
}

export default App;
