import React, { Component } from "react";
import { Media } from "reactstrap";
import "./Issue.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const ReactMarkdown = require("react-markdown");

export default class Issue extends Component {
  render() {
    return (
      <div>
        {this.props.issueList.map(issue => (
          <div className="col Is">
            {/* <Navbar color="light" light expand="md" className="mx-4 mb-2">
              <NavbarBrand href="/">Open</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/components/">Author</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                      Projects
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Labels
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>st</DropdownItem>
                      <DropdownItem>st2</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Reset</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar> */}

            <Media className="mx-2 py-2">
              {issue.state === "open" ? (
                <div>
                  <Media className="d-flex justify-content-end small pt-1 text-success ml-5">
                    <div className="mr-1">
                      <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>

                    <div>{issue.state}</div>
                  </Media>
                </div>
              ) : (
                <div>
                  <Media className="d-flex justify-content-end small pt-1 text-danger ml-5">
                    <div className="mr-1">
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div>{issue.state}</div>
                  </Media>
                </div>
              )}
              <Media body className="mb-3 col-8-md">
                <Media
                  heading
                  className="d-flex justify-content-start mb-0 ml-1 bodyContent col-md-10"
                >
                  <div href="#">{issue.title}</div>
                </Media>
                <Media>
                  <div className="small my-0 text-dark px-1 ml-3">
                    <p>
                      <a href={issue.html_url}># </a>
                      {issue.number} opened on{" "}
                      {moment()
                        .startOf("day")
                        .fromNow()}
                    </p>
                  </div>
                </Media>
                <div className="ml-3 text-left pl-1 mr-1 bodyContent col-md-10">
                  <ReactMarkdown source={issue.body} />
                </div>
              </Media>
              <Media left className="col-2 my-2">
                <p>
                  <a href={issue.user.url}>
                    <img
                      className="from-avatar mt-4"
                      src={issue.user.avatar_url}
                      width="60"
                      height="60"
                    />
                  </a>
                </p>
                <p>
                  <a href={issue.user.url} className="small text-dark my-0">
                    @{issue.user.login}
                  </a>
                </p>
                {issue.labels.length === 0 ? (
                  <span />
                ) : (
                  <a className="label mt-0 mb-3" href={issue.labels[0].url}>
                    <span
                      className="p-1"
                      style={{
                        backgroundColor: "#" + issue.labels[0].color
                      }}
                    >
                      {issue.labels[0].name}
                    </span>
                  </a>
                )}
              </Media>
            </Media>
          </div>
        ))}
      </div>
    );
  }
}
