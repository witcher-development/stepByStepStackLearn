import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

import TaskType from '../types/taskType';

class TaskList extends Component {
	render() {
		const { taskList, APIController } = this.props;

		return (
			<div>
				{
					!!taskList.length && taskList.map(t => (
						<Task
							key={t.id}
							task={t}
							APIController={APIController}
						/>
					))
				}
				<Task APIController={APIController} />
			</div>
		);
	}
}

TaskList.propTypes = {
	taskList: PropTypes.arrayOf(TaskType),
	APIController: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
	taskList: [],
};

export default TaskList;

