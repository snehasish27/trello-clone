import './AddCard.scss';
import { useState } from 'react';
import Input from '../FormElem/Input/Input';
import Button from '../FormElem/Button/Button';
import { v4 as uuidv4 } from 'uuid';

const AddCard = ({ onCardAdd }) => {
	const [showForm, setShowForm] = useState(null);
	const [cardData, setCardData] = useState({});
	const [cardDataError, setCardDataError] = useState({});

	const toggleAddCardForm = () => {
		setShowForm(!showForm);
		setCardDataError({});
	};

	const handleChange = (event, type) => {
		setCardData({
			...cardData,
			[type]: event.target.value,
		});
	};

	const validate = () => {
		let isValid = true;
		if (!cardData.title || !cardData.desc) {
			setCardDataError({
				...cardDataError,
				title: !cardData.title,
				desc: !cardData.desc,
			});
			isValid = false;
		}
		return isValid;
	};

	const onSave = () => {
		if (validate()) {
			toggleAddCardForm();
			onCardAdd({
				...cardData,
				id: uuidv4(),
			});
		}
	};
	return (
		<>
			{!showForm && (
				<div className='add-card-container' onClick={toggleAddCardForm}>
					+ Add another card
				</div>
			)}
			{showForm && (
				<div className='add-card-form'>
					<Input
						placeholder={'Task Title*'}
						required
						onChange={(event) => handleChange(event, 'title')}
						errorState={cardDataError.title}
					/>
					<Input
						placeholder={'Task Description*'}
						required
						onChange={(event) => handleChange(event, 'desc')}
						errorState={cardDataError.desc}
					/>
					<div className='button-container'>
						<Button text={'Cancel'} mute onClick={toggleAddCardForm} />
						<Button text={'Add'} onClick={onSave} />
					</div>
				</div>
			)}
		</>
	);
};

export default AddCard;
