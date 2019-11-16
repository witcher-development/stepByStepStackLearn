import axois from 'axios';
import authData from './api_key';

const authUrl = `https://eu.battle.net/oauth/token?client_id=${authData.id}&client_secret=${authData.secret}&grant_type=client_credentials`;
const baseURL = 'https://eu.api.blizzard.com/data/wow/';
let token = '';

const client = axois.create({
	baseURL,
});

client.interceptors.request.use(async (config) => {
	if (!token) {
		await getAccessToken();
	}

	const params = {
		region: 'eu',
		namespace: 'static-eu',
		locale: 'en_US',
		access_token: token,
	};

	config.params = config.params || params;

	return config;
});

export const getAccessToken = async () => {
	const data = await axois.get(authUrl);
	token = data.data.access_token;
};

export const requestFamilies = async () => {
	const url = 'creature-family/index';

	const data = await client.get(url);
	return data.data.creature_families;
};

export const requestFamily = async (id) => {
	const url = `creature-family/${id}`;
	const mediaUrl = `media/creature-family/${id}`;

	const data = await client.get(url);
	const media = await client.get(mediaUrl);

	return {
		...data.data,
		image: media.data.assets[0].value,
	};
};

export const requestTypes = async () => {
	const url = 'creature-type/index';

	const data = await client.get(url);
	return data.data.creature_types;
};

export const requestCreatures = async () => {
	const url = 'creature/';

	const ids = [
		30,
		43,
		69,
		113,
		118,
		119,
		120,
		154,
		157,
		199,
		213,
		217,
		299,
		330,
		345,
		390,
	];

	let list = [];

	for (const id of ids) {
		const data = await client.get(url + id);
		const image = await client.get(data.data.creature_displays[0].key.href);
		list.push({
			...data.data,
			image: image.data.assets[0].value,
		});
	}

	return list;
};
