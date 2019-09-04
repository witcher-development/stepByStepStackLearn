import React, { Component } from 'react';
import axios from 'axios';
import styled  from 'styled-components';
import { connect } from 'react-redux';
import { setTasks, setLoading } from '../store/actions';

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
	async componentDidMount() {
		const { setTasks, setLoading } = this.props;

		const tasks = await axios.get('https://us-central1-stack-learn.cloudfunctions.net/app');

		setTasks(tasks.data);
		setLoading(false);
	}

	render() {
		const { taskList, loading } = this.props;

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

const mapStateToProps = (state) => {
	const { taskList, loading } = state;
	return {
		taskList,
		loading,
	}
};

const mapDispatchToProps = {
	setTasks,
	setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);

