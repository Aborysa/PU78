import { Event, jsonToEvent } from "./event.js";
import moment from 'moment';


test('Creates an Event from a json object', () => {
  let source = {
    idEvents: 1,
    eventTitle: "This is a test",
    eventStart: "2017/03/28 08:00:00",
    eventEnd: "2017/03/29 08:00:00",
    eventDesc: "This event is in end of march"
  }
  let event = jsonToEvent(source);
  expect(event.id).toBe(source.idEvents);
  expect(event.title).toBe(source.eventTitle);
  expect(event.desc).toBe(source.eventDesc);
  expect(event.start).toEqual(moment(new Date(source.eventStart)));
  expect(event.end).toEqual(moment(new Date(source.eventEnd)));
});