import { observable, computed } from 'mobx';

class TodoStore {
	@observable todoList = [];
	@computed get taskCount() {
		return this.todoList.length;
	}

	setTodoList(list) {
		window.console.log(this.todoList);
		this.todoList = list;
		window.console.log(this.todoList);
	}
}

export default TodoStore;
