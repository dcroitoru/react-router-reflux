var React = require('react');
var Intent = require('./Intent');
var Store2 = require('./Store');

var sub;
var AddTodo = React.createClass({
	componentDidMount: function() {
		sub = Store2.subscribe(function (state) {
			console.log(state);
			if(state)
				this.setState(state);
		}.bind(this));
	},
	componentWillUnmount: function() {
		console.log('should dispose of', sub, Store2.observers);
		sub.dispose();
		console.log(sub);
	},
	onAdd: function() {
		var ref = this.refs.input.getDOMNode();
		Intent.addMessage(ref.value);
		ref.value = '';
	},

	login: function () {
		Intent.login();
	},
	logout: function () {
		Intent.logout();
	},

	render: function () {
		console.log('rerendering with', this.state);
		return (
			<div>
				<input ref="input"/><button onClick={this.onAdd}>add</button>

				<div>{this.state ? this.state.message : ''}</div>
				<button onClick={this.login}>login</button>
				<button onClick={this.logout}>logout</button>
				<div>{this.state && this.state.loggedIn ? 'logged in': 'not logged in'}</div>
			</div>
			);
	}
});

module.exports = AddTodo;