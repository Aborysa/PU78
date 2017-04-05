import React from "react";
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { eventService, Event, lectureService, Lecture } from 'services/event';
import { AddEventModal, ViewLectureModal } from 'components/modals';
import { Calendar } from 'components/calendar.jsx';
import { ListCalendar } from 'components/listCalendar.jsx';
import { courseService } from 'services/course';
import { CheckoutButton } from 'components/checkoutButton.jsx';


moment.locale('nb');
BigCalendar.momentLocalizer(moment);

var starttime = new Date(0, 0, 0, 8, 0, 0, 0);

require('style!css!bootstrap-datetime-picker/css/bootstrap-datetimepicker.css');

export class CalendarView extends React.Component{
  constructor(props) {
    super(props);
    this.filters = {
      ["FOR"]: {
        name: "Forelesning",
        test: (event) => {
          if(event instanceof Lecture)
            return event.acronym == "FOR";
          return false;
        }
      },
      ["FOR-OV"]: {
        name: "Øvingsforelesning",
        test: (event) => {
          if(event instanceof Lecture)
            return event.acronym == "F/Ø";
          return false;
        }
      },
      ["OV"]: {
        name: "Øving",
        test: (event) => {
          if(event instanceof Lecture)
            return event.acronym == "ØV" || event.acronym == "LAB";
          return false;
        }
      },
      ["PERSONAL"]: {
        name: "Egne aktiviteter",
        test: (event) => {
          return event instanceof Event;
        }
      }
    }
    this.state = {
      events: [],
      lectures: [],
      viewModalProps: {
        show: false
      },
      filterState: {}
    }
    for(let i in this.filters){
      this.state.filterState[i] = true;
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
  handleListFilterChange(filter,state){
    this.setState(Object.assign({}, this.state, {
      filterState: Object.assign(this.state.filterState, {
        [filter]: state
      }),
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
    let viewEventModal = <ViewLectureModal show={this.state.viewModalProps.show} event={this.state.viewModalProps.event}/>
    let events = this.state.events.concat(this.state.lectures);
    let listedEvents = events.slice().filter((event) => {
      for(let i in this.filters){
        let filter = this.filters[i];
        if(filter.test(event)){
          return this.state.filterState[i];
        }
      }
      return true;
    });
    let buttons = [];
    for(let i in this.filters){
      let v = this.filters[i];
      buttons.push(
        <CheckoutButton
          key={i}
          onChange={(state) => this.handleListFilterChange(i,state)}
          checked={this.state.filterState}
        >
          {v.name}
        </CheckoutButton>
      );
    }
    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
          <Calendar
            style={{height: '300px'}}
            events={events}
            eventClick={(event) => this.openViewEventModal(event)}
          />
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <AddEventModal />
          {viewEventModal}
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <hr className="sepCals"/>
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
          <ListCalendar
            events={listedEvents}
            toolbar={false}
            />
        </Col>
      </div>
    )
  }
}
