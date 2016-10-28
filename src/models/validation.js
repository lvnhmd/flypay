var mongoose = require('mongoose');

var validationSchema = mongoose.Schema({

	comp: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Competition'
	},
	valid: {
		type: Boolean,
		default: false
	}

});

module.exports = mongoose.model('Validation', validationSchema);