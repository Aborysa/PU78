import React from "react";
import ReactDOM from 'react-dom';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {eventService} from 'services/event';



export class ViewEventModal extends React.Component{
  constructor(props){
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState(){
    return {
      showEvent: false,
      showMap: false
     };
  }
  close(){
    this.setState({
      showEvent: false,
      showMap: false
     });
     if(this.props.onClose){
       this.props.onClose();
     }
  }
  open(){
    this.setState({ showEvent: true });
  }
  delete(){
    eventService.deleteEvent(this.props.event);
    this.close();
  }
  toggle(){
    this.setState({ showEvent: !this.state.showEvent });
  }

  componentWillReceiveProps(props){
    this.setState({ showEvent: props.show});
  }

  componentDidMount(){
  }

  toggleOpenMap(){
    this.setState({ showMap: !this.state.showMap });
  }

  render() {

    return (
      <div>
        <Modal show={this.state.showEvent} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <h1>{this.props.event ? this.props.event.title : "None"}</h1>
          </Modal.Header>
          <Modal.Body>
            <h3>Beskrivelse: </h3>
            <p>{this.props.event ? (this.props.event.desc || "Ingen beskrivelse gitt") : "None" }</p>
            <h3>Tidspunkt: </h3>
            <p>{this.props.event ? this.props.event.start.format('HH:mm:ss') : "None"}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()} bsStyle="primary">Lukk</Button>
            <Button onClick={() => this.delete()} bsStyle="danger">Slett hendelse</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
