function withUser(userId = "user-1") {
  return {
    "X-User-Id": userId
  };
}

module.exports = {
  withUser
};
