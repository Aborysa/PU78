
import React from "react";
import { render } from "react-dom";

import { LoginView, CalendarView, NotFound } from './views';
import { NavBar } from './components/navBar.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

import { userService } from 'services/user/user.service.js';
import { eventService } from 'services/event';


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
