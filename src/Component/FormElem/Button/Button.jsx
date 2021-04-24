import './Button.scss';

const Button = ({ text = 'Add', block, onClick, mute }) => {
	return (
		<button className={`button-elem${block ? ' block' : ''}${mute ? ' mute' : ''}`} type='button' onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
