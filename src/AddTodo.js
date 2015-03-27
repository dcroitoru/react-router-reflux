var React = require('react');
var Actions = require('./AppActions');

var AddTodo = React.createClass({
	onAdd: function() {
		var ref = this.refs.input.getDOMNode();
		Actions.addMessage(ref.value);
		ref.value = '';
	},
	render: function () {
		return (
			<div>
				<input ref="input"/><button onClick={this.onAdd}>add</button>
			</div>
			);
	}
});

module.exports = AddTodo;