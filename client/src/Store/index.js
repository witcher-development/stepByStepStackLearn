import { createContext } from 'react';
import { observable, computed } from 'mobx';

class TodoStore {
	@observable todoList = ['test'];
	@computed get taskCount() {
		return this.todoList.length;
	}
}

export default createContext(new TodoStore());
