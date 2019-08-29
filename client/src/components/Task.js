import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';

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
		
		border-right: 2px solid ${props => props.theme.content.textColor};;
		border-bottom: 2px solid ${props => props.theme.content.textColor};;
		
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

		this.toggleSubList = this.toggleSubList.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentDidUpdate(prevProps) {
		const { task } = this.props;


	}

	toggleSubList() {
		this.setState({
			isListOpen: !this.state.isListOpen,
		});
	}

	onChange(name) {
		const { task } = this.state;
		let newTask = Object.assign({}, task);

		newTask.name = name;

		this.setState({
			task: newTask,
		});
	}

	onBlur() {
		const {task} = this.state;
		const {task: taskFromProps} = this.props;
		const {APIController} = this.props;
	}

	render() {
		const { APIController } = this.props;
		const { isListOpen, task, loading } = this.state;

		return (
			<InputWrap>
				<TaskInput
					value={task.name}
					onBlur={this.onBlur}
					onChange={(e) => this.onChange(e.target.value)}
					className={!task.id && 'new-task'}
				/>

				{ loading && <LoadingForInput />}
				
				{ task.id &&
					(
						<div>
							<ToggleListButton onClick={this.toggleSubList}/>

							<SubList className={isListOpen && 'active'}>

								{
									!!task.subtasks.length && task.subtasks.map(name =>
										(
											<TaskInput
												defaultValue={name}
											 	onBlur={this.onBlur}
											/>
										)
									)
								}

								<TaskInput
									defaultValue=''
									onBlur={this.onBlur}
								/>

							</SubList>
						</div>
					)
				}
			</InputWrap>
		);
	}
}

Task.propTypes = {
	task: TaskType,
	APIController: PropTypes.func.isRequired,
};

Task.defaultProps = {
	task: {
		id: '',
		name: '',
		subtasks: [],
	},
};

export default Task;

