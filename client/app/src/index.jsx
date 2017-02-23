
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
  }
  onComponentDidMount(){
    userService.getUser().subscribe(user => {
      console.log("1234");
    });
  }
  render() {
    return (
      <div>
        <NavBar />
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
