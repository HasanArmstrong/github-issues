
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
      selectedPage: 1,

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
  this.setState({value: `${owner}/${repo}`}, () => console.log(this.state))
}


  async componentDidMount() {
    const url =
      "https://api.github.com/repos/AdeleD/react-paginate/issues?page=1&per_page=10"
      console.log(this.state.issues)
    let resp = await fetch(url);
    let json = await resp.json();
    this.setState({
      issues: json
    });
    
  }

async getIsusses(arg){
  const url =
  `https://api.github.com/repos/AdeleD/react-paginate/issues?page=${arg}&per_page=10`
  console.log(this.state.issues)
let resp = await fetch(url);
let json = await resp.json();
this.setState({
  issues: json
});
}

handleSelected(selectedPage) {
  console.log("selected", selectedPage);
  this.setState({ selectedPage: selectedPage });
  this.getIsusses(selectedPage)
}

  render() {
    
    return (
      <div className="App ">
      <div className="justify-content-center">
      <div className="d-flex justify-content-center">
       <PaginationComponent totalItems={10} pageSize={2} onSelect={this.handleSelected} />
       </div>
       <div className="d-flex justify-content-center">
       <SearchContainer handleSearch={(owner, repo) => this.handleSearch(owner, repo)}/>
       </div>
       <Issue issueList={this.state.issues} />
       </div>

      </div>
    );
  }
}


export default App;
