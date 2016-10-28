var express = require('express');
var app = express();
var port = process.env.PORT || 8081;
// var mongoose = require('mongoose');
// var passport = require('passport');
// var cons = require('consolidate');
// var flash = require('connect-flash');

// var morgan = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');

// var config = require('./src/config.js');
var Config = require('./src/config'),
    config = new Config();
var util = require('./src/util.js');
// 

// must specify options hash even if no options provided!
// var phpExpress = require('php-express')({
 
//   // assumes php is in your PATH
//   binPath: 'php'
// });
 
process.chdir(__dirname);

// configuration ===============================================================
// mongoose.connect(config.database.url); // connect to our database

// require('./src/api/auth-strategy')(passport); // pass passport for configuration

// set up our express application
// app.use(morgan('dev')); 	// log every request to the console
// app.use(cookieParser()); 	// read cookies (needed for auth)
// app.use(bodyParser.json()); // get information from html forms
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));

// app.engine('html', cons.ractive);
// app.set('view engine', 'html');
// app.set('views', __dirname + '/dist');

// set view engine to php-express
?app.engine('php', phpExpress.engine);

// routing all .php file to php-express
// app.all(/.+\.php$/, phpExpress.router);

// app.use(express.static('dist/cdn'));
// app.use(express.static('dist/public'));
// app.use(express.static('dist/admin'));
// add routing for dnd upload example
// http://localhost:8081/upload.html
// app.use(express.static('dev_tools/dnd-upload'));

// app.use(session({
// 	genid: function(req) {
// 		return genuuid() // use UUIDs for session IDs
// 	},
// 	secret: 'ilovecompetitions',
// 	cookie: {
// 		name: 'ilc_session', // the name is still connect.id
// 		maxAge: 30 * 60 * 1000
// 	},
// 	 store: new (require('express-sessions'))({
//         storage: 'mongodb',
//         instance: mongoose, 	// optional 
//         host: 'localhost', 		// optional 
//         port: 27017, 			// optional 
//         db: 'ena', 				// optional 
//         collection: 'sessions'
//     })
// }));
// app.use(passport.initialize());
// app.use(passport.authenticate('session'));
// app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
// require('./src/api/auth-routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./src/api/api-routes.js')(app);
// require('./src/api/admin-routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// start scrape.js task
require('./src/cas/scrape').scrape(util.interval.oneHour);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);