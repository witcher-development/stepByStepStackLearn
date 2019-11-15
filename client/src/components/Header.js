import React, { useState, useEffect } from 'react';
import { map } from '@reatom/core';
import { useAtom, useAction } from '@reatom/react';

import { requestFamily, requestFamilies, requestTypes } from '../client';
import {
	setFamily as setFamilyAction,
	family as familyAtom,
	setType as setTypeAction,
	type as typeAtom,
} from '../store';

import style from './Header.module.scss';
import DropDown from './DropDown';

const Header = () => {
	// const familiesAtomLength = useAtom(map(families, (array) => array.length));
	const family = useAtom(familyAtom);
	const type = useAtom(typeAtom);
	const [families, setFamilies] = useState([]);
	const [types, setTypes] = useState([]);

	const setFamily = useAction(setFamilyAction);
	const setType = useAction(setTypeAction);

	const onSelectFamily = async ({ id }) => {
		if (family && family.id === id) return;
		if (id === null) {
			setFamily(null);
			return;
		}
		const data = await requestFamily(id);
		setFamily(data);
	};
	const onSelectType = async ({ id, name }) => {
		if (type && type.name === name) return;
		if (name === null) {
			setType(null);
			return;
		}
		setType({ id, name });
	};

	useEffect(() => {
		const getData = async () => {
			const familiesResponse = await requestFamilies();
			setFamilies(familiesResponse);

			const typesResponse = await requestTypes();
			setTypes(typesResponse);
		};
		getData();
	}, []);

	return (
		<div className={style.header}>
			<div className={style.header__dropdown}>
				<DropDown list={families} onSelect={onSelectFamily} />
			</div>
			<div className={style.header__dropdown}>
				<DropDown list={types} onSelect={onSelectType} />
			</div>
		</div>
	);
};

export default Header;
