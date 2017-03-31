import React from "react";


export class NotFound extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrap">
        <div className="banner">
          <img src="/assets/images/banner.png" alt="404 in a 404, wow dude...." />
        </div>
        <div className="page">
          <h2>Vi kan ikke finne siden du ser etter!</h2>
          <h4>Eller så gidder vi ikke...</h4>
        </div>
        <div className="footer">
          <p>Vennlig hilsen Studynator-teamet</p>
        </div>
      </div>
    )
  }
}
