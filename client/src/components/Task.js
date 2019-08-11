import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';

import TaskList from './TaskList';
import TaskType from '../types/taskType';

const TaskNameInput = styled.input`
	
`;

class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isListOpen: false,
		}
	}

	render() {
		const { task, createOrUpdateTask, parentId } = this.props;

		return (
			<div>
				<TaskNameInput defaultValue={task.name} onBlur={(e) => createOrUpdateTask(e.target.value, task.id, parentId)} />

				{ parentId }

				{ task.id && <TaskList taskList={task.subtasks} createOrUpdateTask={createOrUpdateTask} parentId={task.id} /> }
			</div>
		);
	}
}

Task.propTypes = {
	task: TaskType,
	createOrUpdateTask: PropTypes.func.isRequired,
	parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

Task.defaultProps = {
	task: {
		id: '',
		name: '',
		subtasks: [],
	},
	parentId: false,
};

export default Task;

