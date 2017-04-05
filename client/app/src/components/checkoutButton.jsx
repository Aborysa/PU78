import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export class CheckoutButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checked: props.checked ? true : false
    }
  }
  handleClick(){
    this.setState(Object.assign({}, this.state, {
      checked: !this.state.checked
    }),() => {
      if(this.props.onChange)
        this.props.onChange(this.state.checked);    
    });

  }

  render(){
    return <Button active={this.state.checked} onClick={() => this.handleClick()}>{this.props.children}</Button>
  }
}
