import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button} from 'react-bootstrap';

moment.locale('nb');
BigCalendar.momentLocalizer(moment);

var starttime = new Date(0, 0, 0, 8, 0, 0, 0);
var myEvents = [
  {'title': 'FUCK YEAH',
  'allDay': false,
  'start': new Date(2017,1,22,8),
  'end': new Date(2017,1,22,10)},
  {'title': 'Maybe',
  'allDay': false,
  'start': new Date(2017,1,22,12),
  'end': new Date(2017,1,22,14)},
  {'title': 'HELL NO',
  'allDay': false,
  'start': new Date(2017,1,23,8),
  'end': new Date(2017,1,23,10)}
];

require('style!css!react-big-calendar/lib/css/react-big-calendar.css');

export class CalendarView extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
          <BigCalendar style={{height: '600px'}} events={myEvents} views={['month', 'week', 'day']} defaultView={'week'} scrollToTime={starttime} />
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <ButtonGroup bsSize="small">
            <Button>Forelesning</Button>
            <Button>Øving</Button>
            <Button>Annet</Button>
          </ButtonGroup>
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <BigCalendar style={{height: '300px'}} events={myEvents} views={['agenda']} defaultView={'agenda'} toolbar={false} />
        </Col>
      </div>
    )
  }
}
