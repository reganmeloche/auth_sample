import React, { useState, Component } from 'react';
import history from '../history';
import Lib from '../Lib';

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!Lib.isAuthenticated()) {
      history.push("/login");
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      description: this.state.description
    };
    const result = await Lib.newTask(newTask);
    if (result.success) {
      history.push("/tasks");
    }
}

  handleChange = (e) => {
      this.setState({ [e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className="new_task">
        <h3>New Task</h3>
        <hr/>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
              <label className="form-label">Description: </label>
              <input 
                className="form-control" 
                type="text" 
                id="description" 
                value={this.state.value} 
                onChange={this.handleChange}
              />
          </div>
          
          <button type="submit" className="btn btn-primary" >Create</button>
        </form>
      </div>
    );
  }
  
}

export default NewTask;
