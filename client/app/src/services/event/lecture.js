
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
  let rooms = [];
  
  for(let room of data.rooms){
    rooms.push(jsonToRoom(room));
  }
  return new Lecture(
    data.idLectures,
    data.idCourse_fkLectures,
    data.acronym,
    data.startTime,
    data.endTime,
    data.desc,
    data.weekDay,
    weeks,
    rooms
  );
}

export const jsonToRoom = (data) => {
  return new Room(
    data.syllabusKey,
    data.roomNr,
    data.roomName,
    data.buildingNr,
    data.floor,
    data.floorName,
    data.type
  )
}

let course_cache = {};
let mix_color = [200,200,200];



export class Room{
  constructor(syllabusKey,room,roomName,building,floor,floorName,type){
    this._syllabusKey = syllabusKey;
    this._room = room;
    this._roomName = roomName;
    this._building = building;
    this._floor = floor;
    this._floorName = floorName;
    this._type = type;
  }
  get floor(){
    return this._floorName;
  }
  get floorNr(){
    return this._floor;
  }
  get buildingNr(){
    return this._building;
  }
  get roomNr(){
    return this._room;
  }
  get type(){
    return this._type;
  }
  get room(){
    return this._roomName;
  }
  get name(){
    if(this.room)
      return `${this.type}: ${this.room}`;
    return `${this.type}`;
  }
  get mazeId(){
    return `${this.buildingNr}-${this.roomNr}`;
  }
}

export class Lecture{
  constructor(id,course,acronym,startTime,endTime,desc,day,weeks,rooms){
    this._id = id;
    this._course = course;
    this._acronym = acronym;
    this._startTime = moment(startTime,"hh:mm:ss");
    this._endTime = moment(endTime,"hh:mm:ss");
    this._desc = desc;
    this._type = "LECTURE";
    this._weekDay = day;
    this._weeks = weeks;
    if(!course_cache[course]){
      let c = [Math.random()*255,Math.random()*255,Math.random()*255];
      c[0] = Math.ceil((c[0] + mix_color[0])/2);
      c[1] = Math.ceil((c[1] + mix_color[1])/2);
      c[2] = Math.ceil((c[2] + mix_color[2])/2);
      course_cache[course] = c;
      mix_color = c;
    }
    this.rc = course_cache[course];
    this._rooms = rooms;
  }
  set id(nid){
    if(this.id <= 0){
      this.id = nid;
    }
  }
  get id(){
    return this._id;
  }
  get acronym(){
    return this._acronym;
  }
  get title(){
    return `${this._course}: ${this.desc}`;
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
  get rooms(){
    return this._rooms;
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
          backgroundColor: `rgb(${this.rc[0]},${this.rc[1]},${this.rc[2]})`,
          parent: this
        }
      );
    }
    return events;
  }

}
