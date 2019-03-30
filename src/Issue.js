import React, { Component } from "react";
import {
  Media,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./Issue.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ReactMarkdown = require("react-markdown");

export default class Issue extends Component {
  render() {
    return (
      <div>
        {this.props.issueList.map(issue => (
          <div>
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
            <Media className="Is mx-2">
              <Media className="col-1 openColor d-flex justify-content-end small pt-1">
                <div className="mr-1">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                </div>
                <div>{issue.state}</div>
              </Media>
              <Media body className="mb-3">
                <Media heading className="d-flex justify-content-start mb-0">
                  <div href="#">{issue.title}</div>
                </Media>
                <Media>
                  <div className="small my-0 text-dark px-1">
                    <p>
                      <a href={issue.html_url}>#</a>
                      {issue.number} opened on{" "}
                      {moment()
                        .startOf("day")
                        .fromNow()}
                    </p>
                  </div>
                </Media>
                <ReactMarkdown
                  source={issue.body}
                  className="row ml-2 text-left pl-1 mr-1"
                />
              </Media>
              <Media left className="col-1">
                <img
                  className="from-avatar"
                  src={issue.user.avatar_url}
                  width="60"
                  height="60"
                />
                <p className="small text-dark">@{issue.user.login}</p>
                <span style={{ backgroundColor: issue.labels.color }}>
                  {issue.labels.name}
                </span>
              </Media>
            </Media>
          </div>
        ))}
      </div>
    );
  }
}
