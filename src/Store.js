var Rx = require('rx');
var Intent = require('./Intent');
var update = require('react/addons').addons.update;
var assign = require('object-assign');

var StoreSubj = new Rx.BehaviorSubject();
var st = {message: 'nope'};
StoreSubj.getInitialState = function () {
	return st;
};

function trigger () {}

var Store = {
	addMessage: function (msg) {
		console.log('new store msg', msg);
		Store.trigger({message: msg});
	},
	login: function() {
		console.log('new store login', true);
		Store.trigger({loggedIn: true});
	},
	trigger: function (value) {
		assign(st, value);
		StoreSubj.onNext(value);
	}
};

Intent.actions.forEach(function (action) {
	if (Store.hasOwnProperty(action)) {
		Intent.subjects[action].subscribe(Store[action]);
	}

});

module.exports = StoreSubj;