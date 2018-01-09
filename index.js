var botScriptExecutor = require('bot-script').executor;
var scr_config = require('./scr_config.json');

const carousel = require('./helper/carousel'),
action = require('./helper/action'),
addHandler = require('./helper/addHandler');




function MessageHandler(context, event) {
	if (action.isSearch(context)) {

		addHandler.search(context, event);

	} else if (action.isChoose(context)) {

		choose();

	}
	ScriptHandler(context, event);
}



function choose() {
	let contextParam = {
		"name": context.simpledb.roomleveldata.searchName,
		"index": event.message.split(' ')[4],
		"createdBy": event.senderobj.display
	};
	let url = "https://tseatbot.herokuapp.com/add/choose";
	let param = JSON.stringify(contextParam);
	let header = {
		"Content-Type": "application/json"
	};
	context.simplehttp.makePost(url, param, header, add);
	return;
}

function add(context, event) {

	let res = JSON.parse(event.getresp);
	if (res) {
		context.simpledb.roomleveldata.actionEnum += 1;
		context.simpledb.roomleveldata.restaurant = res

		context.sendResponse(carousel.add(res));
	} else {
		context.simpledb.roomleveldata.actionEnum = actionEnum.done;
		context.sendResponse(res.err);
	}
}

function EventHandler(context, event) {
	context.simpledb.roomleveldata = {};
	MessageHandler(context, event);
}



function ScriptHandler(context, event) {
	var options = Object.assign({}, scr_config);
	options.current_dir = __dirname;
	//options.default_message = "Sorry Some Error Occurred.";
	// You can add any start point by just mentioning the <script_file_name>.<section_name>
	// options.start_section = "default.main";
	options.success = function(opm) {
		context.sendResponse(JSON.stringify(opm));
	};
	options.error = function(err) {
		console.log(err.stack);
		context.sendResponse(options.default_message);
	};
	botScriptExecutor.execute(options, event, context);
}

function HttpResponseHandler(context, event) {
	if (event.geturl === "http://ip-api.com/json")
		context.sendResponse('This is response from http \n' + JSON.stringify(event.getresp, null, '\t'));
}

function DbGetHandler(context, event) {
	context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function DbPutHandler(context, event) {
	context.sendResponse("testdbput keyword was last sent by:" + JSON.stringify(event.dbval));
}

function HttpEndpointHandler(context, event) {
	context.sendResponse('This is response from http \n' + JSON.stringify(event, null, '\t'));
}

function LocationHandler(context, event) {
	context.sendResponse("Got location");
}


exports.onMessage = MessageHandler;
exports.onEvent = EventHandler;
exports.onHttpResponse = HttpResponseHandler;
exports.onDbGet = DbGetHandler;
exports.onDbPut = DbPutHandler;


if (typeof LocationHandler == 'function') {
	exports.onLocation = LocationHandler;
}
if (typeof HttpEndpointHandler == 'function') {
	exports.onHttpEndpoint = HttpEndpointHandler;
}