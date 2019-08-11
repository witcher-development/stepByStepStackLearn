import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';

import TaskType from '../types/taskType';

class TaskList extends Component {
	render() {
		const { taskList, createOrUpdateTask, parentId } = this.props;

		return (
			<div>
				{
					!!taskList.length && taskList.map(t => (
						<Task
							key={t.id}
							task={t}
							createOrUpdateTask={createOrUpdateTask}
							parentId={parentId}
						/>
					))
				}
				<Task createOrUpdateTask={createOrUpdateTask} parentId={parentId} />
			</div>
		);
	}
}

TaskList.propTypes = {
	taskList: PropTypes.arrayOf(TaskType),
	createOrUpdateTask: PropTypes.func.isRequired,
	parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

TaskList.defaultProps = {
	taskList: [],
	parentId: false,
};

export default TaskList;

