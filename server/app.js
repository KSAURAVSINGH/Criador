const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const mongoConnect = require('./database/db_connection.js')
const passport = require('passport')
const dotenv = require('dotenv')
// const path = require('path')

dotenv.config()
const app = express()

// app.use(express.static(path.join(__dirname+'/public')))

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_CONNECT,
    collection: "sessions"
})

app.use(session({
    secret: 'begrateful',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24
    }
}))

require('./auth/passport_config.js')
app.use(passport.initialize())
app.use(passport.session());

require('./backend/apis.js')(app);

console.log("Running on port: ", process.env.PORT);

app.listen(process.env.PORT || 8000, function(){
    mongoConnect.makeDBConn();
    console.log("Server started");
})

