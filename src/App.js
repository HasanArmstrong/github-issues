import React, { Component } from "react";
import "./App.css";
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Issue from "./Issue";
import SearchContainer from "./SearchContainer";
import AddIssue from "./AddIssue";

const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor() {
    super();

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
    this.setState(
      { value: `${owner}/${repo}`, activePage: 1 },
      () => this.handleSelected(1)
    );
  }

  async getIssues(arg, totalItems) {
    try {
      
      const url = `https://api.github.com/repos/${
        this.state.value
      }/issues?state=all&page=${arg}&per_page=10&access_token=${
        this.state.token
      }`;
      let resp = await fetch(url);
      let json = await resp.json();
      if(arg === 1) {
        totalItems = json[0].number
      }
      json.message ?
         this.setState({ issues: null, message: json.message })
        : this.setState({ issues: json, totalItems : totalItems }, () => console.log(this.state));
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    const url = `https://api.github.com/repos/AdeleD/react-paginate/issues?state=all&page=1&per_page=10&access_token=${
      this.state.token
    }`;
    console.log(this.state.issues);
    let resp = await fetch(url);
    let json = await resp.json();
    this.setState({
      issues: json,
      value: "AdeleD/react-paginate",
      totalItems : json[0].number
    });
  }

  handleSelected(selectedPage) {
    //for the pagination
    this.setState({ selectedPage: selectedPage }, () =>
    this.getIssues(selectedPage, this.state.totalItems)
    );
  }

  render() {
    const { value, issues } = this.state;
    return (
      <div className="App container">
        <div className="d-flex justify-content-center">
          <SearchContainer
            handleSearch={(owner, repo) => this.handleSearch(owner, repo)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <PaginationComponent
            totalItems={this.state.totalItems}
            pageSize={10}
            onSelect={(e) => this.handleSelected(e)}
            activePage={this.state.activePage}
          />
        </div>
        <div className="addIssue my-3 d-flex">
          <h3>
            <a
              href={"https://github.com/" + this.state.value}
              className="title mr-5"
            >
              # {value ? this.state.value : "AdeleD/react-paginate"}
            </a>
          </h3>
          {this.state.issues ? (
            <AddIssue
              onSubmit={() => this.getIssues(1)}
              AppState={this.state}
            />
          ) : (
            <span />
          )}
        </div>

        {this.state.issues ? (
          <Issue issueList={this.state.issues} />
        ) : (
          <h2 className="m-5 text-center">{this.state.message}</h2>
        )}
      </div>
    );
  }
}

export default App;
