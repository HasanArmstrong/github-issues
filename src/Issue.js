import React, { Component } from "react";
import { Media } from "reactstrap";
import "./Issue.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ReactMarkdown = require("react-markdown");

export default class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isLoading: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  async componentDidMount () {
    const url = `https://api.github.com/repos/AdeleD/react-paginate/issues/262/comments&access_token=${
      this.state.token
    }`;
    
    let resp = await fetch(url);
    let json = await resp.json();
    this.setState({
      comments: json,
      isLoading: false
      
    }, () => console.log('comment',this.state.comments));
  }

  render() {
    return (
      <div>
        {this.props.issueList.map(issue => (
          <div className="col Is">
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
              {/* <Media
                className={
                  issue.state === "open"
                    ? "openColor col-1 d-flex justify-content-end small pt-1"
                    : "closedColor col-1 d-flex justify-content-end small pt-1"
                }
              >
                <div className="mr-1">
               {issue.state === 'open' ? <FontAwesomeIcon icon={ faExclamationCircle } /> :
               <FontAwesomeIcon icon={ faCheckCircle } />
                }
                   {issue.state}
                </div>
              </Media> */}
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
                    <div className="comments">
                    {this.state.isLoading ? <span /> : this.state.comments.map(
                      comment => <div>{comment.user.login} <hr/>
                      {comment.body}</div>
                    )}
                      </div>
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
                  style={{ display: "inline" }}
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
                  issue.labels.map(label => (
                    <a className="label mt-0 mb-3" href={label.url}>
                      <span
                        className="p-1"
                        style={{
                          backgroundColor: "#" + label.color
                        }}
                      >
                        {label.name}
                      </span>
                    </a>
                  ))
                )}
              </Media>
            </Media>
          </div>
        ))}
      </div>
    );
  }
}
