const users = [
  {
    id: 1,
    name: "Ann",
    email: "ann@google.com",
    hobbies: ["books", "sport", "dancing"],
  },
  {
    id: 2,
    name: "Ben",
    email: "ben@google.com",
    hobbies: ["series", "sport"],
  },
];

const getUsers = () => users.map(({ hobbies, ...rest }) => rest);
const getUser = (id) => users.find((item) => item.id == id) || {};

const getUserHobbies = (id) => {
  const user = getUser(id);
  return user.hobbies;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
  if (index !== -1) {
    users.splice(index, 1);
  }
};
const createUser = (data) => {
  const id = users.slice(-1)[0].id || 0;
  const userData = JSON.parse(data);
  const hobbies = userData.hobbies || []
  users.push({ id: id + 1, ...userData, hobbies });
  return getUser(id + 1);
};

const updateUser = (userId, data) => {
  const user = getUser(userId);
  const newUser = { ...user, ...data };
  const index = users.findIndex((user) => user.id == userId);
  users[index] = newUser;

  return newUser;
};

const addUserHobby = (userId, hobby) => {
  const hobbies = getUserHobbies(userId);
  hobbies.push(hobby);
};

const removeUserHobby = (userId, hobby) => {
  const hobbies = getUserHobbies(userId);
  const hobbyIndex = hobbies.findIndex((item) => item === hobby);
  hobbies.splice(hobbyIndex, 1);
};

module.exports = {
  createUser,
  deleteUser,
  getUserHobbies,
  getUser,
  getUsers,
  updateUser,
  addUserHobby,
  removeUserHobby,
};
