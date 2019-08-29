import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
	height: 9px;
	
	background-color: ${props => props.theme.content.loadingBg};
	
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
`;

const LineKeyFrame = keyframes`
  0% {
    width: 10%;
    
    left: 5px;
  }
  25% {
    width: 30%;
    
    left: 50%;
    transform: translateX(-50%);
  }
  50% {
  	width: 10%;
  	
  	left: calc(100% - 5px);
    transform: translateX(-100%);
  }
  75% {
    width: 30%;
    
    left: 50%;
    transform: translateX(-50%);
  }
  100% {
  	width: 10%;
    
    left: 5px;
  }
`;

const Line = styled.div`
	display: flex;
	justify-content: space-between;

	height: 5px;
	
	position: absolute;
	top: 2px;
	left: 0;
	
	animation: ${LineKeyFrame} 5s ease 0s infinite;
`;

const Dot = styled.div`
	width: 12px;
	height: 100%;
	
	//border-radius: 50%;
	background-color: ${props => props.theme.content.loadingLine};
`;

class Loading extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { className } = this.props;

		let dotArray = [];
		for (let i = 0; i < 10; i++) {
			dotArray.push(0);
		}

		return (
			<Wrapper className={className} >
				<Line>
					{ dotArray.map((_, i) => <Dot key={i} />) }
				</Line>
			</Wrapper>
		)
	}
}

export default Loading;
