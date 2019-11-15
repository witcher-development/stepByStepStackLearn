import React, { useEffect } from 'react';
import { useAtom } from '@reatom/react';

import {
	family as familyAtom,
	type as typeAtom,
} from '../store';

import style from './Board.module.scss';
import List from './List';

const Board = () => {
	const family = useAtom(familyAtom);
	const type = useAtom(typeAtom);

	useEffect(() => {
		const getData = async () => {
			// await requestCreatures();
		};
		if (family || type) {
			getData();
		}
	}, [family, type]);

	return (
		<div className={style.board}>
			<div className={style.board__top}>
				<div
					className={
						family ? style['board__top-item'] : style['board__top-item_empty']
					}
				>
					{family ? (
						<>
							<img src={family.image} alt={family.name} />
							<h3>{family.name}</h3>
							{family.specialization && <p>{family.specialization.name}</p>}
						</>
					) : (
						<p>Select family</p>
					)}
				</div>
				<div
					className={
						type ? style['board__top-item'] : style['board__top-item_empty']
					}
				>
					{type ? <h3>{type.name}</h3> : <p>Select type</p>}
				</div>
			</div>
			<List />
		</div>
	);
};

export default Board;
