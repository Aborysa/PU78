import React, { Component } from 'react';

import moment from 'moment';


export class Calendar extends React.Component {

  componentDidMount(){
    const { calendar } = this.refs;

    $(calendar).fullCalendar({events: this.props.events});
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }

}
