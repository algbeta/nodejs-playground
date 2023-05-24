const { METHODS } = require("./constants");
const userService = require("./api/user");

let body = [];

const handleUknownRoute = (res) => {
  res.statusCode = 404;
  res.end();
};

const processRoute = (url, method, req, res) => {
  const arrayUrl = url.split("/").filter((value) => !!value);
  console.log("arrayurl");
  console.log(arrayUrl);

  if (arrayUrl[0] !== "users") {
    handleUknownRoute(res);
    return;
  }

  const lastUrlElement = arrayUrl[arrayUrl.length - 1];

  switch (method) {
    case METHODS.GET: {
      if (lastUrlElement === "users") {
        userService.getUsers(res);
      } else if (lastUrlElement === "hobbies") {
        const userId = arrayUrl[arrayUrl.length - 2];
        userService.getUserHobbies(userId, res);
      } else {
        userService.getUser(lastUrlElement, res);
      }
      break;
    }
    case METHODS.DELETE: {
      if (arrayUrl.includes("hobbies")) {
        const userId = arrayUrl[arrayUrl.length - 3];
        userService.deleteUserHobby(userId, lastUrlElement, res);
      } else {
        userService.deleteUser(lastUrlElement, res);
      }
      break;
    }
    case METHODS.POST: {
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          if (lastUrlElement === "hobbies") {
            const userId = arrayUrl[arrayUrl.length - 2];
            userService.addUserHobby(userId, body, res);
          } else {
            userService.createUser(body, res);
          }
        });
      break;
    }
    case METHODS.PATCH: {
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          userService.updateUser(lastUrlElement, body, res);
        });
      break;
    }
  }
};

module.exports = {
  processRoute,
};
