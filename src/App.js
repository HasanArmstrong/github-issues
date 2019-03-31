import React, { Component } from "react";
import "./App.css";
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Issue from "./Issue";
import SearchContainer from './SearchContainer';
import AddIssue from './AddIssue';


const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      selectedPage: 1,
    }
    
    this.handleSelected = this.handleSelected.bind(this);

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
      this.state = {
        token: accessToken
      };
    }

    if (existingToken) {
      this.state = {
        token: existingToken
      };
    }
  }

  handleSearch(owner, repo) {
    //use for searchContainer,ex: update 'facebook/react' to state.value
    console.log(owner, repo);
    this.setState({ value: `${owner}/${repo}`, selectedPage: 1 }, () =>
      this.getIssues(1)
    );
  }

  async getIssues(arg) {
    try {
      const url = `https://api.github.com/repos/${
        this.state.value
      }/issues?page=${arg}&per_page=10&access_token=${this.state.token}`;
      let resp = await fetch(url);
      let json = await resp.json();
      json.message
        ? this.setState({ issues: null, message: json.message })
        : this.setState({ issues: json }, () => console.log(this.state));
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    const url = `https://api.github.com/repos/AdeleD/react-paginate/issues?page=1&per_page=10&access_token=${
      this.state.token
    }`;
    console.log(this.state.issues);
    let resp = await fetch(url);
    let json = await resp.json();
    this.setState({
      issues: json,
      value: "AdeleD/react-paginate"
    });
  }

  // async getIsusses(arg){
  //   const url =
  //   `https://api.github.com/repos/AdeleD/react-paginate/issues?page=${arg}&per_page=10`
  //   console.log(this.state.issues)
  // let resp = await fetch(url);
  // let json = await resp.json();
  // this.setState({
  //   issues: json
  // });
  // }

  handleSelected(selectedPage) {
    //for the pagination
    console.log("selected", selectedPage);
    this.setState({ selectedPage: selectedPage }, () =>
      this.getIssues(selectedPage)
    );
  }


  render() {
    console.log('state', this.state)
    const {value, issues} = this.state
    return (
      <div className="App container">
      <div className="d-flex justify-content-center">
       <PaginationComponent totalItems={10} pageSize={2} onSelect={this.handleSelected} />
       </div>
       <div className="d-flex justify-content-center">
       <SearchContainer handleSearch={(owner, repo) => this.handleSearch(owner, repo)}/>
       </div>
       <div className="addIssue my-3">
        {/* <a href="#" className="title">{value ? this.state.value : 'AdeleD/react-paginate'}</a> */}
        <AddIssue onSubmit={() => this.getIssues(1)} AppState={this.state}/>
       </div>
       {this.state.issues ?

        <Issue issueList={this.state.issues} /> :
        <h2 className="m-5">{this.state.message}</h2>
         }
       </div>
   
    );
  }
}

export default App;
