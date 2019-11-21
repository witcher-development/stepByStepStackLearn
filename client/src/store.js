import { createDomain } from 'effector';
import { fetchUsers } from './client';

const root = createDomain('app');

const login = root.effect('Login in');
login.use(() => {
	sessionStorage.setItem('currentUser', $userId.getState());
});

const logout = root.effect('Logout');
logout.use(() => {
	sessionStorage.removeItem('currentUser');
});

const getUsers = root.effect('Get users');
getUsers.use(async () => await fetchUsers());

const sendMessage = root.effect('Send message');
sendMessage.use((message) => {
	const chat = JSON.parse(localStorage.getItem('chat'));
	console.log(message);

	let newChat = [];

	if (chat) {
		newChat = [...chat, message];
	} else {
		newChat = [message];
	}

	localStorage.setItem('chat', JSON.stringify(newChat));
	return message;
});

const setStoreReady = root.event('Set store ready');
const setId = root.event('Set id');

const $isStoreReady = root.store(false, { name: 'isStoreReady' });
const $isAuth = root.store(false, { name: 'auth' });
const $users = root.store([], { name: 'users' });
const $userId = root.store(null, { name: 'userId' });
const $user = $users.map((users) =>
	users.find(({ id }) => id === +$userId.getState()),
);
const $chat = root.store([], { name: 'chat' });

let init = false;

root.onCreateStore(async (store) => {
	if (!init) {
		const user = sessionStorage.getItem('currentUser');
		if (user) {
			$userId.setState(user);
			$isAuth.setState(true);
		}
		$isStoreReady.setState(true);
		init = true;
	}

	if (store.shortName === 'auth') await getUsers();
});

$isStoreReady.on(setStoreReady, () => true);
$isAuth.on(login, () => true);
$isAuth.on(logout, () => false);
$users.on(getUsers.done, (_, { result }) => result);
$userId.on(setId, (_, payload) => payload);
$chat.on(sendMessage, (state, payload) => [...state, payload]);

export {
	$isStoreReady,
	login,
	logout,
	$isAuth,
	$users,
	$user,
	$userId,
	setId,
	$chat,
	sendMessage,
};
