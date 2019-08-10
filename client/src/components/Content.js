import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';

import TaskType from '../types/taskType';
import Task from './Task';

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
	}

	render() {
		const { taskList } = this.props;

		return (
			<Inner>
				{
					!!taskList.length && taskList.map(t => <Task key={t.id} task={t} />)
				}
				<Task />
			</Inner>
		);
	}
}

Content.propTypes = {
	taskList: PropTypes.arrayOf(TaskType),
};

Content.defaultProps = {
	taskList: [],
};

export default Content;

