let internalError = (res) => {
  res.status(500);
  res.json({
    status: "error",
    message: "Something went wrong!"
  });
}

let userError = (res) => {
  res.status(400);
  res.json({
    status: "error",
    message: "User not logged in!"
  });
}

module.exports = {
  userError = userError,
  internalError = internalError
}