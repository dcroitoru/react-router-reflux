var Rx = require('rx');
var actions = ['addMessage', 'addTodo', 'login', 'logout', 'getUsers', 'refresh', 'closeUser'];
var subjects = {};
var exp = {};
var sub;
actions.forEach(function (action) {
	sub = subjects[action] = new Rx.Subject();
	exp[action] = function (arg) {
		subjects[action].onNext(arg);
	}
});

exp.subjects = subjects;
exp.actions = actions;

module.exports = exp;