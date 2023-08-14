const express = require("express");
const expressSession = require("express-session");
const csrf = require("csurf");

const path = require("path");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/checkAuth");
const createSessionConfig = require("./config/session");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");
const protectRoutesMiddleware = require("./middlewares/protectRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("productData"))

app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

//before csrf
app.use(expressSession(sessionConfig));

//before routes
app.use(csrf());

app.use(addCsrfTokenMiddleware);

//use after session config
app.use(checkAuthStatusMiddleware);

app.use(authRoutes);
app.use(baseRoutes);
app.use(productsRoutes);
app.use(protectRoutesMiddleware)
app.use("/admin", adminRoutes);


app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function() {
    app.listen(3000, () => {
        console.log("Listen on server 3000");
    })
}).catch(function(err) {
    console.log("Failed to connect to the db");
    console.log(err);
});

