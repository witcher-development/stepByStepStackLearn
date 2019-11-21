import React, { useState } from 'react';
import { useStore } from 'effector-react';

import style from './Chat.module.scss';
import { $chat, sendMessage, logout, $user } from '../store';

const Chat = ({ history }) => {
	const chat = useStore($chat);
	const currentUser = useStore($user);

	console.log(chat);

	const [newMessage, setText] = useState('');

	const onLogout = () => {
		logout();
		history.push('/login');
	};

	const onInput = (e) => {
		setText(e.target.value);
	};

	return (
		<div className={style.container}>
			<button className={style.logout} onClick={onLogout}>
				Logout
			</button>

			<div className={style.chat}>
				<ul>
					{chat.map(({ id, text, author }) => (
						<li
							key={id}
							className={
								currentUser.id === author.id
									? style.chat__message_self
									: style.chat__message
							}
						>
							<p
								className={style['chat__message-author']}
								data-avatar={author.color}
							>
								{author.name}
							</p>
							<p className={style['chat__message-text']}>{text}</p>
						</li>
					))}
				</ul>
				<div className={style.chat__action}>
					<textarea
						value={newMessage}
						onInput={onInput}
						onChange={() => {}}
					></textarea>
					<button
						onClick={() =>
							sendMessage({ author: currentUser, text: newMessage })
						}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
