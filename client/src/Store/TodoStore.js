import { observable, decorate } from 'mobx';

export default class TodoStore {
	todoList = [];
	get taskCount() {
		console.log('fired');
		return this.todoList.length;
	}

	addTodo(todo) {
		this.todoList.push(todo);
	}

	setTodoList(list) {
		this.todoList = list;
	}
}

decorate(TodoStore, {
	todoList: observable,
});
