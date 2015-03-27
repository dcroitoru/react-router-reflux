var Reflux = require('reflux');
var AppActions = require('./AppActions');

var messages = ["miau"];
var AppStore = Reflux.createStore({
	listenables: AppActions,
	onAddMessage: function (message) {
		messages.push(message);
		this.trigger({messages: messages});
	},
	getInitialState: function () {
		return {messages: messages};
	}
});

module.exports = AppStore;