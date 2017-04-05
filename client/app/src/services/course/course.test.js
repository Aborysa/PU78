import { Course, jsonToCourse } from "./course.js";

test('Creates a Course from a json object', () => {
  let source = {
    idCourse: "TEST",
    name: "This is a test",
  }
  let course = jsonToCourse(source);
  expect(course.id).toBe(source.idCourse);
  expect(course.name).toBe(source.name);
});