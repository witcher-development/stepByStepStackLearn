import axios from 'axios';
import * as Action from './actions';

const url = 'https://us-central1-stack-learn.cloudfunctions.net/app';

export const Get = async () => {

};

export const Create = async name => {
	console.log(name);
	const response = await axios.post(url + '/create', {
		name,
	});

	console.log(response.status);

	return dispatch => {
		if (response.status === 200) {
			dispatch(Action.addTask(response.data));
			return { done: true };
		} else {
			return { done: false };
		}
	};
};

export const Update = async task => {
	const response = await axios.post(url + '/update', { task });

	if (response.status === 200) {
		return { done: true };
	}
};

export const Delete = async id => {
	const response = await axios.delete(`${url}/delete/${id}`);

	if (response.status === 200) {
		this.setState({
			taskList: this.state.taskList.filter(task => task.id !== id),
		});
	}
};
