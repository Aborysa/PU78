import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {Datetime} from 'react-datetime'

import { eventService,Event } from 'services/event';

moment.locale('nb');
BigCalendar.momentLocalizer(moment);

var starttime = new Date(0, 0, 0, 8, 0, 0, 0);

require('style!css!react-big-calendar/lib/css/react-big-calendar.css');
require('style!css!react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css');

export class CalendarView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }
  componentDidMount(){
    eventService.getEvents().subscribe(events => {
      this.setState(Object.assign(this.state,{
        events: events
      }));
    });

  }

  render() {
    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
          <BigCalendar
             style={{height: '420px'}}
             events={this.state.events}
             views={['month', 'week', 'day']}
             defaultView={'week'}
             scrollToTime={starttime}
             onSelectEvent={event => alert(event.title)}
             onSelectSlot={(slotInfo) => alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}`)}
          />
          <AddEventModal/>
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

class AddEventModal extends React.Component{
  constructor(props){
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }
  saveClick(e){
    console.log(e);
  }
  render() {

    return (
      <div>
        <Button bsStyle="primary" bsSize="small" onClick={this.open} className="pull-right">Legg til en hendelse</Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Ny hendelse</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalTitle">
                <Col componentClass={ControlLabel} sm={2}>
                  Tittel
                </Col>
                <Col sm={10}>
                  <FormControl id="Title" type="text" placeholder="Tittel" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>
                  Beskrivelse
                </Col>
                <Col sm={10}>
                  <FormControl id="Decsription" componentClass="textarea" placeholder="Beskrivelse" maxLength="140"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalStartDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Starttid
                </Col>
                <Col sm={10}>
                  <Col sm={6}>
                    <Datetime id="StartDate"  placeholder="Dato"/>
                  </Col>
                  <Col sm={6}>
                    <Datetime id="StartTime" placeholder="Starttidspunkt"/>
                  </Col>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEndDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Sluttid
                </Col>
                <Col sm={10}>
                  <Col sm={6}>
                    <Datetime id="EndDate" placeholder="Dato"/>
                  </Col>
                  <Col sm={6}>
                    <Datetime id="EndTime" placeholder="Sluttidspunkt"/>
                  </Col>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <saveEventButton onClick={(e) => this.saveClick(e)} name="Lagre"/>
            <Button onClick={this.close} bsStyle="primary">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

class saveEventButton extends React.Component {

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <Button bsStyle="success" onClick={(e) => this.props.onClick(e)}>
        {this.props.name}
      </Button>
    );
  }
}
