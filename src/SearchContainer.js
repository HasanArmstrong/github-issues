import React from 'react'

export default class SearchContainer extends React.Component {
    constructor() {
        super() 
        this.state = { value : {owner: null, repo: null}, input: '', issues: null}
      }
    
    //  getIssues() {
    //    const {value} = this.state
    //    if(value.owner && value.repo) { 
    //     getIssuesFromApi(value.owner, value.repo).then(resp => this.setState({issues : resp}))
    //     .then(resp => console.log(this.state))
    //    }
    //  }
    
      handleChange (e) {
     this.setState({input: e.target.value}, () => console.log(this.state.input))
      }
    
      handleSubmit (e) {
        e.preventDefault()
       const owner =  this.state.input.split('/')[0]
       const repo = this.state.input.split('/')[1]
      this.props.handleSearch(owner, repo)
      }
    
    render() {
      return (
    <form onSubmit={e => this.handleSubmit(e)}>
    <input className="form-control" type="text" onChange={e => this.handleChange(e)} />
    <button className="btn btn-warning">Load</button>
    </form>
      )
    }
    

}