import { declareAction, declareAtom } from '@reatom/core';
import { requestFamilies, requestTypes } from './client';

const setFamilies = declareAction();
const getFamilies = declareAction(async (_, store) => {
	const data = await requestFamilies();
	store.dispatch(setFamilies(data));
});

const families = declareAtom('families', [], (on) => [
	on(setFamilies, (_, payload) => payload),
]);

const setTypes = declareAction();
const getTypes = declareAction(async (_, store) => {
	const data = await requestTypes();
	store.dispatch(setTypes(data));
});

const types = declareAtom('types', [], (on) => [
	on(setTypes, (_, payload) => payload),
]);

const setFamily = declareAction();
const family = declareAtom('family', null, (on) => [
	on(setFamily, (_, payload) => payload),
]);

const setType = declareAction();
const type = declareAtom('type', null, (on) => [
	on(setType, (_, payload) => payload),
]);

const setCreatures = declareAction();
const creatures = declareAtom('creatures', null, (on) => [
	on(setCreatures, (_, payload) => payload),
]);

export {
	families,
	getFamilies,
	types,
	getTypes,
	family,
	setFamily,
	type,
	setType,
	creatures,
	setCreatures,
};
