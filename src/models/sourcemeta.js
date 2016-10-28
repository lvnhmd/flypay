var mongoose = require('mongoose');

var sourceMetaSchema = mongoose.Schema({

	name: {
		type: String
	},
	favicon: {
		type: String
	},
	stamp: {
		type: Date,
		default: Date.now
	},
	filterBy: {
		type: Boolean,
		default: false
	}

});

module.exports = mongoose.model('SourceMeta', sourceMetaSchema);