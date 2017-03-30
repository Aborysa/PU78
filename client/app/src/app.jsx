require("style!css!assets/style/app.css");

import 'fullcalendar';
import 'moment';

import React from "react";
import { render } from "react-dom";

import { LoginView, CalendarView, NotFound } from './views';
import { NavBar } from './components/navBar.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import { userService } from 'services/user/user.service.js';
import { eventService } from 'services/event';
import { courseService } from 'services/course';





const routes = (
  <Route component={App}>
    <Route path='/' component={LoginView} />
    <Route path='/home' component={CalendarView} />
    <Route path="*" component={NotFound} />
  </Route>
);

class App extends React.Component{
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount(){
    userService.getUser().subscribe(user => {
      console.log("User",user);
      eventService.refresh();
      console.log("Course Service refresh");
      courseService.refresh();
      courseService.getUserCourses().subscribe(c => {
        console.log(c);
      });
      if(user && browserHistory.getCurrentLocation().pathname == "/"){
        browserHistory.push("/home");
      }else if(!user){
        browserHistory.push("/")
      }
      this.setState(Object.assign(this.state,{
        user: user
      }));
    });
  }
  render() {
    let nav = this.state.user ? <NavBar currentUser={this.state.user} /> : null;
    return (
      <div>
        {nav}
        <Router history={browserHistory}>
          {routes}
        </Router>
      </div>
    )
  }
}


render(
    <App />,
    document.getElementById("app")
);
