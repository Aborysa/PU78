



export const jsonToEvent = (data) => {
  return new Event(
    data.idEvents,
    data.eventTitle,
    new Date(data.eventStart),
    new Date(data.eventEnd),
    data.eventDesc,
    true
  );
}

export const calendarToEvent = (o) => {
  return new Event(
    o.id,
    o.title,
    o.start.format('YYYY/MM/DD HH:mm:ss'),
    o.end.format('YYYY/MM/DD HH:mm:ss'),
    o.desc,
    o.editable
  )
}

export class Event{
  constructor(id,title,start,end,desc,editable,type){
    this._id = id;
    this._title = title;
    this._start = moment(start);
    this._end = moment(end);
    this._desc = desc;
    this._type = type;
    this._editable = editable;
  }
  set id(nid){
    if(this.id <= 0){
      this.id = nid;
    }
  }
  get id(){
    return this._id;
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
  get editable(){
    return this._editable;
  }
  get calendarEvent(){
    return {
      title: this.title,
      start: this.start,
      end: this.end,
      id: this.id,
      editable: this.editable,
      desc: this.desc,
      allDay: false//moment.duration(this.end - this.start).days() > 0
    }
  }
  get serverEvent(){
    return {
      title: this.title,
      desc: this.desc,
      startDate: this.start.format('YYYY/MM/DD HH:mm:ss'),
      endDate: this.end.format('YYYY/MM/DD HH:mm:ss')
    }
  }
  get patchEvent(){
    let sevent = this.serverEvent;
    sevent.id = this.id;
    return sevent;
  }
}
