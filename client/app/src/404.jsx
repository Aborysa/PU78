import React from "react";
import {Col} from "react-bootstrap"


export class NotFound extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrap">
        <div className="banner">
          <img src="/app/assets/images/banner.png" alt="404 in a 404, wow dude...." />
        </div>
        <div className="page">
          <h2>Dude,we can't find that page!</h2>
          <h4>ooooooooooor, we just doesn't want to...</h4>
        </div>
        <div className="footer">
          <p>Brought to you by the Studynator team</p>
        </div>
      </div>
    )
  }
}
