import React, { Component } from "react";
import { Button, Col, Row, Media } from "reactstrap";
import "./Issue.css";
import moment from "moment";

export default class Issue extends Component {
  render() {
    console.log(this.props.issueList);
    return (
      <div>
        {this.props.issueList.map(issue => (
          <Media>
            <Media body className="col-10 ">
              <Media heading className="d-flex justify-content-start">
                <div href="#">
                  <a href={issue.html_url}>#</a> {issue.number} {issue.title}
                </div>
                <div>moment().startOf("day").fromNow()</div>
              </Media>
              <p className="d-flex justify-content-start">{issue.body}</p>
            </Media>
            <Media left href="#" className="col-2">
              <img
                class="from-avatar"
                src={issue.user.avatar_url}
                width="60"
                height="60"
                // alt="@lvltcode"
              />
              <p className="small text-dark">@{issue.user.login}</p>
            </Media>
          </Media>
        ))}
      </div>
    );
  }
}
