const { METHODS } = require("../constants");
const userDB = require("../db");
const { handleError, wrapResp } = require("./utils");

let lastModified = new Date().valueOf();

const generateHATEOAS = (user) => {
  const result = {
    links: [],
  };

  if (user && user.hobbies) {
    result.links.push({
      rel: "self",
      href: "/hobbies",
      method: METHODS.GET,
      type: "application/json",
    });

    result.links.push({
      rel: "self",
      href: "/hobbies",
      method: METHODS.POST,
      type: "application/json",
    });

    if (user.hobbies.length > 0) {
      user.hobbies.forEach((hobby) => {
        result.links.push({
          rel: "self",
          href: `/hobbies/${hobby}`,
          method: METHODS.DELETE,
          type: "application/json",
        });
      });
    }
  }
  return result;
};

const createUser = (data, res) => {
  if (!data) {
    handleError(res, 422, { message: "No user data received" });
  }

  wrapResp(
    () => {
      const json = JSON.parse(data);
      return userDB.createUser(json);
    },
    res,
    201
  );
};

const deleteUser = (id, res) => {
  if (!id) {
    handleError(res, 400, { message: "Invalid user id" });
  }
  wrapResp(() => {
    const user = userDB.getUser(id);
    if (!user) {
      handleError(res, 400, {
        message: "Invalid user id; no users found for the given id",
      });
    } else {
      userDB.deleteUser(id);
    }
  }, res);
};

const getUsers = (res) => {
  wrapResp(() => {
    const users = userDB.getUsers();
    return users.map((user) => {
      const hobbies = userDB.getUserHobbies(user.id);
      return {
        ...user,
        ...generateHATEOAS({ hobbies }),
      };
    });
  }, res);
};

const getUser = (userId, res) => {
  if (!userId) {
    handleError(res, 404, { message: "User id is not provided" });
  }
  wrapResp(() => {
    const { hobbies, id, ...rest } = userDB.getUser(userId);
    if (!id) {
      handleError(res, 404, { message: "User with given id is not found" });
    }
    return { id, ...rest, ...generateHATEOAS({ hobbies }) };
  }, res);
};

const getUserHobbies = (userId, res) => {
  if (!userId) {
    handleError(res, 404, { message: "User id is not provided" });
  }
  wrapResp(() => {
    const { hobbies, id, ...rest } = userDB.getUser(userId);
    if (!id) {
      handleError(res, 404, { message: "User with given id is not found" });
    }
    res.setHeader("Cache-Control", `max-age=31536000`);
    res.setHeader("Last-Modified", lastModified);
    return hobbies;
  }, res);
};

const updateUser = (userId, data, res) => {
  if (!userId) {
    handleError(res, 404, { message: "User id is not provided" });
  }

  wrapResp(() => {
    const json = JSON.parse(data);
    const { hobbies, id, ...rest } = userDB.updateUser(userId, json);
    if (!id) {
      handleError(res, 404, { message: "User with given id is not found" });
    }
    return { id, ...rest };
  }, res);
};

const addUserHobby = (userId, data, res) => {
  if (!userId) {
    handleError(res, 404, { message: "User id is not provided" });
  }
  if (!data) {
    handleError(res, 422, { message: "hobby is not provided" });
  }
  const json = JSON.parse(data);
  if (!json.hobby) {
    handleError(res, 422, { message: "hobby is not provided" });
  }
  const hobbies = userDB.getUserHobbies(userId);
  if (hobbies.includes(json.hobby)) {
    handleError(res, 403, { message: "hobby is already added" });
  } else {
    wrapResp(
      () => {
        userDB.addUserHobby(userId, json.hobby);
        lastModified = new Date().valueOf();
      },
      res,
      201
    );
  }
};

const deleteUserHobby = (userId, hobby, res) => {
  if (!userId) {
    handleError(res, 404, { message: "User id is not provided" });
  }
  if (!hobby) {
    handleError(res, 422, { message: "hobby id is not provided" });
  }
  const hobbies = userDB.getUserHobbies(userId);
  if (!hobbies.includes(hobby)) {
    handleError(res, 403, { message: "hobby is not present. can not delete" });
  } else {
    wrapResp(() => {
      userDB.removeUserHobby(userId, hobby);
      lastModified = new Date().valueOf();
    }, res);
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  getUserHobbies,
  updateUser,
  addUserHobby,
  deleteUserHobby,
};
