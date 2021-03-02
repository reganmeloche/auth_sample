import React, { useState, Component } from 'react';
import history from '../history';
import Lib from '../Lib';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    // validate here...
    const result = await Lib.signup(this.state.email, this.state.password);
    if (result) {
      history.push("/login");
    } else {
      this.setState({errorMessage: 'Invalid signup'});
    }
}

  handleChange = (e) => {
      this.setState({ [e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className="signup">
        <h3>Signup</h3>
        <hr/>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
              <label className="form-label">Email: </label>
              <input 
                className="form-control" 
                type="email" 
                id="email" 
                value={this.state.email} 
                onChange={this.handleChange}
              />
          </div>
          
          <div className="mb-3">
              <label className="form-label">Password: </label>
              <input 
                className="form-control" 
                id="password" 
                type="password" 
                value={this.state.password} 
                onChange={this.handleChange}
              />
          </div>

          <div className="mb-3">
              <label className="form-label">Confirm Password: </label>
              <input 
                className="form-control" 
                id="confirmPassword" 
                type="password" 
                value={this.state.confirmPassword} 
                onChange={this.handleChange}
              />
          </div>
          
          <button type="submit" className="btn btn-primary" >Sign up</button>
          <div className="text-danger">{this.state.errorMessage}</div>
        </form>
      </div>
    );
  }
  
}

export default Signup;
