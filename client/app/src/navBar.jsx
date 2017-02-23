import React from "react";
import {Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Button, Glyphicon} from "react-bootstrap"


export class NavBar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                  <img src="assets/images/StudynatorLogo.png" height="200%"/>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/home">Kalender</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
            <Navbar.Form pullRight>
              <Button type="submit"><Glyphicon glyph="user" /> Logg inn</Button>
            </Navbar.Form>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
