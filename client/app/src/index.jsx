
import React from "react";
import { render } from "react-dom";


class App extends React.Component{
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <span>Project Utvikling 2017</span>
      </div>
    )
  }
}


render(
    <App />,
    document.getElementById("app")
);