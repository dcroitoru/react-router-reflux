var React = require('react');
var Actions = require('./AppActions');
var Intent = require('./Intent');
var Store2 = require('./Store');

var AddTodo = React.createClass({
	getInitialState: Store2.getInitialState,
	componentDidMount: function() {
		Store2.subscribe(function (state) {
			console.log(state);
			this.setState(state);
		}.bind(this));
	},
	onAdd: function() {
		var ref = this.refs.input.getDOMNode();
		Actions.addMessage(ref.value);
		Intent.addMessage(ref.value);
		ref.value = '';
	},

	login: function () {
		Intent.login();
	},

	render: function () {
		console.log('rerendering with', this.state);
		return (
			<div>
				<input ref="input"/><button onClick={this.onAdd}>add</button>

				<div>{this.state ? this.state.message : ''}</div>
				<button onClick={this.login}>login</button>
				<div>{this.state && this.state.loggedIn ? 'logged in': 'not logged in'}</div>
			</div>
			);
	}
});

module.exports = AddTodo;