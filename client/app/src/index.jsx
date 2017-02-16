
import React from "react";
import { render } from "react-dom";
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

BigCalendar.momentLocalizer(moment)

moment.locale('nb');

require('style!css!react-big-calendar/lib/css/react-big-calendar.css')

class App extends React.Component{
  constructor() {
    super()
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