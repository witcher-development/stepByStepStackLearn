import PropTypes from 'prop-types';

let TaskType = {
	id: PropTypes.string,
	name: PropTypes.string,
	subtasks: PropTypes.arrayOf(PropTypes.string),
};

export default PropTypes.shape(TaskType);
