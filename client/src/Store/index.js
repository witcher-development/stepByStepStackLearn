import { createContext } from 'react';

import TodoStore from './TodoStore';
import AuthStore from './AuthStore';

class RootStore {
	TodoStore = new TodoStore();
	AuthStore = new AuthStore();
}

export default createContext(new RootStore());

export const TodoStoreContext = createContext(new TodoStore());
export const AuthStoreContext = createContext(new AuthStore());
