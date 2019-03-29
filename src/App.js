import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Issue from "./Issue";
import SearchContainer from './SearchContainer';


const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();
    const state = {};
    this.state = {
      selectedPage: 1
    };
  
    this.handleSelected = this.handleSelected.bind(this);
  

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
  

  this.state = {
      issues: [],
      token: state.token
    };
  }    



 handleSearch(owner, repo) {
  //use for searchContainer,ex: update 'facebook/react' to state.value
  console.log(owner, repo)
  this.setState({value: `${owner}/${repo}`}, () => this.getIssues())
  
}

async getIssues() {
  try{
    const url =
    `https://api.github.com/repos/${this.state.value}/issues`;
    let resp = await fetch(url);
    let json = await resp.json();
    json.message ? 
    this.setState({issues: null, message: json.message}) :
    this.setState({ issues: json })
  } catch(err) {
    console.log(err)
  }
}

  async componentDidMount() {
    const url =
      "https://api.github.com/repos/HasanArmstrong/github-issues/issues";
    let resp = await fetch(url);
    let json = await resp.json();
    this.setState({
      issues: json
    })
  }


handleSelected(selectedPage) {
  console.log("selected", selectedPage);
  this.setState({ selectedPage: selectedPage });
}
 
  render() { 
    return (
      <div className="App justify-content-center d-flex">
      <div>
       <PaginationComponent totalItems={50} pageSize={5} onSelect={this.handleSelected} />
       <SearchContainer handleSearch={(owner, repo) => this.handleSearch(owner, repo)}/>
       {this.state.issues ?
        <Issue issueList={this.state.issues} /> :
        <h2 className="m-5">{this.state.message}</h2>
         }
       </div>
      </div>
    );
  }
}

export default App;
