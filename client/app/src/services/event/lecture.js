
import moment from 'moment';




export const jsonToLecture = (data) => {
  let weeks = [];
  data.weeks.split(",").forEach(v => {
    let sub = v.split("-");
    let s = parseInt(sub[0]);
    let e = parseInt(sub[1] || sub[0]);
    for(let i=s; i <= e; i++){
      weeks.push(i);
    }
  });
  
  return new Lecture(
    data.idLectures,
    data.idCourse_fkLectures,
    data.acronym,
    data.startTime,
    data.endTime,
    data.desc,
    data.weekDay,
    weeks
  );
}


export class Lecture{
  constructor(id,course,acronym,startTime,endTime,desc,day,weeks){
    this._id = id;
    this._course = course;
    this._acronym = acronym;
    this._startTime = moment(startTime,"hh:mm:ss");
    this._endTime = moment(endTime,"hh:mm:ss");
    this._desc = desc;
    this._type = "LECTURE";
    this._weekDay = day;
    this._weeks = weeks;
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
    return `${this._course}: ${this._acronym}`;
  }
  get start(){
    return this._startTime;
  }
  get end(){
    return this._endTime;
  }
  get desc(){
    return this._desc;
  }
  get editable(){
    return false;
  }
  get calendarEvents(){
    let events = [];
    for(let w of this._weeks){
      let s = moment().day(this._weekDay).week(w).set({
        hour: this.start.get('hour'),
        minute: this.start.get('minute'),
        second: this.start.get('second')
      });
      let e = moment().day(this._weekDay).week(w).set({
        hour: this.end.get('hour'),
        minute: this.end.get('minute'),
        second: this.end.get('second')
      });
      events.push(
        {
          title: this.title,
          start: s,
          end: e,
          id: this.id,
          editable: this.editable,
          desc: this.desc,
          type: this._type,
          backgroundColor: "orange",
          parent: this
        }
      );
    }
    return events;
  }
  
}
