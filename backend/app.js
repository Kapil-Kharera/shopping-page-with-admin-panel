const express = require("express");
const expressSession = require("express-session");
const csrf = require("csurf");

const path = require("path");
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/checkAuth");
const protectRoutesMiddleware = require("./middlewares/protectRoutes");
const cartMiddleware = require("./middlewares/cart");
const updateCartPricesMiddleware = require("./middlewares/updateCartPrices");
const notFoundMiddleware = require("./middlewares/notFound");

const createSessionConfig = require("./config/session");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("productData"))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

const sessionConfig = createSessionConfig();

//before csrf
app.use(expressSession(sessionConfig));

//after session initialized
app.use(cartMiddleware);

//use after cartMiddleware
app.use(updateCartPricesMiddleware);

//before routes
app.use(csrf());

app.use(addCsrfTokenMiddleware);

//use after session config
app.use(checkAuthStatusMiddleware);

app.use(authRoutes);
app.use(baseRoutes);
app.use(productsRoutes);

//use before protected routes (we want to allow everyone to access this route)
app.use("/cart", cartRoutes);

//use it after protected routes
app.use("/orders", protectRoutesMiddleware, ordersRoutes);

app.use("/admin", protectRoutesMiddleware, adminRoutes);

//use it before errorhandlermiddleware
app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase().then(function() {
    app.listen(3000, () => {
        console.log("Listen on server 3000");
    })
}).catch(function(err) {
    console.log("Failed to connect to the db");
    console.log(err);
});

