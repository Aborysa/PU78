import React from "react";
import ReactDOM from 'react-dom';
import {Col, ButtonGroup, Button, Popover, Tooltip, Modal, OverlayTrigger, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';



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
    let map = this.state.showMap ?
    <iframe
      src="http://use.mazemap.com/embed.html?campusid=1&sharepoitype=poi&sharepoi=0800.1"
      width="100%"
      height="420"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      scrolling="no"
    /> :
    null;

    let mapButton = this.state.showMap ?
      <Button onClick={() => this.toggleOpenMap()} bsStyle="danger">Lukk Kart</Button>:
      <Button onClick={() => this.toggleOpenMap()} bsStyle="success">Vis Kart</Button>;


    return (
      <div>
        <Modal show={this.state.showEvent} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <h1>{this.props.event ? this.props.event.title : "None"}</h1>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <h3>Beskrivelse: </h3>
              <p>{this.props.event ? (this.props.event.desc || "Ingen beskrivelse gitt") : "None" }</p>
            </Form>
            <Form>
              <h3>Tidspunkt: </h3>
              <p>{this.props.event ? this.props.event.start.format('HH:mm:ss') : "None"}</p>
            </Form>
            {map}
          </Modal.Body>
          <Modal.Footer>
            {mapButton}
            <Button  onClick={() => this.close()} bsStyle="primary">Lukk</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};
