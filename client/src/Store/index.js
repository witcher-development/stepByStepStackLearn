import { createContext } from 'react';
import { observable, computed } from 'mobx';

class TodoStore {
	@observable todoList = ['test', 'porridge'];
}

export const TodoStoreContext = createContext(new TodoStore());
