var Reflux = require('reflux');
var AppActions = require('./AppActions');
var Intent = require('./Intent');

/*Intent.subjects.addMessage$.subscribe(function (message) {
	console.log('should push', message);
	messages.push(message);
	AppStore.trigger({messages: messages});
});*/

var messages = ["miau"];
var AppStore = Reflux.createStore({
	init: function () {

	},
	listenables: AppActions,
	onAddMessage: function (message) {
		messages.push(message);
		this.trigger({messages: messages});
	},
	getInitialState: function () {
		return {messages: messages};
	},

	addMessage: function (message) {
		console.log('would trigger', message);
	}
});

console.log('store should have been created', AppStore);
Intent.actions.forEach(function (action) {
	if (AppStore.hasOwnProperty(action)) {
		Intent.subjects[action].subscribe(AppStore[action]);
	}

});

module.exports = AppStore;