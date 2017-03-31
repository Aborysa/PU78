import React, { Component } from 'react';
import { BaseCalendar } from './baseCalendar.jsx';
import moment from 'moment';


require("style!css!fullcalendar/dist/fullcalendar.css");

export class ListCalendar extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <BaseCalendar
        editable={false}
        height= "auto"
        contentHeight= "auto"
        aspectRatio= "auto"
        defaultView= "listWeek"
        header= {{
          left:   'title',
          center: '',
          right:  ''
        }}
        events={this.props.events}
      />
    );
  }

}
