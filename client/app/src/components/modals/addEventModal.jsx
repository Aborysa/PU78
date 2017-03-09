import React from "react";
import ReactDOM from 'react-dom';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { eventService,Event } from 'services/event';


export class AddEventModal extends React.Component{
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
