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

class NewTask extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.task,
			loading: false,
		};

		this.newTask = React.createRef();

		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(name) {
		this.setState({
			name,
		});
	}

	async onBlur() {
		const { name } = this.state;
		const { APIController, addTask } = this.props;

		if (!name) return;

		this.setState({
			loading: true
		});
		const response = await store.dispatch(API.Create(name));

		console.log(response);

		if (response.done) {
			this.setState({
				loading: false,
			});
			this.newTask.current.value = '';
		}
	}

	render() {
		const { name, loading } = this.state;

		return (
			<InputWrap>
				{/*<TaskInput*/}
				{/*	value={name}*/}
				{/*	onBlur={this.onBlur}*/}
				{/*	onChange={(e) => this.onChange(e.target.value)}*/}
				{/*	ref={this.newTask}*/}
				{/*	className={!task.id && 'new-task'}*/}
				{/*/>*/}

				{ loading && <LoadingForInput /> }

			</InputWrap>
		);
	}
}

NewTask.propTypes = {
	task: TaskType,
};

NewTask.defaultProps = {
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
export default NewTask;
