const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs').__express;
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const methodOverride = require('method-override');


require('./config/passport');

const app = express();
//const app = polka();




require('express-helpers')(app);
// view engine setup
//app.disable('etag');
//app.set('views', path.join(__dirname, 'views'));
app.set("views", "./views");

//app.set("views", "./public/dist/");

app.set('view engine', 'ejs');
app.engine('.ejs', ejs); //
app.locals.rmWhitespace = true;
// Routes
const episodes = require('./routes/episodes');
const series = require('./routes/series');

app.locals.moment = require('moment');
const moment = require('moment');
moment.locale('es');

//app.use(express.logger('dev'));
//app.use(logger('dev'));

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
// Angular DIST output folder
//app.use(express.static(path.join(__dirname, 'dist')));
// Original no angular
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(methodOverride('_method'));

//login system
app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 },
  secret: 'kontol',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Middlewares
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    res.locals.isAuthenticated = req.user ? true : false;
    next();
});


// Routes
app.use('/series', series);
app.use('/', episodes);
app.use('/episodes', episodes);
app.use('/show', episodes);
app.use('/anime', series);
app.use('/episodes', series);


app.use('/users', require('./routes/users'));




// Catach 404 Errors and forward them to error handler
app.use(function (req, res, next) {
  var err = new Error('404: Not Found ' + req.originalUrl); //here
  err.status = 404;
  next(err);// or null
});

module.exports = app;
