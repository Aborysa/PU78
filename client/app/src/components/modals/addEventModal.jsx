import React from "react";
import ReactDOM from 'react-dom';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { eventService,Event } from 'services/event';


export class AddEventModal extends React.Component{
  constructor(props){
    super(props);
    this.state = this.getInitialState();
    this.pstart = null;
    this.pend = null;
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  getInitialState() {
    return {
      isRepete: false,
      showModal: false,
     };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(Object.assign({},this.state),{
      [name]: value
    });
  }

  close() {
    this.setState({ showModal: false });
  }
  set start(v){
    this.pstart = moment(v);
  }
  set end(v){
    this.pend = moment(v);
  }
  open() {
    this.setState({ showModal: true });
  }
  saveClick(e){
    let title = ReactDOM.findDOMNode(this.refs.title).value;
    let desc = ReactDOM.findDOMNode(this.refs.desc).value;
    let start = this.pstart;
    let end = this.pend;
    if (this.inputValidation(title, desc, start, end)){
      let event = new Event(-1,title, start, end, desc, true, "personal");
      eventService.pushEvent(event);
      this.close();
    }else{
      console.log("failed");
    }

  }
  inputValidation(title, desc, start, end){
    let valDuration = false;
    let valText = false;
    let valStart = false;
    let valEnd = false;
    let text ="";

    if(title && desc){ valText = true;}
    else{text += "Skriv inn både Tittel og Beskrivelse \n";}

    if(!start){ text += "Fyll inn Starttid \n"}
    else{ valStart = true;}

    if(!end){ text += "Fyll inn Sluttid \n";}
    else{ valEnd = true;}

    if(start < end){ valDuration=true;}
    else{
      if(!valStart && !valEnd){}
      else{text += "Sluttid kan ikke være før Starttid \n";}
    }

    if(valDuration && valText && valStart && valEnd)
      return true;
    else
      $.notify(text,{type: 'danger', z_index: 10000, placement: {align: "center"}});
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
                  <FormControl ref="title" type="text" placeholder="Tittel" required={true}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalDescription">
                <Col componentClass={ControlLabel} sm={2}>
                  Beskrivelse
                </Col>
                <Col sm={10}>
                  <FormControl ref="desc" componentClass="textarea" placeholder="Beskrivelse" maxLength="140" required={true}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalStartDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Starttid
                </Col>
                <Col sm={4}>
                  <Datetime onChange={(v) => this.start = v} ref="start" readOnly={true} required={true}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalEndDate">
                <Col componentClass={ControlLabel} sm={2}>
                  Sluttid
                </Col>
                <Col sm={4}>
                  <Datetime onChange={(v) => this.end = v} ref="end" required={true}/>
                </Col>
              </FormGroup>
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
