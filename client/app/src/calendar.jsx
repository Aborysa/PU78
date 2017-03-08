import React from "react";
import ReactDOM from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { eventService,Event } from 'services/event';

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
    let viewEventModal = <ViewEventModal show={this.state.viewModalProps.show} event={this.state.viewModalProps.event}/>

    return (
      <div>
        <Col xs={12} md={10} mdOffset={1}>
          <BigCalendar
             style={{height: '650px'}}
             events={this.state.events}
             views={['month', 'week', 'day']}
             defaultView={'week'}
             popup={true}
             scrollToTime={starttime}
             onSelectEvent={(e) => this.openViewEventModal(e)}
             onSelectSlot={(slotInfo) => alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}`)}
          />
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

class AddEventModal extends React.Component{
  constructor(props){
    super(props);
    this.state = this.getInitialState();
    this.pstart = new Date();
    this.pend = new Date();
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  getInitialState() {
    return {
      isRepete: false,
      showModal: false
     };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  close() {
    this.setState({ showModal: false });
  }
  set start(v){
    this.pstart = v;
  }
  set end(v){
    this.pend = v;
  }
  open() {
    this.setState({ showModal: true });
  }
  saveClick(e){
    let title = ReactDOM.findDOMNode(this.refs.title).value;
    let desc = ReactDOM.findDOMNode(this.refs.desc).value;
    let start = this.pstart.toDate();
    let end = this.pend.toDate();
    eventService.pushEvent(new Event(-1,title,start,end,desc,true));
    this.close();
  }
  render() {
    let endRepete = this.state.isRepete ?
      <FormGroup controlId="formHorizontalRepeteEnd">
        <Col componentClass={ControlLabel} sm={2}>
          Avslutt repetisjon
        </Col>
        <Col sm={4}>
          <Datetime onChange={(v) => this.end = v} ref="repetitionEnd" />
        </Col>
      </FormGroup> :
      null;

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
                  <FormControl ref="title" type="text" placeholder="Tittel"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>
                  Beskrivelse
                </Col>
                <Col sm={10}>
                  <FormControl ref="desc" componentClass="textarea" placeholder="Beskrivelse" maxLength="140"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalStartDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Starttid
                </Col>
                <Col sm={4}>
                  <Datetime onChange={(v) => this.start = v} ref="start" readOnly={true}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEndDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Sluttid
                </Col>
                <Col sm={4}>
                  <Datetime onChange={(v) => this.end = v} ref="end" />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalRepeteToggle">
                <Col componentClass={ControlLabel} sm={2}>
                  Ukentlig repetisjon
                </Col>
                <Col sm={1}>
                  <input
                    name="isRepete"
                    type="checkbox"
                    checked={this.state.isRepete}
                    onChange={this.handleInputChange} />
                </Col>
              </FormGroup>
              {endRepete}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.saveClick()} bsStyle="success">Lagre</Button>
            <Button onClick={() => this.close()} bsStyle="primary">Lukk</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

class ViewEventModal extends React.Component{
  constructor(props){
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState(){
    return { showEvent: false };
  }
  close(){
    this.setState({ showEvent: false });
  }
  open(){
    this.setState({ showEvent: true });
  }
  toggle(){
    this.setState({ showEvent: !this.state.showEvent });
  }

  componentWillReceiveProps(props){
    this.setState({ showEvent: props.show});
  }

  componentDidMount(){
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showEvent} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <h1>{this.props.event ? this.props.event.title : "None"}</h1>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <h3>Fag: </h3>
              <p>testtesttest</p>
            </Form>
            <Form>
              <h3>Rom: </h3>
              <p>fagfagfagfagfag</p>
            </Form>
            <Form>
              <h3>Tidspunkt: </h3>
              <p>Tidtiditditid</p>
            </Form>
            <iframe
              src="http://use.mazemap.com/embed.html?https://use.mazemap.com/?v=1&campusid=1&left=10.4021537&right=10.4107368&top=63.4171325&bottom=63.4147558&zlevel=-1&sharepoitype=poi&sharepoi=2036&utm_medium=longurl"
              width="100%"
              height="420"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              scrolling="no">
            </iframe>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success">Vis Kart</Button>
            <Button  onClick={() => this.close()} bsStyle="primary">Lukk</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
