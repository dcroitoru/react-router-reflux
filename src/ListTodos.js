var React = require('react');
var Reflux = require('reflux');
var Store = require('./AppStore');

var ListTodos = React.createClass({
	mixins: [Reflux.connect(Store)],
	render: function () {
		var m = this.state.messages.map(function (message, i) {
			return <li key={i}>{message}</li>
		});
		return (
			<div>
				<ul>{m}</ul>
			</div>
			);
	}
});

module.exports = ListTodos;