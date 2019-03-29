import React, { Component } from "react";
import { Media } from "reactstrap";
import "./Issue.css";
import moment from "moment";

export default class Issue extends Component {
  render() {
    console.log(this.props.issueList);
    return (
      <div>
        {this.props.issueList.map(issue => (
          <Media>
            <Media body className="mb-3">
              <Media heading className="d-flex justify-content-start mb-0 ml-4">
                <div href="#">
                  <a href={issue.html_url}>#</a> {issue.number} {issue.title}
                </div>
              </Media>
              <Media>
                <div className="small ml-5 mt-0 text-dark">
                  {moment()
                    .startOf("day")
                    .fromNow()}
                </div>
              </Media>
              <div className="row ml-5 text-left">{issue.body}</div>
            </Media>
            <Media left href="#" className="col-2">
              <img
                class="from-avatar"
                src={issue.user.avatar_url}
                width="60"
                height="60"
              />
              <p className="small text-dark">@{issue.user.login}</p>
            </Media>
          </Media>
        ))}
      </div>
    );
  }
}
