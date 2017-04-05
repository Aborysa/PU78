import React from "react";
import ReactDOM from 'react-dom';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {eventService} from 'services/event';



export class ViewLectureModal extends React.Component{
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
    let map = null;
    let mapButton = null;
    let rooms = [];
    if(this.props.event) {
      for(let room of this.props.event.rooms){
        rooms.push(
          <li
            key={room.sy}
          >
            {room.name}
          </li>
        );
      }
      map = (this.state.showMap && this.props.event.rooms.length > 0) ?
        <iframe
          src={`https://use.mazemap.com/?campusid=1&desttype=identifier&dest=${this.props.event.rooms[0].mazeId}`}
          width="100%"
          height="420"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          scrolling="no"
        /> :
        null;
      mapButton = this.state.showMap ?
        <Button onClick={() => this.toggleOpenMap()} bsStyle="danger">Lukk Kart</Button> :
        this.props.event.rooms.length > 0 ? 
          <Button onClick={() => this.toggleOpenMap()} bsStyle="success">Vis Kart</Button> :
          null;
    }

    return (
      <div>
        <Modal show={this.state.showEvent} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <h1>{this.props.event ? this.props.event.title : "None"}</h1>
          </Modal.Header>
          <Modal.Body>
            <p>Rom: 
              <ul>
                {rooms}
              </ul>
            </p>
            <p>Tidspunkt: {this.props.event ? `${this.props.event.start.format('HH:mm')} - ${this.props.event.end.format('HH:mm')}` : "None"}</p>
            {map}
          </Modal.Body>
          <Modal.Footer>
            {mapButton}
            <Button onClick={() => this.close()} bsStyle="primary">Lukk</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
