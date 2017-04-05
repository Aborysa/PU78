import { User } from "./user.js";

test('Creates User and checks name.', () => {
  let id = "testID";
  let username = "testUsername";
  let fullname = "testFullname";
  let user = new User(id, username, fullname);
  expect(user.fullname).toBe(fullname);
});