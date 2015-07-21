var Rx = require('rx');
var Reqwest = require('reqwest');
var Intent = require('./Intent');

var st = {message: 'pfu', messages: ['miu']};
var StoreSubj = new Rx.BehaviorSubject(st);

var refreshStream = new Rx.Subject();
var requestOnRefreshStream = refreshStream.map(function () { return 'users-sm2.json'});
var requestStream = requestOnRefreshStream.startWith('users-sm1.json');
var responseStream = requestStream.flatMap(function (requestUrl) {
	return Rx.Observable.fromPromise(Reqwest(requestUrl));
});

responseStream.subscribe(function (resp) {
	console.log('getting some responses', resp);
	st.users = resp;
	StoreSubj.onNext(st);
});

var userRemoveStream = new Rx.Subject();
userRemoveStream.subscribe(function (resp) {
	console.log('user remove stream saying', resp);
	st.users.splice(st.users.indexOf(resp), 1);
	StoreSubj.onNext(st);
});


var Store = {
	trigger: function (value) {
		//assign(st, value);
		StoreSubj.onNext(value);
	},
	addMessage: function (msg) {
		st.message = msg;
		st.messages.push(msg)
		Store.trigger(st);
	},
	login: function() {
		st.loggedIn = true;
		Store.trigger(st);
	},
	logout: function() {
		st.loggedIn = false;
		Store.trigger(st);
	},

	getUsers: function () {
		var response  = Rx.Observable.fromPromise(Reqwest('users.json'));
		response.subscribe(function (resp) {
			st.users = resp;
			Store.trigger(st);
		});
	}, 

	refresh: function (val) {
		console.log('inside store', this, val);
		refreshStream.onNext();
	},

	closeUser: function (user) {
		console.log('store should remove user from list', user.login);
		userRemoveStream.onNext(user);
	}



};

Intent.actions.forEach(function (action) {
	if (Store.hasOwnProperty(action)) {
		Intent.subjects[action].subscribe(Store[action]);
	}
});

module.exports = StoreSubj;