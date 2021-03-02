import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import history from '../history';
import 'bootstrap/dist/css/bootstrap.min.css';

import AllTasks from './AllTasks';
import Login from './Login';
import MyNavBar from './NavBar';
import NewTask from './NewTask';
import Signup from './Signup';

import Lib from '../Lib';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loggedIn: Lib.isAuthenticated(),
        userEmail: Lib.getUserEmail(),
    }
    this.loginHandler = this.loginHandler.bind(this)
  }

  loginHandler = (loggedIn) => {
    this.setState({ 
      loggedIn: loggedIn,
      userEmail: Lib.getUserEmail(),
    });
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <MyNavBar loginHandler={this.loginHandler} userEmail = {this.state.userEmail}/>
          <br/>
          <div className="container">
            <Route path="/tasks" render={() => <AllTasks/>} />
            <Route path="/login" render={() => <Login loginHandler={this.loginHandler}/>} />
            <Route path="/signup" render={() => <Signup/>} />
            <Route path="/new_task" render={() => <NewTask/>} />
          </div>
        </div>
      </Router>
    );

  }
  
}

export default App;
