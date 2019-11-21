import React, { useState } from 'react';
import { useStore } from 'effector-react';

import style from './Chat.module.scss';
import { $chat, sendMessage, logout, $user, clearChat } from '../store';

const Chat = ({ history }) => {
	const chat = useStore($chat);
	const currentUser = useStore($user);

	const [newMessage, setText] = useState('');

	const onLogout = () => {
		logout();
		history.push('/login');
	};

	const onInput = (e) => {
		setText(e.target.value);
	};
	const onEnterPress = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			onSendMessage();
		}
	};
	const onSendMessage = () => {
		sendMessage({ author: currentUser, text: newMessage });
		setText('');
	};

	const getClasses = (author, i) => {
		let array = [];

		if (author.id === currentUser.id) {
			array.push(style.chat__message_self);
		} else {
			array.push(style.chat__message);
		}

		if (chat[i - 1] && chat[i - 1].author.id === author.id) {
			array.push(style.chat__message_continue);
		}

		return array.join(' ');
	};

	return (
		<div className={style.container}>
			<div className={style.buttons}>
				<button onClick={clearChat}>Clear</button>
				<button onClick={onLogout}>Logout</button>
			</div>

			<div className={style.chat}>
				<ul>
					{chat.map(({ text, author }, i) => (
						<li key={i} className={getClasses(author, i)}>
							<div className={style['chat__message-author']}>
								<div style={{ backgroundColor: author.color }}></div>
								<p>{author.name}</p>
							</div>
							<p className={style['chat__message-text']}>{text}</p>
						</li>
					))}
				</ul>
				<div className={style.chat__action}>
					<textarea
						value={newMessage}
						onInput={onInput}
						onChange={() => {}}
						onKeyDown={onEnterPress}
					></textarea>
					<button onClick={onSendMessage}>Send</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
