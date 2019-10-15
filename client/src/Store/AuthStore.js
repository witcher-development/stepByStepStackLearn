import { observable, decorate } from 'mobx';

export default class AuthStore {
	role = 'guest';
	get access() {
		const { role } = this;
		return (role === 'guest' && 'low') || (role === 'owner' && 'high');
	}
	login() {
		this.role = 'owner';
	}
}

decorate(AuthStore, {
	role: observable,
});
