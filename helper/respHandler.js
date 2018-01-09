const carousel = require('./carousel');


module.exports = function(context, event) {
	let resp = JSON.parse(event.getresp);
	if (resp) {
		context.sendResponse(JSON.stringify(carousel.view(resp)))
	}
}