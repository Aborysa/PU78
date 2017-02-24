import React from "react";
import {Col, Image} from "react-bootstrap"


export class LoginView extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Col>
        <h1>Welcome to the beautiful World of:</h1>
          <Col xs={12} sm={12} md={5}>  
            <Image src="assets/images/logo.png" responsive/>
          </Col>
      </Col>
    )
  }
}
