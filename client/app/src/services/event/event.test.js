import { Event, jsonToEvent } from "./event.js";


test('Creates an Event from a json object', () => {
  let source = {
    idEvents: 1,
    eventTitle: "This is a test",
    eventStart: "28/03/2017",
    eventEnd: "29/03/2017",
    eventDesc: "This event is in end of march"
  }
  let event = jsonToEvent(source);
  expect(event.id).toBe(source.idEvents);
  expect(event.title).toBe(source.eventTitle);
  expect(event.desc).toBe(source.eventDesc);
});