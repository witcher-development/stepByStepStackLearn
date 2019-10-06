import axios from 'axios';

const url = 'http://localhost:3001';

export const Get = async () => {
	return await axios.get(url);
};

// export const Create = (name) => {
// 	return async (dispatch) => {
// 		const response = await axios.post(url + '/create', { name });
// 		if (response.status === 200) {
// 			dispatch(Action.addTask(response.data));
// 			return { done: true };
// 		} else {
// 			return { done: false };
// 		}
// 	};
// };
//
// export const Update = (task) => {
// 	return async (dispatch) => {
// 		const response = await axios.post(url + '/update', { task });
// 		if (response.status === 200) {
// 			dispatch(Action.updateTask(task));
// 			return { done: true };
// 		} else {
// 			return { done: false };
// 		}
// 	};
// };
//
// export const Delete = (id) => {
// 	return async (dispatch) => {
// 		const response = await axios.delete(`${url}/delete/${id}`);
// 		if (response.status === 200) {
// 			dispatch(Action.deleteTask(id));
// 			return { done: true };
// 		} else {
// 			return { done: false };
// 		}
// 	};
// };
