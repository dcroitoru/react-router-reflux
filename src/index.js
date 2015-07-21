var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var AppStore = require('./AppStore');
var AppActions = require('./AppActions');

var AddTodo = require('./AddTodo');
var ListTodos = require('./ListTodos');
var ListUsers = require('./ListUsers');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<div>
					<Link to="app">Home</Link> | <Link to="add">Add todo </Link> | <Link to="list">List todos</Link>| <Link to="users">List users</Link>

				</div>
				<hr/>
				<RouteHandler />
			</div>
			)
		
	}
});

var Home = React.createClass({render: function (){ return <div>this is home</div>}});
var AddTodoView = React.createClass({render: function (){ return <div>this is add todo <hr/> <AddTodo /></div>}});
var ListTodosView = React.createClass({render: function (){ return <div>this is list todos <hr/> <ListTodos /></div>}});

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={Home} />
		<Route name="add" handler={AddTodoView} />
		<Route name="list" handler={ListTodosView} />
		<Route name="users" handler={ListUsers} />
	</Route>
	);

Router.run(routes, function (Handler) {
	React.render(<Handler />, document.getElementById('content'));
});