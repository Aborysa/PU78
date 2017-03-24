import React, { Component } from 'react';

import moment from 'moment';

import { eventService, Event, calendarToEvent } from 'services/event';

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
      firstDay: 1,
      defaultView: "agendaDay",
      header: {
        left:   'title',
        center: '',
        right:  'today prev,next month agendaDay agendaWeek'
      },
      eventDrop: (event, jsEvent, ui, view) => this.eventChanged(event, jsEvent, ui, view),
      eventResize: (event, jsEvent, ui, view) => this.eventChanged(event, jsEvent, ui, view),
      dayClick: (date,jsEvent,view) => {
        //We only want the day number to change date
        if($(jsEvent.target).hasClass("fc-day-number"))
          this.selectDate(date,jsEvent,view);

      }
    });
    this.init = true;
  }
  eventChanged(event, jsEvent, ui, view){
    eventService.updateEvent(event.id,calendarToEvent(event));
  }
  selectDate(date,jsEvent,view){
    console.log("event",jsEvent);
    const { calendar } = this.refs;
    $(calendar).fullCalendar('changeView', 'agendaDay')
    $(calendar).fullCalendar('gotoDate',date);
  }

  componentWillReceiveProps(nextProps){
    const { calendar } = this.refs;
    let eventDisplay = [];
    for(let e of nextProps.events){
      eventDisplay.push(e.calendarEvent);
    }
    $(calendar).fullCalendar('removeEvents')
    $(calendar).fullCalendar('addEventSource', eventDisplay);
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }

}
