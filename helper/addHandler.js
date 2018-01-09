const respHandler = require('./respHandler');

module.exports = {
	search: function(context, event) {
		context.simpledb.roomleveldata.searchName = event.message;
		let contextParam = {
			"name": event.message
		};
		let url = "https://tseatbot.herokuapp.com/add/search";
		let param = JSON.stringify(contextParam);
		let header = {
			"Content-Type": "application/json"
		};
		context.simplehttp.makePost(url, param, header, respHandler(context, event));
		return;
	}
}