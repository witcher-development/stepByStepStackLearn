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
sendMessage.use(() => {
	const chat = $chat.getState();
	localStorage.setItem('chat', JSON.stringify(chat));
});

const clearChat = root.effect('Clear chat');
clearChat.use(() => {
	$chat.setState([]);
	localStorage.setItem('chat', JSON.stringify([]));
});

const setStoreReady = root.event('Set store ready');
const setId = root.event('Set id');

const $isStoreReady = root.store(false, { name: 'isStoreReady' });
const $isAuth = root.store(false, { name: 'auth' });
const $users = root.store([], { name: 'users' });
const $userId = root.store(null, { name: 'userId' });
const $user = root.store({}, { name: 'user' });
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

		const chat = JSON.parse(localStorage.getItem('chat'));

		if (chat) {
			$chat.setState(chat);
		} else {
			localStorage.setItem('chat', JSON.stringify([]));
		}

		init = true;
	}

	if (store.shortName === 'auth') {
		await getUsers();
		$user.setState(
			$users.getState().find(({ id }) => id === +$userId.getState()),
		);
	}
});

$isStoreReady.on(setStoreReady, () => true);
$isAuth.on(login, () => true);
$isAuth.on(logout, () => false);
$users.on(getUsers.done, (_, { result }) => result);
$userId.on(setId, (_, payload) => payload);
$user.watch($userId, (_, currentId) => {
	$user.setState($users.getState().find(({ id }) => id === +currentId));
});
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
	clearChat,
};
