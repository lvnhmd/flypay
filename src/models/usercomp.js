var mongoose = require('mongoose');

var usercompSchema = mongoose.Schema({

	userid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	compid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Competition'
	},
	count: {
		type: Number,
		default: 1
 	}

});

module.exports = mongoose.model('UserComp', usercompSchema);