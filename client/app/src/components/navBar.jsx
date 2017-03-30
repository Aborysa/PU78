import React from "react";
import {Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Button, Glyphicon, Tooltip} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { LiveSearch } from './liveSearch.jsx';
import { courseService } from 'services/course';
import { Subject } from 'rxjs';

function filterRemove(e){
  return this.indexOf(e)<0;
}


export class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.searchSubject = new Subject();
    this.state = {
      searchCourses: [],
      userCourses: []
     }
  }
  componentDidMount(){
    this.searchSubject.switchMap(e => courseService.searchCourse(e)).subscribe(e => {
      this.setState(Object.assign(this.state, {
        searchCourses: e
      }));
    });
    courseService.getUserCourses().subscribe(e => {
      console.log("User courses updated",e);
      this.setState(Object.assign(this.state, {
        userCourses: e
      }));
    })
  }
  render() {
    let subjectList = [];
    let filtered = this.state.searchCourses.filter(
      (e) => {
        let isIn = false;
        for(let e2 of this.state.userCourses){
          if(e2.id == e.id){
            return false;
          }
        }
        return true;
      }
    );
    for(let c of filtered) {
      subjectList.push(
        <MenuItem disabled key={c.id}>{c.id} : {c.name}
          <div className="d-flex p-2">
            <Button className="subjectButton" onClick={ () => courseService.addUserCourse(c)}>
              <Glyphicon glyph="ok" className="glyphOk"/>
            </Button>
          </div>
        </MenuItem>
      );
    }
    let mySubjects = [];
    for(let c of this.state.userCourses) {
      mySubjects.push(
        <MenuItem disabled key={c.id}>{c.id} : {c.name}
          <div className="d-flex p-2">
            <Button className="subjectButton" onClick={ () => courseService.deleteUserCourse(c)}>
              <Glyphicon glyph="remove" className="glyphRemove"/>
            </Button>
          </div>
        </MenuItem>
      );
    }
    let showMySubjects = mySubjects.length > 0 ?
      mySubjects :
      <MenuItem disabled>Ingen aktive fag, legg til fra listen</MenuItem>


    let userNav = this.props.currentUser ?
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={2} title="Fag" id="basic-nav-dropdown">
            <MenuItem disabled> Dine aktive fag:</MenuItem>
            {showMySubjects}
            <LiveSearch onChange={e => this.searchSubject.next(e)}/>
            {subjectList}

          </NavDropdown>
        </Nav>
        <Navbar.Text pullRight>
          Bruker: {this.props.currentUser.fullname}
        </Navbar.Text>
        <Navbar.Form pullRight>
          <Button href="/api/v1/logout" bsStyle="primary"><Glyphicon glyph="log-out" /> Logg ut</Button>
        </Navbar.Form>
      </Navbar.Collapse>:
      <Navbar.Collapse>
        <Navbar.Form pullRight>
          <Button href="/api/v1/login" bsStyle="primary"><Glyphicon glyph="user" /> Logg inn</Button>
        </Navbar.Form>
      </Navbar.Collapse>

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">
                <img src="assets/images/logo.png" height="150%"/>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {userNav}
        </Navbar>
      </div>
    )
  }
}
