import React, { Component } from 'react';
import moment from 'moment';
import { eventService, Event, calendarToEvent } from 'services/event';
import { BaseCalendar } from './baseCalendar.jsx';

require("style!css!fullcalendar/dist/fullcalendar.css");


export class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.disable_click = false;
  }

  eventChanged(event, jsEvent, ui, view){
    //When an event changes we need cascade the change
    eventService.updateEvent(event.id,calendarToEvent(event));
  }


  render() {
    return (
      <BaseCalendar
        editable={true}
        eventLimit={2}
        height={440}
        contentHeight= {440}
        aspectRatio= {0.5}
        scrollTime= '08:00:00'
        defaultView= "month"
        header= {{
          left:   'title',
          center: '',
          right:  'today prev,next month agendaDay agendaWeek'
        }}
        weekNumbers={true}
        navLinks={true}

        eventDragStart = {
          () => this.disable_click = true
        }
        eventResizeStart = {() => this.disable_click = true}
        eventDrop = {
          (event, jsEvent, ui, view) => {
            this.eventChanged(event, jsEvent, ui, view);
            this.disable_click = false;
          }
        }
        eventResize = {
          (event, jsEvent, ui, view) => {
            this.eventChanged(event, jsEvent, ui, view);
            this.disable_click = false;
          }
        }
        eventClick= {
          (event) => {
            if (!this.disable_click) this.props.eventClick(event.parent);
          }
        }
        events={this.props.events}
        />
    );
  }

}
