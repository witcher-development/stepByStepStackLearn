import React, { useEffect } from 'react';
import { useAction, useAtom } from '@reatom/react';

import {
	families as familiesAtom,
	setCreatures as setCreaturesAction,
	family as familyAtom,
	type as typeAtom,
	types as typesAtom,
	creatures as creaturesAtom,
} from '../store';
import { requestCreatures } from '../client';

import style from './List.module.scss';

const List = () => {
	const families = useAtom(familiesAtom);
	const types = useAtom(typesAtom);

	const family = useAtom(familyAtom);
	const type = useAtom(typeAtom);

	const creatures = useAtom(creaturesAtom);

	const setCreatures = useAction(setCreaturesAction);

	useEffect(() => {
		const getData = async () => {
			const data = await requestCreatures();
			setCreatures(data);
		};
		getData();
	}, []);

	return (
		<div className={style.container}>
			<ul>

			</ul>
		</div>
	);
};

export default List;
