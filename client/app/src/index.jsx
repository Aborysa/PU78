
import React from "react";
import { render } from "react-dom";

import {LoginView} from './login.jsx';
import {CalendarView} from './calendar.jsx';
import {NavBar} from './navBar.jsx';
import {NotFound} from './404.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class App extends React.Component{
  constructor() {
    super();
  }
  onComponentDidMount(){
    eventService.getEvents
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
