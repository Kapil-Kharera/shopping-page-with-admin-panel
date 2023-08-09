const express = require("express");
const path = require("path");
const db = require("./data/database");
const csrf = require("csurf");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

//before routes
app.use(csrf());

app.use(addCsrfTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function() {
    app.listen(3000, () => {
        console.log("Listen on server 3000");
    })
}).catch(function(err) {
    console.log("Failed to connect to the db");
    console.log(err);
});

