var Rx = require('rx');
var Intent = require('./Intent');
var update = require('react/addons').update;

var StoreSubj = new Rx.BehaviorSubject();
var st = {}
var Store = {
	addMessage: function (msg) {
		console.log('new store msg', msg);
		StoreSubj.onNext({message: msg});
	}
};

Intent.actions.forEach(function (action) {
	if (Store.hasOwnProperty(action)) {
		Intent.subjects[action].subscribe(Store[action]);
	}

});

module.exports = StoreSubj;