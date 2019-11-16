import React, { useState, useEffect } from 'react';
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

	const [filteredCreatures, setFilteredCreatures] = useState([]);

	const filterCreatures = (item) => {
		if (family && type) {
			if (item.family.name === family.name && item.type.name === type.name) {
				return true;
			}
		} else if (family && item.family.name === family.name) {
			return true;
		} else if (type && item.type.name === type.name) {
			return true;
		}
	};

	useEffect(() => {
		if (creatures) {
			const filtered = creatures.filter(filterCreatures);
			setFilteredCreatures(filtered);
		}
	}, [creatures, family, type]);

	useEffect(() => {
		const getData = async () => {
			const data = await requestCreatures();
			setCreatures(data);
			console.log(data);
		};
		getData();
	}, []);

	return (
		<div className={style.container}>
			{filteredCreatures.length ? (
				<ul className={style.list}>
					{filteredCreatures.map(({ id, name, image }) => (
						<li key={id} className={style.list__item}>
							<img src={image} alt={name} />
							<div className={style['list__item-content']}>
								<p>{name}</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				(family || type) && <p>Empty</p>
			)}
		</div>
	);
};

export default List;
