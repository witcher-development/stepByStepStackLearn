import React, { Component } from 'react';
import styled  from 'styled-components';
import { connect } from 'react-redux';

import { store } from '../index';
import * as API from '../store/APIController';

import TaskType from '../types/taskType';
import Loading from './Loading';

const InputWrap = styled.div`
	position: relative;
`;

const TaskInput = styled.input`
	width: 100%;
	height: 32px;
	
	margin-bottom: 10px;
	padding: 0 8px;
	
	border: none;
	border-bottom: 1px solid ${props => props.theme.content.textColor};
	border-radius: 5px;
	
	transition: box-shadow .3s ease-out;
	
	&.new-task {
		width: 200px;
		border-bottom-style: dashed;
		
		transition: width .3s ease-out, box-shadow .3s ease-out .2s;
		
		&:focus {
			width: 100%;
			border-bottom-style: solid;
		}
	}
	
	background-color: transparent;
	
	color: ${props => props.theme.content.textColor};
	font-size: 16px;
	
	&:focus {
		outline: none;
		
		box-shadow: 0 0 7px -4px ${props => props.theme.content.textColor} inset;
	}
`;

const LoadingForInput = styled(Loading)`
	position: absolute;
	top: 28px;
	
	width: 100%;
`;

const ToggleListButton = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	width: 30px;
	height: 30px;
	
	cursor: pointer;
		
	&:after {
		content: '';
		
		width: 10px;
		height: 10px;
		
		transform: rotate(45deg);
		
		border-right: 2px solid ${props => props.theme.content.textColor};
		border-bottom: 2px solid ${props => props.theme.content.textColor};
		
		box-sizing: border-box;
	}
`;

const SubList = styled.div`
	height: 0;

	padding-left: 20px;
	
	opacity: 0;
	overflow: hidden;
	
	transition: all .3s ease-out;
	
	&.active {
		height: auto;
		opacity: 1;
		overflow: auto;
	}
`;

class Task extends Component {
	constructor(props) {
		super(props);

		this.state = {
			task: props.task,
			isListOpen: false,
			loading: false,
		};

		this.newTask = React.createRef();

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);

		this.newSubTask = React.createRef();

		this.toggleSubList = this.toggleSubList.bind(this);
		this.onChangeSub = this.onChangeSub.bind(this);
		this.onBlurSub = this.onBlurSub.bind(this);
		this.addNewSubTask = this.addNewSubTask.bind(this);
	}

	toggleSubList() {
		this.setState({
			isListOpen: !this.state.isListOpen,
		});
	}

	onChange(name) {
		const { task } = this.state;

		task.name = name;

		this.setState({
			task,
		});
	}

	async onBlur() {
		const { task } = this.state;
		// const {  } = this.props;

		if (task.name) {
			this.setState({
				loading: true
			});
			// const response = await APIController('update', task);
			//
			// if (response.done) {
			// 	this.setState({
			// 		loading: false
			// 	});
			// }
		} else {
			this.setState({
				loading: true
			});
			// const response = await APIController('delete', task);
		}
	}

	onChangeSub(name, i) {
		const { task } = this.state;

		task.subtasks[i] = name;

		this.setState({
			task,
		});
	}

	onBlurSub(name, i) {
		const { task } = this.state;

		if (!name) {
			task.subtasks.splice(i, 1);
		}

		this.setState({
			task,
		}, () => {
			this.onBlur();
		});
	}

	addNewSubTask(name) {
		const { onChangeSub, onBlur } = this;
		const { subtasks } = this.state.task;

		if (name) {
			onChangeSub(name, subtasks.length);
			onBlur();

			this.newSubTask.current.value = '';
		}
	}

	render() {
		const { isListOpen, task, loading } = this.state;

		const subList = (
			<SubList className={isListOpen && 'active'}>

				{
					!!task.subtasks.length && task.subtasks.map((name, i) =>
						(
							<TaskInput
								value={name}
								onChange={(e) => this.onChangeSub(e.target.value, i)}
								onBlur={(e) => this.onBlurSub(e.target.value, i)}
								key={i}
							/>
						)
					)
				}

				<TaskInput
					defaultValue=''
					onBlur={(e) => this.addNewSubTask(e.target.value)}
					ref={this.newSubTask}
					className='new-task'
				/>

			</SubList>
		);

		return (
			<InputWrap>
				<TaskInput
					value={task.name}
					onBlur={this.onBlur}
					onChange={(e) => this.onChange(e.target.value)}
					ref={this.newTask}
					className={!task.id && 'new-task'}
				/>

				{ loading && <LoadingForInput /> }

				<div>
					<ToggleListButton onClick={this.toggleSubList}/>
					{ subList }
				</div>

			</InputWrap>
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
	},
};

// const mapDispatchToProps = {
// 	addTask: API.Create,
// };

// export default connect(null, mapDispatchToProps)(Task);
export default Task
