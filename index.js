//require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const handlebars = require("express-handlebars");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 2 * 60 * 60
    })
  })
);

app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: __dirname + "/views" + "/default" + "/main",
    layoutsDir: __dirname + "/views"
  })
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(flash());

app.use(require("./routes"));

server.listen(process.env.PORT || 3000);
