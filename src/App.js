
import React, { Component } from 'react';
import './App.css';
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Issue from "./Issue";
import SearchContainer from './SearchContainer';



const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();
  
  
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
  

}


 handleSearch(owner, repo) {
  //use for searchContainer,ex: update 'facebook/react' to state.value
  console.log(owner, repo)
  this.setState({value: `${owner}/${repo}`}, () => this.getIssues(this.state.value, 1))
}

async getIssues(value, arg) {
  try{
    const url =
    `https://api.github.com/repos/${value}/issues?page=${arg}&per_page=10&access_token=${this.state.token}`;
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
    this.getIssues('AdeleD/react-paginate', 1)  
  }


handleSelected(selectedPage) {
  console.log("selected", selectedPage);
  // this.setState({ selectedPage: selectedPage });
  this.getIssues(selectedPage)
}

  render() {
    console.log('state', this.state)
    return (
      <div className="App ">
      <div className="justify-content-center">
      <div className="d-flex justify-content-center">
       <PaginationComponent totalItems={10} pageSize={2} onSelect={this.handleSelected} />
       </div>
       <div className="d-flex justify-content-center">
       <SearchContainer handleSearch={(owner, repo) => this.handleSearch(owner, repo)}/>
       {this.state.issues ?
        <Issue issueList={this.state.issues} /> :
        <h2 className="m-5">{this.state.message}</h2>
         }
       </div>
      </div>
      </div>
    );
  }
}


export default App;
