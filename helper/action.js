const actionEnum = require('./config').actionEnum;

module.exports = {
	next: function(context) {
		context.simpledb.roomleveldata.actionEnum++;
	},
	back: function(context) {
		context.simpledb.roomleveldata.actionEnum--;
	},
	toSearch: function(context) {
		context.simpledb.roomleveldata.actionEnum = actionEnum.SEARCH;
	},
	toChoose: function(context) {
		context.simpledb.roomleveldata.actionEnum = actionEnum.CHOOSE;
	},
	toDone: function(context) {
		context.simpledb.roomleveldata.actionEnum = actionEnum.DONE;
	},
	isSearch: function(context) {
		return context.simpledb.roomleveldata.actionEnum == actionEnum.SEARCH;
	},
	isChoose: function(context) {
		return context.simpledb.roomleveldata.actionEnum == actionEnum.CHOOSE;
	},
	isDone: function(context) {
		return context.simpledb.roomleveldata.actionEnum == actionEnum.DONE;
	}

}