var React = require('react');
var Intent = require('./Intent');
var Store = require('./Store');
var Reqwest = require('reqwest');

var sub;

/*var refreshStream = new Rx.Subject();
var requestOnRefreshStream = refreshStream.map(function () { return 'users2.json'});
var requestStream = requestOnRefreshStream.startWith('users.json');
var responseStream = requestStream.flatMap(function (requestUrl) {
	return Rx.Observable.fromPromise(Reqwest(requestUrl));
});

var close1ClickStream = new Rx.Subject();
var suggestion1Stream = close1ClickStream.startWith('1').combineLatest(responseStream, function (click, users) {
	return users[Math.floor(Math.random()*users.length)];
}).startWith(null);



responseStream.subscribe(function (resp) {
	console.log('getting some responses', resp[0]);
});*/



var ListUsers = React.createClass({
	componentDidMount: function () {
		sub = Store.subscribe(function (state) {
			this.setState(state);
		}.bind(this));

		/*suggestion1Stream.subscribe(function (resp) {
			console.log('sugg 1 stream next', resp);
			this.setState({user1: resp});
		}.bind(this));*/
	},
	componentWillUnmount: function() {
		sub.dispose();
	},
	onGetUsers: function () {
		console.log('on get users');
		Intent.getUsers();
	},
	onRefresh: function () {
		//refreshStream.onNext();

		Intent.refresh();
	},
	onCloseUser: function (user) {
		console.log('should close', user.login);
		Intent.closeUser(user);
		//close1ClickStream.onNext();
	},
	render: function () {
		if (!this.state)
			return null;
		var m = this.state && this.state.users && this.state.users.map(function (user, i) {
			return <li key={i}>user: {user.login} <button onClick={this.onCloseUser.bind(this, user)}>x</button></li>
		}.bind(this));
		//var u = this.state && this.state.user1 && this.state.user1.login;
		return (
			<div>
				<button onClick={this.onGetUsers}>get users</button>
				<button onClick={this.onRefresh}>refresh users</button>
				<ul>{m}</ul>
			</div>
			);
	}
});

module.exports = ListUsers;