var React = require('react');
var Reflux = require('reflux');
var Store = require('./AppStore');
var Intent = require('./Intent');
var Store2 = require('./Store');

var ListTodos = React.createClass({
	mixins: [Reflux.connect(Store)],
	getInitialState: function() {
		return Store2.getInitialState();
	},
	componentDidMount: function() {
		console.log('store initial state', Store2.getValue());
		Store2.subscribe(function (state) {
			console.log(state);
			this.setState(state);
		}.bind(this));
	},
	render: function () {
		var m = this.state.messages.map(function (message, i) {
			return <li key={i}>{message}</li>
		});
		return (
			<div>
				<ul>{m}</ul>

				<div>{this.state ? this.state.message : ''}</div>
				<div>{this.state && this.state.loggedIn ? 'logged in' : 'not logged in'}</div>
			</div>
			);
	}
});

module.exports = ListTodos;