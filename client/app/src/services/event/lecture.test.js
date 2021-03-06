import { Lecture, jsonToLecture, jsonToRoom } from "./lecture.js";
import moment from 'moment';

jest.autoMockOff();


test('Creates a Lecture from a json object', () => {
  let roomSource = {
    "syllabusKey": "360CU1-101",
    "roomName": "R1",
    "floor": 14,
    "roomNr": "CU1-101",
    "buildingNr": "360",
    "floorName": "Del C U1",
    "type": "Auditorium felles"
  };
  let source = {
    idLectures: 0,
    idCourse_fkLectures: "testCourse",
    acronym: "testC",
    startTime: "12:00:00",
    endTime: "13:00:00",
    desc: "This is a test",
    weekDay: "2",
    weeks: "1-2,4-6",
    rooms: [roomSource]
  };
  let room = jsonToRoom(roomSource);
  let lecture = jsonToLecture(source);
  expect(lecture.id).toBe(source.idLectures);
  expect(lecture.acronym).toBe(source.acronym);
  expect(lecture.title).toEqual(`${source.idCourse_fkLectures}: ${source.desc}`);
  expect(lecture.start).toEqual(moment(source.startTime,"hh:mm:ss"));
  expect(lecture.end).toEqual(moment(source.endTime,"hh:mm:ss"));
  expect(lecture.editable).toEqual(false);
  expect(lecture.rooms).toEqual([room]);
  expect(lecture.weeks).toEqual([1,2,4,5,6]);
  lecture.id = 1;
  expect(lecture.id).toBe(1);
  //Test iceEvents
  let iceEvents = lecture.iceEvents;
  expect(iceEvents).toHaveLength(lecture.weeks.length);
  //Test calendarEvents
  let calendarEvents = lecture.calendarEvents;
  expect(calendarEvents).toHaveLength(lecture.weeks.length);
});

test('Creates a room from a json object',()=>{
  let roomSource = {
    "syllabusKey": "360CU1-101",
    "roomName": "R1",
    "floor": 14,
    "roomNr": "CU1-101",
    "buildingNr": "360",
    "floorName": "Del C U1",
    "type": "Auditorium felles"
  };
  let room = jsonToRoom(roomSource);
  expect(room.floor).toBe(roomSource.floorName);
  expect(room.floorNr).toBe(roomSource.floor);
  expect(room.buildingNr).toBe(roomSource.buildingNr);
  expect(room.roomNr).toBe(roomSource.roomNr);
  expect(room.room).toBe(roomSource.roomName);
  expect(room.type).toBe(roomSource.type);
  expect(room.name).toEqual(`${roomSource.type}: ${roomSource.roomName}`);
  expect(room.mazeId).toEqual(`${roomSource.buildingNr}-${roomSource.roomNr}`);
  
  //Test room without name
  let roomWithoutName = {
    "syllabusKey": "360CU1-101",
    "floor": 14,
    "roomNr": "CU1-101",
    "buildingNr": "360",
    "floorName": "Del C U1",
    "type": "Auditorium felles"
  };
  room = jsonToRoom(roomWithoutName);
  expect(room.type).toBe(roomWithoutName.type);  
  expect(room.name).toEqual(`${room.type}`);
});