import React from "react";
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { eventService,Event, lectureService, Lecture } from 'services/event';
import { AddEventModal, ViewLectureModal, ViewEventModal } from 'components/modals';
import { Calendar } from 'components/calendar.jsx';
import { ListCalendar } from 'components/listCalendar.jsx';
import { courseService } from 'services/course';


moment.locale('nb');
BigCalendar.momentLocalizer(moment);

var starttime = new Date(0, 0, 0, 8, 0, 0, 0);

require('style!css!react-datetime/css/react-datetime.css');

export class CalendarView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      lectures: [],
      viewEventModalProps: {
        show: false
      },
      viewLectureModalProps: {
        show: false
      }
    }
  }

  openViewEventModal(event){
    this.setState(Object.assign(this.state,{
      viewEventModalProps: {
        show: true,
        event: event
      }
    }));
  }
  openViewLectureModal(lecture){
    this.setState(Object.assign(this.state,{
      viewLectureModalProps: {
        show: true,
        event: lecture
      }
    }));
  }
  closeViewLectureModal(){
    this.setState(Object.assign(this.state,{
      viewLectureModalProps: {
        show: false
      }
    }));
  }
  closeViewEventModal(){
    this.setState(Object.assign(this.state,{
      viewEventModalProps: {
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
    courseService.getUserCourses().subscribe(courses => {
      let allLectures = [];
      let count = 0;
      for(let course of courses){
        count++;
        lectureService.getLectures(course.id).subscribe(lectures => {
          for(let lecture of lectures){
            allLectures.push(lecture);
          }
          count--;
          if(count <= 0){
            this.setState(Object.assign(this.state,{
              lectures: allLectures
            }));
          }
        });
      }
      if(count <= 0){
        this.setState(Object.assign(this.state,{
          lectures: allLectures
        }));
      }
    });
  }


  render() {
    let viewLectureModal = <ViewLectureModal 
      show={this.state.viewLectureModalProps.show}
      event={this.state.viewLectureModalProps.event} 
      onClose={() => this.closeViewLectureModal()} />;
    
    let viewEventModal = <ViewEventModal 
      show={this.state.viewEventModalProps.show}
      event={this.state.viewEventModalProps.event}
      onClose={() => this.closeViewEventModal()} />;

    let events = this.state.events.concat(this.state.lectures);
    
    let modalMap = {
      [Event]: (...a) => this.openViewEventModal(...a),
      [Lecture]: (...a) => this.openViewLectureModal(...a)
    };
    
    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
          <Calendar
            style={{height: '300px'}}
            events={events}
            eventClick={(event) => {modalMap[event.constructor](event)}}
          />
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <AddEventModal />
          {viewEventModal}
          {viewLectureModal}
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
          <ListCalendar
            events={events}
            toolbar={false}
            />
        </Col>
      </div>
    )
  }
}
