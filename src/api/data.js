const users = [...Array(100).keys()].map((num) => ({
  username: "user" + num,
  id: "solab-" + num,
  questions: num,
}));

export { users };
