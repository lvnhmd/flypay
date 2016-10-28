// var config = require('./config.js');
var Config = require('./config.js'),
    config = new Config();
var nodemailer = require('nodemailer');

module.exports = {

	cookieMaxAge: {
		'halfAnHour': 30 * 60 * 1000,
		'oneMonth': 30 * 24 * 60 * 60 * 1000
	},

	interval: {
		'oneHour': 60 * 60 * 1000,
		'fiveMin': 5 * 60 * 1000,
		'twoMin': 2 * 60 * 1000,
		'oneMin': 1 * 60 * 1000,
		'now': 1000
	},

	// I am interested only in the last 1000 comps
	compsToDisplay: 1000,

	sendVerificationEmail: function(host, toUser) {

		var link = 'http://' + host + '/verify?id=' + toUser.l_token;
		var mailOptions = {
			to: toUser.email,
			subject: 'Hi ' + toUser.name + ', please confirm your email account',
			html: 'Hi ' + toUser.name + ',<br> please <a href=' + link + '>click here</a> to confirm your email account'
		}
		console.log(mailOptions);
		nodemailer.createTransport(config.gmail).sendMail(mailOptions, function(error, response) {
			if (error) console.log(error);
		});
	},

	sendResetPasswordEmail: function(host, toUser) {

		var link = 'http://' + host + '/reset?id=' + toUser.l_token;
		var mailOptions = {
			to: toUser.email,
			subject: 'Hi ' + toUser.name + ', here is how to reset your password',
			html: 'Hi ' + toUser.name + ',<br> please <a href=' + link + '>click here</a> to reset your password'
		}
		console.log(mailOptions);
		nodemailer.createTransport(config.gmail).sendMail(mailOptions, function(error, response) {
			if (error) console.log(error);
		});
	},

	sendAdminEmail: function(source, validation) {
		var mailOptions = {
			to: 'ali.elvin+admin@gmail.com',
			subject: source + ' : missing competitions properties',
			html: JSON.stringify(validation, null, '\t')
		}
		// console.log(mailOptions);
		nodemailer.createTransport(config.gmail).sendMail(mailOptions, function(error, response) {
			if (error) console.log(error);
		});
	}
};