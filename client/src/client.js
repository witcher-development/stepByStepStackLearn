import axois from 'axios';
import authData from './api_key';

const authUrl = `https://eu.battle.net/oauth/token?client_id=${authData.id}&client_secret=${authData.secret}&grant_type=client_credentials`;
const baseURL = 'https://eu.api.blizzard.com/data/wow/';
let token = '';

const client = axois.create({
	baseURL,
});

client.interceptors.request.use((config) => {
	config.params = config.params || {};

	config.params['region'] = 'eu';
	config.params['namespace'] = 'static-eu';
	config.params['locale'] = 'en_US';
	config.params['access_token'] = token;

	return config;
});

// client.defaults.params = {
// 	namespace: 'static-eu',
// 	locale: 'en_US',
// };

export const getAccessToken = async () => {
	const data = await axois.get(authUrl);
	token = data.data.access_token;
};

export const creaturesList = async () => {
	const url = 'creature-family/index';

	const data = await client.get(url);
	return data.data.creature_families;
};
