import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

export default class AddIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: false,
      warning: false,
      title: null,
      body: null,
      labels: '',
      color: '#ffffff',
     
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      warning: false
    }));
  }


postToApi(data) {
  const url = `https://api.github.com/repos/${this.props.AppState.value}/issues?access_token=${this.props.AppState.token}`;
  fetch(url ,
      {
          method: 'POST',
          headers : { 
          'Content-Type': 'application/vnd.github.symmetra-preview+json'},
          body : JSON.stringify(data)
      })
      .then (resp => resp.json())
}

 submitIssue(e) {
 e.preventDefault();
let {title, body, labels} = this.state
if(labels.length === 0) {labels = []}
else {labels = labels.split(',')}

if (!title || !body ) {
  this.setState({warning : true})
} else {
  this.setState({warning: false})
const data = {
    title : title,
    body :  body,
    labels : labels,
}

this.postToApi(data)
this.toggle()
}
 
}

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value }, () => console.log(this.state));
    
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
         New Issue
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          // className="{this.props.className}"
          size="xl"
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>New Issue</ModalHeader>
          <ModalBody>
          <div className="row">
          <div className="col-8">
          {this.state.warning ? <span className="text-danger" >Please check title and body</span> :
          <span>Please input title and body</span>}
          
          <Input
              name="title"
              type="text"
              placeholder="title"
              value={this.state.title}
              onChange={e => this.handleChange(e)}
            />
            <Input
              name="body"
              type="textarea"
              placeholder="Leave a comment"
              value={this.state.body}
              rows={10}
              onChange={e => this.handleChange(e)}
              required={true}
            />
         </div>
         <div className="col-4">
          <div>
            <h5>Assignees</h5>
            <span>No one yet</span>
          </div>
          <div>
            <h5>labels </h5>
            <span className="text-muted">color not available at the moment</span>
            <Input 
            name="labels"
            type="text" 
              placeholder="label name"
              value={this.state.labels}
              onChange={e => this.handleChange(e)}
              required={true}
            />
            <label>Color:</label>
            <Input
            type="color"
            name="color"
            id="exampleColor"
            value={this.state.color}
            placeholder="color placeholder"
            onChange={e => this.handleChange(e)}  
          />
      
          </div>
         </div>
          </div>
           
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={(e, data) => this.submitIssue(e,data)}>
              Submit New Issue
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
