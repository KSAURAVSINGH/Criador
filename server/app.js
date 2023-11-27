const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const mongoConnect = require('./database/db_connection.js')
const passport = require('passport')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

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

app.listen(8000, function(){
    mongoConnect.makeDBConn();
    console.log("Server started");
})

