import { Event, jsonToEvent, calendarToEvent } from "./event.js";
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
  expect(event).toBeInstanceOf(Event);
  expect(event.id).toBe(source.idEvents);
  expect(event.title).toBe(source.eventTitle);
  expect(event.desc).toBe(source.eventDesc);
  expect(event.start).toEqual(moment(new Date(source.eventStart)));
  expect(event.end).toEqual(moment(new Date(source.eventEnd)));
  expect(event.editable).toBe(true);
  //Test iceEvents
  let iceEvents = event.iceEvents;
  expect(iceEvents).toHaveLength(1);
  //Test calendarEvents
  let calendarEvents = event.calendarEvents;
  expect(calendarEvents).toHaveLength(1);
  //Test patch event
  let patchEvent = event.patchEvent;
  expect(patchEvent.title).toBe(event.title);
  expect(patchEvent.id).toBe(event.id);
  expect(patchEvent.desc).toBe(event.desc);
  //Test event from calendar
});

test('Creates an Event from a calendar json object',() => {
  let calendarSource = {
    id: -1,
    title: "Calendar Event",
    start: moment().day(0).week(1),
    end: moment().day(6).week(1),
    desc: "Event Created on update",
    allDay: true,
    editable: true
  }
  let event = calendarToEvent(calendarSource);
  expect(event).toBeInstanceOf(Event);
  expect(event.id).toBe(calendarSource.id);
  event.id = 2;
  expect(event.id).toBe(2);
  event.id = 1;
  expect(event.id).toBe(2);  
  expect(event.title).toBe(calendarSource.title);
  expect(event.desc).toBe(calendarSource.desc);
});