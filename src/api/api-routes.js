var fs = require('fs');
var Competition = require('../models/competition');
var UserComp = require('../models/usercomp');
var SourceMeta = require('../models/sourcemeta');
var util = require('../util');

module.exports = function(app) {
	// show the home page (will also have our login links)
	app.get('/api/competitions', function(req, res) {
		// cache this 
		// http://mongoosejs.com/docs/queries.html
		// read form db and order - put the ones that have been scraped last on top
		// retrieve competitions which still can be entered , 	the ones with no closing date 
		// 
		// ({$or: [{date: {$lt: date0}}, {date: {$gt: date1}}]})

		Competition.find( {
		    $and : [
		        { $or: [{"closes": {$gte: new Date()}},{"closes": {$exists: false}}] },
		        { show:true }
		    ]
		} ).limit(util.compsToDisplay).sort({
			stamp: -1
		}).
		exec(function(err, data) {
			if (err) console.log(err);
			// console.log(JSON.stringify(data));

			// data.unshift({
			// 	version: 'TEST 9'
			// });
			
			return res.json(data);
		});
	});

	app.post('/api/track', function(req, res) {

		UserComp.findOne({
			'userid': req.body.userid,
			'compid': req.body.compid
		}, function(err, usercomp) {
			if (err) console.log(err);
			if (usercomp) {
				usercomp.count = usercomp.count + 1;
				usercomp.save(function(err) {
					if (err) console.log(err);
					return res.json(usercomp);
				});
			} else {
				var newUsercomp = new UserComp();
				newUsercomp.userid = req.body.userid;
				newUsercomp.compid = req.body.compid;

				newUsercomp.save(function(err) {
					if (err) console.log(err);
					return res.json(newUsercomp);
				});
			}
		});

	});

	app.get('/api/sources', function(req, res) {
		// cache this 
		// http://mongoosejs.com/docs/queries.html
		// read form db and order - put the ones that have been scraped last on top
		SourceMeta.find({}).sort({
			stamp: -1
		}).
		exec(function(err, data) {
			if (err) console.log(err);
			// console.log(JSON.stringify(data));
			return res.json(data);
		});
	});

};