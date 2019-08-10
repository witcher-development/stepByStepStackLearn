import PropTypes from 'prop-types';

let TaskType = {
	id: PropTypes.string,
	name: PropTypes.string,
};
TaskType.subtasks = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape(TaskType)), PropTypes.array]);

export default PropTypes.shape(TaskType);
