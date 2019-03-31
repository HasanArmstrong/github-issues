import React, { Component } from "react";
import { Media } from "reactstrap";
import "./Issue.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ReactMarkdown = require("react-markdown");

export default class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
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
              <Media className="col-1 openColor d-flex justify-content-end small pt-1">
                <div className="mr-1">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                </div>
                <div>{issue.state}</div>
              </Media>
              <Media body className="mb-3">
                <Media heading className="d-flex justify-content-start mb-0">
                  <div href="#" onClick={this.toggle}>
                    {issue.title}
                  </div>
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.toggle}>
                      {issue.title}
                    </ModalHeader>
                    <ModalBody>{issue.body}</ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={this.toggle}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Media>
                
                <Media>
                  <div className="small my-0 text-dark px-1">
                    <p>
                      <a href={issue.html_url}># </a>
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
