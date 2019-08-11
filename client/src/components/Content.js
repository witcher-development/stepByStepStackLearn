import React, { Component } from 'react';
import axios from 'axios';
import styled  from 'styled-components';

import TaskList from './TaskList';

const Inner = styled.main`
	max-width: 1000px;
	
	margin: 0 auto;
	padding-top: 50px;
	
	p {
		margin: 0;
	}
`;

class Content extends Component {

	constructor(props) {
		super(props);

		this.state = {
			taskList: [],
			loading: true,
		}
	}

	async componentDidMount() {
		const tasks = await axios.get('http://localhost:3001');

		this.setState({
			taskList: tasks.data,
			loading: false,
		});
	}

	async createOrUpdateTask(name, id, parentId) {
		const url = 'http://localhost:3001';

		// console.log('name: ', name);
		// console.log('id: ', id);
		// console.log('parentId: ', parentId);

		let newData = [];

		if (!id) {
			if (parentId) { // create sub task

				newData = await axios.post(url + '/create', {
					name,
					parentId,
				});
			} else { // create high order tasks
				newData = await axios.post(url + '/create', {
					name,
				});
			}
		} else {
			if (name) { // update existed task
				newData = await axios.post(url + '/update', {
					id,
					name,
				});
			} else { // delete task
				newData = await axios.post(url + '/delete', {
					id,
				});
			}
		}

		console.log(newData);

	}

	render() {
		const { taskList, loading } = this.state;

		return (
			<Inner>
				{ loading ? (
					<p>Loading...</p>
				) : (
					<TaskList taskList={taskList} createOrUpdateTask={(name, id, parentId) => this.createOrUpdateTask(name, id, parentId) } />
				)}
			</Inner>
		);
	}
}

export default Content;

