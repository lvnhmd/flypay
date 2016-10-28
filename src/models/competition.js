var mongoose = require('mongoose');

var compSchema = mongoose.Schema({

	url: {
		type: String
	},
	img: {
		type: String
	},
	title: {
		type: String
	},
	source: {
		type: String
	},
	stamp: {
		type: Date,
		default: Date.now
	},
	closes: {
		type: Date
	},
	show: {
		type: Boolean,
		default: true
	},
	id: {
		type: String
	}
});

module.exports = mongoose.model('Competition', compSchema);