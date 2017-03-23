import React, { Component } from 'react';

import moment from 'moment';


export class Calendar extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const { calendar } = this.refs;
    //Init calendar with jQuery
    $(calendar).fullCalendar({
      events: [
        {
          title  : 'event1',
          start  : moment(new Date())
        }
      ]
    });
  }

  componentWillReceiveProps(nextProps){
    const { calendar } = this.refs;
    $(calendar).fullCalendar('updateEvents',nextProps.events);
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }

}
