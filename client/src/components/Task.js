import React, { Component } from 'react';
import styled  from 'styled-components';

import TaskType from '../types/taskType';

const StyledTask = styled.div`
	
`;

class Task extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { task } = this.props;

		return (
			<StyledTask>
				{ task.id } - { task.name } | { task.subtasks.length }
			</StyledTask>
		);
	}
}

Task.propTypes = {
	task: TaskType,
};

Task.defaultProps = {
	task: {
		id: '',
		name: '',
		subtasks: [],
	}
};

export default Task;

