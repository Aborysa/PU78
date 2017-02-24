import React from "react";
import {Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Button, Glyphicon} from "react-bootstrap";
import { Link } from 'react-router';


export class NavBar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let userNav = this.props.currentUser ?
      <Navbar.Text pullRight>
        {this.props.currentUser.fullname}
        <a href="/api/v1/logout"><Glyphicon glyph="log-out" /></a>
      </Navbar.Text> :
      <Navbar.Form pullRight>
        <Button href="/api/v1/login"><Glyphicon glyph="user" /> Logg inn</Button>
      </Navbar.Form>

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                <img src="assets/images/logo.png" height="200%"/>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <MenuItem href="/home">Kalender</MenuItem>
            <MenuItem eventKey={3.1} href="/home">Noe</MenuItem>
            {userNav}
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
