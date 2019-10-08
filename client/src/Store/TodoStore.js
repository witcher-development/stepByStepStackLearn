import { observable, computed } from 'mobx';

class TodoStore {
	constructor(rootStore) {
		this.rootStore = rootStore
	}

	@observable todoList = [];
	@computed get taskCount() {
		return this.todoList.length;
	}

	addTodo(todo) {
		this.todoList.push(todo);
	}

	setTodoList(list) {
		window.console.log(this.todoList);
		this.todoList = list;
		window.console.log(this.todoList);
	}
}

export default TodoStore;
