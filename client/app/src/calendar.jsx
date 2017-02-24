import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker'


moment.locale('nb');
BigCalendar.momentLocalizer(moment);

var starttime = new Date(0, 0, 0, 8, 0, 0, 0)
var myEvents = [
  {'title': 'FUCK YEAH',
  'allDay': false,
  'start': new Date(2017,1,24,8),
  'end': new Date(2017,1,24,10)},
  {'title': 'Maybe',
  'allDay': false,
  'start': new Date(2017,1,25,12),
  'end': new Date(2017,1,25,14)},
  {'title': 'HELL NO',
  'allDay': false,
  'start': new Date(2017,1,25,8),
  'end': new Date(2017,1,25,10)}
]

require('style!css!react-big-calendar/lib/css/react-big-calendar.css');
require('style!css!react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css');

export class CalendarView extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
          <BigCalendar
             style={{height: '420px'}}
             events={myEvents}
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
            events={myEvents}
            views={['agenda']}
            defaultView={'agenda'}
            toolbar={false}
          />
        </Col>
      </div>
    )
  }
}

const AddEventModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

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
                    <DateTimeField id="StartDate" mode="date" defaultText="Dato"/>
                  </Col>
                  <Col sm={6}>
                    <DateTimeField id="StartTime" mode="time" defaultText="Starttidspunkt"/>
                  </Col>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEndDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Sluttid
                </Col>
                <Col sm={10}>
                  <Col sm={6}>
                    <DateTimeField id="EndDate" mode="date" defaultText="Dato"/>
                  </Col>
                  <Col sm={6}>
                    <DateTimeField id="EndTime" mode="time" defaultText="Sluttidspunkt"/>
                  </Col>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <saveEventButton name="Lagre"/>
            <Button onClick={this.close} bsStyle="primary">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

class saveEventButton extends React.Component {
  handleClick() {


    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <Button bsStyle="success" onClick={(e) => this.handleClick(e)}>
        {this.props.name}
      </Button>
    );
  }
}
