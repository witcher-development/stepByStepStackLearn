import { createStore, createEvent } from 'effector';

const auth = createEvent('Login in');

const $isAuth = createStore(false);

$isAuth.on(auth, () => true);

export { auth, $isAuth };
