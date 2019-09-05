import React, { Component } from 'react';
import styled  from 'styled-components';
import { connect } from 'react-redux';
import * as API from '../store/APIController';

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
		const { getTasks } = this.props;
		getTasks();
	}

	render() {
		const { taskList, loading } = this.props;

		return (
			<Inner>
				{ loading ? (
					<Loading />
				) : (
					<TaskList taskList={taskList} />
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
	getTasks: API.Get,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);

