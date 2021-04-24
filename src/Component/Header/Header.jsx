// import React from 'react';
import trello from './Images/trello.png';
import './Header.scss';
const Header = () => {
	return (
		<div className='trello-header'>
			<img src={trello} className='trello-logo' alt='trello'></img>
		</div>
	);
};

export default Header;
