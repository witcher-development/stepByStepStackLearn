import React, { useState, useEffect } from 'react';
import { creaturesList, getAccessToken } from './../client';

const List = () => {
	const [list, setList] = useState([]);

	useEffect(() => {
		const getData = async () => {
			await getAccessToken();

			const data = await creaturesList();
			console.log(data);
			setList(data);
		};
		getData();
	}, []);

	return (
		<ul>
			{list.map(({ name }) => (
				<li>{name}</li>
			))}
		</ul>
	);
};

export default List;
