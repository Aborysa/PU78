import { Lecture, jsonToLecture, jsonToRoom } from "./lecture.js";
import moment from 'moment';

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
    weekday: "2",
    weeks: "1-2,4-6",
    rooms: [roomSource]
  };
  let lecture = jsonToLecture(source);
  let rooms = jsonToRoom(roomSource);
  expect(lecture.id).toBe(source.idLectures);
  expect(lecture.acronym).toBe(source.acronym);
  expect(lecture.title).toEqual(`${source.idCourse_fkLectures}: ${source.desc}`);
  expect(lecture.start).toEqual(moment(source.startTime,"hh:mm:ss"));
  expect(lecture.end).toEqual(moment(source.endTime,"hh:mm:ss"));
  expect(lecture.editable).toEqual(false);
  expect(lecture.rooms).toEqual([rooms]);
  lecture.id = 1;
  expect(lecture.id).toBe(1);
});