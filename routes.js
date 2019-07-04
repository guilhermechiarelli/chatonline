const express = require("express");
const routes = express();
const IndexController = require("./controllers/IndexController");
const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const ChatController = require("./controllers/ChatController");
const authMiddleware = require("./config/auth");
const guestMiddleware = require("./config/guest");

routes.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

routes.get("/", guestMiddleware, IndexController.index);
routes.post("/login", guestMiddleware, SessionController.login);
routes.get("/app/logout", authMiddleware, SessionController.logout);

routes.get("/register", guestMiddleware, UserController.create);
routes.post("/register", guestMiddleware, UserController.store);

routes.get("/app/chat", authMiddleware, ChatController.index);
routes.get("/app/profile", authMiddleware, IndexController.profile);
routes.post("/app/profile/:_id", authMiddleware, UserController.update);
routes.post("/app/profile/delete/:_id", authMiddleware, UserController.delete);

module.exports = routes;
