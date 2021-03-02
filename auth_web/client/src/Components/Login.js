import React, { useState, Component } from 'react';
import history from '../history';
import Lib from '../Lib';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const result = await Lib.login(this.state.email, this.state.password);
    if (result.success) {
      this.props.loginHandler(true);
      history.push("/tasks");
    } else {
      this.setState({errorMessage: 'invalid login'});
    }
}

  handleChange = (e) => {
      this.setState({ [e.target.id]: e.target.value});
  }

  render() {
    return (
      <div className="login">
        <h3>Login</h3>
        <hr/>
        <div className="alert alert-primary">
          New to the Todo list?
          <a href="signup"> Sign up here</a>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
              <label className="form-label">Email: </label>
              <input 
                className="form-control" 
                type="email" 
                id="email" 
                value={this.state.value} 
                onChange={this.handleChange}
              />
          </div>
          
          <div className="mb-3">
              <label className="form-label">Password: </label>
              <input 
                className="form-control" 
                id="password" 
                type="password" 
                value={this.state.value} 
                onChange={this.handleChange}
              />
          </div>
          
          <button type="submit" className="btn btn-primary" >Login</button>
          <div className="text-danger">{this.state.errorMessage}</div>
        </form>
      </div>
    );
  }
  
}

export default Login;
