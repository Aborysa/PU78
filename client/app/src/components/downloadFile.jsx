
import React, {Component} from 'react';

export class DownloadFile extends React.Component{
  
  constructor(props){
    super(props);
    this.sub = null;
  }

  componentWillReceiveProps(props){
    console.log(props.observer);
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.props.observer){
      this.sub = props.observer.subscribe(() => {
        this.refs.link.click();
      });
    }
  
  }


  render(){
    return (
      <span><a 
        ref="link"
        href={`data:text/plain;charset=utf-8,${encodeURIComponent(this.props.data)}`}
        download={this.props.name || "studynator-export.ics"}
        style={{display: this.props.show ? "inline" : "none"}}
      >{this.props.children}</a></span>
    );
  }
}