import { observable, computed } from 'mobx';

class TodoStore {
	@observable todoList = [];
	@computed get taskCount() {
		return this.todoList.length;
	}
}

export default TodoStore;
