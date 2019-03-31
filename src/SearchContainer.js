import React from 'react'

export default class SearchContainer extends React.Component {
    constructor() {
        super() 
        this.state = { value : {owner: null, repo: null}, input: '', issues: null}
      }
    
 
      handleChange (e) {
     this.setState({input: e.target.value}, () => console.log(this.state.input))
      }
    
      handleSubmit (e) {
        e.preventDefault()
    
      let input = this.state.input.replace('https://github.com/', '')
       const owner =  input.split('/')[0]
       const repo = input.split('/')[1]
      this.props.handleSearch(owner, repo)
      }
    
    render() {
      return (
    <form onSubmit={e => this.handleSubmit(e)} className="d-flex">
    <input className="form-control" type="text" placeholder="owner/repo" onChange={e => this.handleChange(e)} />
    <button className="btn btn-warning">Load</button>
    </form>
      )
    }
    

}