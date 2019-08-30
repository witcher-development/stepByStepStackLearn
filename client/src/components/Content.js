import React, { Component } from 'react';
import axios from 'axios';
import styled  from 'styled-components';

import Loading from './Loading';
import TaskList from './TaskList';

const Inner = styled.main`
	max-width: 1000px;
	
	margin: 0 auto;
	padding: 50px 20px 0;
	
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

	async APIController(type, task) {
		const url = 'http://localhost:3001';

		const { id, name, subtasks } = task;
		let response;

		if (type === 'create') {
			response = await axios.post(url + '/create', {
				name,
			});
		}

		if (type === 'update') {
			response = await axios.post(url + '/update', { task });
		}

		if (type === 'delete') {
			response = await axios.post(url + '/delete', {
				id,
			});
		}

		// if (response.status === 200) {
		// 	if (action === 'update') {
		// 		const tasks = await axios.get('http://localhost:3001');
		//
		// 		this.setState({
		// 			taskList: tasks.data,
		// 			loading: false,
		// 		});
		// 	}
		// }

	}

	render() {
		const { taskList, loading } = this.state;

		return (
			<Inner>
				{ loading ? (
					<Loading />
				) : (
					<TaskList taskList={taskList} APIController={(name, id, parentId) => this.APIController(name, id, parentId) } />
				)}
			</Inner>
		);
	}
}

export default Content;

