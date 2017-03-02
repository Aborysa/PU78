
import React from "react";
import { render } from "react-dom";

import {LoginView} from './login.jsx';
import {CalendarView} from './calendar.jsx';
import {NavBar} from './navBar.jsx';
import {NotFound} from './404.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import { userService } from 'services/user/user.service.js';


class App extends React.Component{
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount(){
    userService.getUser().subscribe(user => {
      console.log(user);
      if(user && browserHistory.getCurrentLocation().pathname == "/"){
        browserHistory.push("/home");
      }else if(!user){
        browserHistory.push("/")
      }
      this.setState(Object.assign(this.state,{
        user: user
      }))
    });
  }
  onComponentDidMount(){
    eventService.getEvents
  }
  render() {
    let nav = this.state.user ?   <NavBar currentUser={this.state.user} /> : null;
    return (
      <div>
        {nav}
        <Router history={browserHistory}>
          <Route path='/' component={LoginView} />
          <Route path='/home' component={CalendarView} />
          <Route path="*" component={NotFound} />
        </Router>
      </div>
    )
  }
}


render(
    <App />,
    document.getElementById("app")
);
