import React, { Component } from 'react';

import moment from 'moment';

import { eventService, Event, calendarToEvent } from 'services/event';

require("style!css!fullcalendar/dist/fullcalendar.css");


export class BaseCalendar extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const { calendar } = this.refs;
    //Init calendar with jQuery
    $(calendar).fullCalendar({
      //No events initially
      events: [],
      //Lets us move events, some events like lectures will have this disabled
      editable: this.props.editable,
      //first day set to 1 (monday American standard)
      firstDay: 1,
      eventLimit: this.props.eventLimit,
      height:this.props.height,
      contentHeight: this.props.contentHeight,
      aspectRatio: this.props.aspectRatio,
      scrollTime: this.props.scrollTime,
      defaultView: this.props.defaultView,
      //Sets the header of the calendar
      header: this.props.header,
      //We want to display week numbers
      weekNumbers: this.props.weekNumbers,
      //Enable user to click on specific dates and weeks in month and week view
      navLinks: this.props.navLinks,
      //Set up event handling for both resizing events and moving them around
      eventDragStart: this.props.eventDragStart,
      eventResizeStart: this.props.eventResizeStart,
      eventDrop: this.props.eventDrop,
      eventResize: this.props.eventResize,
      eventClick: this.props.eventClick
    });
  }

  selectDate(date,jsEvent,view){
    //Helper method for selecting a specific date
    const { calendar } = this.refs;
    $(calendar).fullCalendar('changeView', 'agendaDay')
    $(calendar).fullCalendar('gotoDate',date);
  }

  selectWeek(week){
    //Helper method for selecting a specific week
    const { calendar } = this.refs;
    $(calendar).fullCalendar('changeView', 'agendaWeek')
    $(calendar).fullCalendar('gotoDate',moment().day('Monday').week(week));
  }

  componentWillReceiveProps(nextProps){
    //When events change we need to make sure changes are reflected visually in the calendar
    const { calendar } = this.refs;
    let eventDisplay = [];
    for(let e of nextProps.events){
      for(let ce of e.calendarEvents){
        eventDisplay.push(ce);
      }
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
