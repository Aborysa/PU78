
import React from "react";
import { render } from "react-dom";
import {LoginView} from './login.jsx';
import {CalendarView} from './calendar.jsx';
import {NavBar} from './navBar.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class App extends React.Component{
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <NavBar />
        <Router history={browserHistory}>
          <Route path='/' component={LoginView} />
          <Route path='/home' component={CalendarView} />
        </Router>
      </div>
    )
  }
}


render(
    <App />,
    document.getElementById("app")
);
