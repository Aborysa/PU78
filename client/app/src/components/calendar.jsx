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
      defaultView: "month",
      header: {
        left:   'title',
        center: '',
        right:  'today prev,next month agendaDay agendaWeek'
    }
    });
    this.init = true;
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
