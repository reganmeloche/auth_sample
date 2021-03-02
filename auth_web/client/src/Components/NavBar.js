import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import history from '../history';
import Lib from '../Lib';

export default class MyNavBar extends Component {   
    logout = async () => { 
        await Lib.logout(); 
        this.props.loginHandler(false);
        history.push("/login");
    }

    renderLogin = () => {
        let result = null;
        if (Lib.isAuthenticated()) {
            result = (
                <div>
                    <span className="text-light">{this.props.userEmail} {"   "}</span>
                    <Button onClick={() => this.logout()}>Log Out</Button>
                </div>
            );
        } else {
            result = (<a className="btn btn-primary" href="login">Log in</a>);
        }
        return result;
    }

    renderLinks = () => {
        let result = (
            <Nav className="mr-auto"></Nav>
        );

        result = (
            <Nav className="mr-auto">
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <Nav.Link href="/new_task">New Task</Nav.Link>
            </Nav>
        );
        return result;
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Todo List</Navbar.Brand>
                {this.renderLinks()}
                {this.renderLogin()}
            </Navbar>
        );
    }
}

