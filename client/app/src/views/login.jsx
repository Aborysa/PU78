import React from "react";
import {Col, Image, Jumbotron, Button, Glyphicon} from "react-bootstrap"


export class LoginView extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Jumbotron className="text-center">
          <Col md={10} mdOffset={1}>
        	   <Image className="logoOverlay" src="assets/images/logo.png" responsive/>
          </Col>
          <Col md={8} mdOffset={2}>
          	<p>Studynator hjelper deg å strukturere skoledagene dine, og gir deg mulighet til å fokusere på skolearbeid</p>
          	<p>Logg inn via Feide nå, for å gjøre livet ditt strukturert</p>
            <p>Building does in fact work!</p>
          	<Button href="/api/v1/login" bsStyle="primary" bsSize="large"><Glyphicon glyph="user" /> Logg inn</Button>
          </Col>
        </Jumbotron>
        <ul className="cb-slideshow">
          <li>
            <span>Image 01</span>
            <div>
              <h3></h3>
            </div>
          </li>
          <li>
            <span>Image 02</span>
            <div>
              <h3></h3>
            </div>
          </li>
          <li>
            <span>Image 03</span>
            <div>
              <h3></h3>
            </div>
          </li>
          <li>
            <span>Image 04</span>
            <div>
              <h3></h3>
            </div>
          </li>
          <li>
            <span>Image 05</span>
            <div>
              <h3></h3>
            </div>
          </li>
          <li>
            <span>Image 06</span>
            <div>
              <h3></h3>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
