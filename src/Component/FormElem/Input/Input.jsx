import './Input.scss';

const Input = ({ placeholder = 'name', lable, onChange, errorState }) => {
	return (
		<div className='input-elem'>
			{lable && <div className='lable'>{lable}</div>}
			<input
				type='text'
				name='name'
				className={errorState ? 'has-error' : ''}
				placeholder={placeholder}
				onChange={onChange}
			/>
			{errorState && <span className='error'>Enter a value</span>}
		</div>
	);
};

export default Input;
