import React, { Component } from 'react';

import moment from 'moment';


require("style!css!fullcalendar/dist/fullcalendar.css");

export class ListCalendar extends React.Component {
  constructor(props){
    super(props);
    this.init = false;
  }
  componentDidMount(){
    const { listCalendar } = this.refs;
    //Init calendar with jQuery
    $(listCalendar).fullCalendar({
      events: [],
      editable: false,
      firstDay: 1,
      height: "auto",
      contentHeight: "auto",
      aspectRatio: "auto",
      defaultView: "listWeek",
      header: {
        left:   'title',
        center: '',
        right:  ''
      },
      eventDragStop: (event, jsEvent, ui, view) => this.eventChanged(event, jsEvent, ui, view),
      eventResizeStop: (event, jsEvent, ui, view) => this.eventChanged(event, jsEvent, ui, view)
    });
    this.init = true;
  }
  eventChanged(event, jsEvent, ui, view){
    console.log(event,jsEvent,ui,view);
  }
  componentWillReceiveProps(nextProps){
    const { listCalendar } = this.refs;
    let eventDisplay = [];
    for(let e of nextProps.events){
      for(let ce of e.calendarEvents){
        eventDisplay.push(ce);
      }
    }

    $(listCalendar).fullCalendar('removeEvents');

    $(listCalendar).fullCalendar('addEventSource', eventDisplay);
  }

  render() {
    return (
      <div ref='listCalendar'></div>
    );
  }

}
