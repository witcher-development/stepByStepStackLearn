import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { className, theme } = this.props;

		return (
			<div className={className}>
				{/*{ theme }*/}
			</div>
		);
	}
}

// Menu.propTypes = {
// 	theme: PropTypes.string.isRequired,
// };

export default Menu;

