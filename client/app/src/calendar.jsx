import React from "react";
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';


moment.locale('nb');
BigCalendar.momentLocalizer(moment);

var starttime = new Date(0, 0, 0, 8, 0, 0, 0)
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
]

require('style!css!react-big-calendar/lib/css/react-big-calendar.css');

export class CalendarView extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
          <BigCalendar style={{height: '420px'}} events={myEvents} views={['month', 'week', 'day']} defaultView={'week'} scrollToTime={starttime} />
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
          <BigCalendar style={{height: '300px'}} events={myEvents} views={['agenda']} defaultView={'agenda'} toolbar={false} />
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
                  <FormControl type="text" placeholder="Tittel" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>
                  Beskrivelse
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="textarea" placeholder="Beskrivelse" maxLength="140"/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button bsStyle="Success">
                    Lagre
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} bsStyle="primary">Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
