import React, { Component } from "react";
import { Button, Col, Row, Media } from "reactstrap";
import "./Issue.css";

export default class Issue extends Component {
   
  render() {
    // console.log(issues);
    return (
      <div>
        {this.state.issues.map(issue => (
          <Media>
            <Media body className="col-10 ">
              <Media heading className="d-flex justify-content-start">
                <div href="#">
                  <a href="#">#</a> {issue.number} {issue.title}
                </div>
              </Media>
              <p className="d-flex justify-content-start">{issue.body}</p>
            </Media>
            <Media left href="#" className="col-2">
              <Media object data-src={issue.user["avatar_url"]} />
            </Media>
          </Media>
        ))}
      </div>
    );
  }
}
