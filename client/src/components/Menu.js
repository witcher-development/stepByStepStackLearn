import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled  from 'styled-components';

import { ReactComponent as LightOnSvg } from '../assets/light-bulb.svg';
import { ReactComponent as LightOffSvg } from '../assets/light-bulb-dark.svg';

const StyledMenu = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;

  width: 100%;
  height: 50px;
  
  padding: 0 30px;
  
  position:fixed;
  top: 0;
  left: 0;
  
  color: ${props => props.theme.header.textColor};
  background: ${props => props.theme.header.backgroundColor};
  border-bottom: 1px solid ${props => props.theme.header.borderColor};
  
  overflow: hidden;
`;

const Logo = styled.div`
	a {
		font-size: 30px;
		font-family: Roboto, sans-serif;
		font-weight:bold;
		
		text-shadow: 1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2;
	
		color: ${props => props.theme.header.textColor};
		text-decoration:none;
	}
`;

const ToggleTheme = styled.div`
	width: 30px;
	
	&:hover {
		cursor: pointer;
	}
`;
const LightOn = styled(LightOnSvg)`
	width: 100%;
	height: 100%;
	
	fill: #fff;
`;
const LightOff = styled(LightOffSvg)`
	width: 100%;
	height: 100%;
`;

class Menu extends Component {
	render() {
		const { toggleTheme, theme } = this.props;

		return (
			<StyledMenu>

				<Logo>
					<a href="/">Logo</a>
				</Logo>

				<ToggleTheme onClick={toggleTheme}>
					{
						theme === 'dark' ?
							<LightOn title="Light on!" />
					  :
							<LightOff title="Light off!" />
					}
				</ToggleTheme>

			</StyledMenu>
		);
	}
}

Menu.propTypes = {
	theme: PropTypes.string.isRequired,
	toggleTheme: PropTypes.func.isRequired,
};

export default Menu;

