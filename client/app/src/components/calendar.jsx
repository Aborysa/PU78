import React, { Component } from 'react';

import moment from 'moment';


export class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.init = false;
  }
  componentDidMount(){
    const { calendar } = this.refs;
    //Init calendar with jQuery
    $(calendar).fullCalendar({
      events: [],
      editable: true,
      defaultView: "agendaDay",
      header: {
        left:   'title',
        center: '',
        right:  'today prev,next month agendaDay agendaWeek'
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
    const { calendar } = this.refs;
    let eventDisplay = [];
    for(let e of nextProps.events){
      eventDisplay.push(e.calendarEvent);
    }

    $(calendar).fullCalendar('removeEvents');
    
    $(calendar).fullCalendar('addEventSource', eventDisplay);
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }

}
