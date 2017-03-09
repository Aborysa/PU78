



export const jsonToEvent = (data) => {
  return new Event(
    data.idEvent,
    data.eventTitle,
    new Date(data.eventStart),
    new Date(data.eventEnd),
    data.eventDesc,
    false,
    data.eventType
  );
}


export class Event{
  constructor(id,title,start,end,desc,editable,type){
    this._id = id;
    this._title = title;
    this._start = start;
    this._end = end;
    this._desc = desc;
    this._type = type;
    this._editable = editable;
  }
  get id(){
    return this.id;
  }
  get title(){
    return this._title;
  }
  get start(){
    return this._start;
  }
  get end(){
    return this._end;
  }
  get desc(){
    return this._desc;
  }
  canEdit(){
    return this._editable;
  }
  get calendarEvents(){
    return [{
      title: this.title,
      start: this.start,
      end: this.end,
      desc: this.desc
    }];
  }
  get serverEvent(){
    return {
      title: this.title,
      desc: this.desc,
      startDate: this.start.toISOString(),
      endDate: this.end.toISOString()
    }
  }
}

export class WeeklyEvent extends Event{
  constructor(id,title,start,end,desc,editable,type,weekdays){
    super(id,title,start,end,desc,editable,type);
    this._calendarEvents = [];
    
  }
}