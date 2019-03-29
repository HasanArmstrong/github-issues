import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom";
import PaginationComponent from "react-reactstrap-pagination";
import "bootstrap/dist/css/bootstrap.min.css";


const clientId = process.env.REACT_APP_CLIENT_ID;

class App extends Component {
  constructor(props) {
    super(props);
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
        nice: [],
          token: accessToken
      }
    }
  
    if (existingToken) {
      this.state = {
        token: existingToken
      };
    }    
  }

  

handleSelected(selectedPage) {
  console.log("selected", selectedPage);
  this.setState({ selectedPage: selectedPage });

}


  render() {
    
    return (
      <>
     
     <div className="App justify-content-center d-flex">
     <PaginationComponent totalItems={50} pageSize={5} onSelect={this.handleSelected} />
     </div>
      </>
    );
  }
}

export default App;
