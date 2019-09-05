import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import NewTask from './NewTask';

import TaskType from '../types/taskType';

class TaskList extends Component {
	render() {
		const { taskList } = this.props;

		return (
			<div>
				{
					!!taskList.length && taskList.map(t => (
						<Task
							key={t.id}
							task={t}
						/>
					))
				}
				<NewTask />
			</div>
		);
	}
}

TaskList.propTypes = {
	taskList: PropTypes.arrayOf(TaskType),
};

TaskList.defaultProps = {
	taskList: [],
};

export default TaskList;

