import React, { Component } from 'react';

export class DateTimePicker extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		const { .picker } = this.refs;
		$(picker).datetimepicker();
	}
	render(){
		return(
			<div className="input-append date" ref="picker" dataDate="12-02-2012" dataDateFormat="dd/mm/yyyy hh:ii">
				<input size="16" type="text" value="12-02-2012" readonly/>
				<span className="add-on"><i className="icon-th"></i></span>
			</div>
		)
	}
}