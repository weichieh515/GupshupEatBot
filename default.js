const respHandler = require('./helper/respHandler'),
action = require('./helper/action');
const herokuURL = require('./helper/config').herokuURL;

function allHandler(options, event, context, callback) {
	context.simplehttp.makeGet(`$ {
			herokuURL
		}
		/view/all`, null, respHandler(context, event));
}

function randomhandler(options, event, context, callback) {
	context.simplehttp.makeGet(`$ {
			herokuURL
		}
		/view/all`, null, respHandler(context, event));
}

function addHandler(options, event, context, callback) {
	action.toSearch(context);
	callback(options, event, context);
}

function cancelHandler() {
	action.toDone(context);
	callback(options, event, context);
}

module.exports.main = {
	all: allHandler,
	random: randomhandler,
	add: addHandler,
	cancel: cancelHandler
}