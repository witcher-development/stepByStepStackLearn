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
		const tasks = await axios.get('https://us-central1-stack-learn.cloudfunctions.net/app');

		this.setState({
			taskList: tasks.data,
			loading: false,
		});
	}

	async APIController(type, task) {
		const url = 'https://us-central1-stack-learn.cloudfunctions.net/app';

		const { id, name } = task;

		if (type === 'create') {
			const response = await axios.post(url + '/create', {
				name,
			});

			if (response.status === 200) {
				await this.setState({
					taskList: [...this.state.taskList, response.data]
				});
				return { done: true };
			}
		}

		if (type === 'update') {
			const response = await axios.post(url + '/update', { task });

			if (response.status === 200) {
				return { done: true };
			}
		}

		if (type === 'delete') {
			const response = await axios.delete(`${url}/delete/${id}`);

			if (response.status === 200) {
				this.setState({
					taskList: this.state.taskList.filter(task => task.id !== id),
				});
			}
		}

	}

	render() {
		const { taskList, loading } = this.state;

		return (
			<Inner>
				{ loading ? (
					<Loading />
				) : (
					<TaskList taskList={taskList} APIController={(name, id) => this.APIController(name, id) } />
				)}
			</Inner>
		);
	}
}

export default Content;

