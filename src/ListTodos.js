var React = require('react');
var Intent = require('./Intent');
var Store = require('./Store');

var sub;
var ListTodos = React.createClass({
	componentDidMount: function () {
		sub = Store.subscribe(function (state) {
			this.setState(state);
		}.bind(this));
	},
	componentWillUnmount: function() {
		sub.dispose();
	},
	render: function () {
		var m = this.state && this.state.messages.map(function (message, i) {
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