import React from "react";
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { eventService,Event } from 'services/event';
import { AddEventModal, ViewLectureModal } from 'components/modals';
import { Calendar } from 'components/calendar.jsx';

moment.locale('nb');
BigCalendar.momentLocalizer(moment);

var starttime = new Date(0, 0, 0, 8, 0, 0, 0);

require('style!css!react-big-calendar/lib/css/react-big-calendar.css');
require('style!css!react-datetime/css/react-datetime.css');

export class CalendarView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      viewModalProps: {
        show: false
      }
    }
  }

  openViewEventModal(event){
    this.setState(Object.assign(this.state,{
      viewModalProps: {
        show: true,
        event: event
      }
    }));
  }
  closeViewModal(){
    this.setState(Object.assign(this.state,{
      viewModalProps: {
        show: false
      }
    }));
  }
  componentDidMount(){
    eventService.getEvents().subscribe(events => {
      this.setState(Object.assign(this.state,{
        events: events
      }));
    });

  }


  render() {
    let viewEventModal = <ViewLectureModal show={this.state.viewModalProps.show} event={this.state.viewModalProps.event}/>

    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
        
          <Calendar />
          <AddEventModal />
          {viewEventModal}
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <hr className="sepCals"/>
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <ButtonGroup bsSize="small">
            <Button>Forelesning</Button>
            <Button>Øving</Button>
            <Button>Annet</Button>
          </ButtonGroup>
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <BigCalendar
            style={{height: '300px'}}
            events={this.state.events}
            views={['agenda']}
            defaultView={'agenda'}
            toolbar={false}
          />
        </Col>
      </div>
    )
  }
}
