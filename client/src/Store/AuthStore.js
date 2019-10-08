import { observable, computed } from 'mobx';

class TodoStore {
	constructor(rootStore) {
		this.rootStore = rootStore
	}

	@observable role = 'guest';
	@computed get access() {
		const { role } = this;
		return (role === 'guest' && 'low') || (role === 'owner' && 'high');
	}
}

export default TodoStore;
