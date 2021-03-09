const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
const passport = require('passport');
const passportLocal = require('passport-local');
const expressSession = require('express-session');
const User = require('./models/user');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Env variable configuration
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

const indexRoutes = require('./routes/index');
const blogRoutes = require('./routes/blogs');

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

// AUTH CONFIG

app.use(
	expressSession({
		secret: 'Reading blogs daily is really an wonderful habit',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

// RESTFUL ROUTES

app.use('/', indexRoutes);
app.use('/blogs', blogRoutes);

// app.listen(process.env.PORT, process.env.IP);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server Started at ${PORT}`);
}) 
