
import React from "react";
import { render } from "react-dom";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import { eventService } from '/services/event/event.service.js';

//let dateformat = moment();
//BigCalendar.momentLocalizer(dateformat.format("no"));
moment.locale('nb');

BigCalendar.momentLocalizer(moment);


require('style!css!react-big-calendar/lib/css/react-big-calendar.css')




class App extends React.Component{
  constructor() {
    super();
  }
  onComponentDidMount(){
    eventService.getEvents
  }
  render() {
    return (
      <BigCalendar style={{height: '420px'}} events={[]} />
    )
  }
}


render(
    <App />,
    document.getElementById("app")
);