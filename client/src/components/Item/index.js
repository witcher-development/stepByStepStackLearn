import React from 'react';

import style from './Item.module.scss';

const Item = (task) => <li className={style.item}>{task.name}</li>;

export default Item;
