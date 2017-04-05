import React, { Component } from 'react';

export class DateTimePicker extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const { picker } = this.refs;
		$(picker).datetimepicker({
			weekStart: 1,
			todayHighlight: true,
			fontAwesome: true,
			startDate: new Date()
		});
	}
  handleChange(text){
    this.props.onChange(text);
    console.log(text);
  }
	render(){
		return(
			<div className="input-append date" ref="picker" data-date="12-02-2012" data-date-format="dd/mm/yyyy hh:ii">
				<input onChange={(v)=>this.handleChange(v)} className="form-control" size="16" type="text"/>
				<span className="add-on"><i className="icon-th"></i></span>
			</div>
		)
	}
}