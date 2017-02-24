import React from "react";
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker'
import {Event, eventService} from 'services/event';
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
  saveEvent(e) {
    let title = ReactDOM.findDOMNode(this.refs.title).value;
    let desc = ReactDOM.findDOMNode(this.refs.description).value;
    let startDate = this.refs.startDate.getValue();
    let endDate = this.refs.endDate.getValue();
    eventService.pushEvent(new Event(-1,title,new Date(), new Date(), desc));
    this.close();
  }
  render() {


    return (
      <div>
        <Button bsStyle="primary" bsSize="small" onClick={() => this.open()} className="pull-right">Legg til en hendelse</Button>

        <Modal show={this.state.showModal} onHide={() => this.close()}>
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
                  <FormControl ref="title" type="text" placeholder="Tittel" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>
                  Beskrivelse
                </Col>
                <Col sm={10}>
                  <FormControl ref="description" componentClass="textarea" placeholder="Beskrivelse" maxLength="140"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalStartDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Starttid
                </Col>
                <Col sm={10}>
                  <DateTimeField
                    ref="startDate" defaultText="Dato"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEndDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Sluttid
                </Col>
                <Col sm={10}>
                  <DateTimeField
                    ref="endDate" defaultText="Dato"/>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.saveEvent()} bsStyle="success">Save</Button>
            <Button onClick={() => this.close()} bsStyle="primary">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

class saveEventButton extends React.Component {
  handleClick() {


    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <Button bsStyle="" onClick={(e) => this.handleClick(e)}>
        {this.props.name}
      </Button>
    );
  }
}
