import React, { useState, useEffect } from 'react';

import style from './DropDown.module.scss';

const DropDown = ({ list, onSelect }) => {
	const [query, setQuery] = useState('');
	const [localList, setList] = useState([]);
	const [opened, setOpened] = useState(false);

	const onInput = (e) => {
		setQuery(e.target.value);
	};
	const onFocus = () => {
		setOpened(true);
	};
	const onBlur = () => {
		setOpened(false);
	};
	const onSelectLocal = ({ name, id }) => {
		onBlur();
		setQuery(name);
		onSelect({ name, id });
	};
	const onClear = () => {
		setQuery('');
		onSelect({ name: null, id: null });
	};

	useEffect(() => {
		const result = list.filter(({ name }) => name.indexOf(query) > -1);
		setList(result);
	}, [list, query]);

	return (
		<div className={style.drop}>
			<div className={style.drop__input}>
				<input
					type="text"
					onChange={() => {}}
					onInput={onInput}
					value={query}
					onFocus={onFocus}
				/>
				{query && <div className={style.drop__clear} onClick={onClear}></div>}
			</div>
			<div className={opened ? style.drop__list_opened : style.drop__list}>
				<ul>
					{localList.map(({ id, name }) => (
						<li key={id} onClick={() => onSelectLocal({ id, name })}>
							{name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DropDown;
