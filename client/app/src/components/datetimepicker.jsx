import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

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
		}).on('changeDate',(ev)=>{
			this.handleChange(ev.date)
		});

	}

  handleChange(text){
    this.props.onChange(text);
    console.log(text);
  }
	render(){
		return(
			<div className="input-append date" ref="picker" data-date="12-02-2012" data-date-format="dd/mm/yyyy hh:ii">
				<div className="input-group mb-2 mr-sm-2 mb-sm-0">
					<input className="form-control" size="16" type="text" readOnly/>
					<span className="input-group-addon"><Glyphicon glyph="th"/></span>
				</div>
			</div>
		)
	}
}
