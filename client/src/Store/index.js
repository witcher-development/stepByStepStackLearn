import { createContext } from 'react';
import { observable, computed, action } from 'mobx';

import TodoStore from './TodoStore';
import AuthStore from './AuthStore';

class RootStore {
	TodoStore = new TodoStore(this);
	AuthStore = new AuthStore(this);

	@observable test = [];
}

export default createContext(new RootStore());
