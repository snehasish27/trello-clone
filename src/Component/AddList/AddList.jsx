import './AddList.scss';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Input from '../FormElem/Input/Input';
import Button from '../FormElem/Button/Button';
import { v4 as uuidv4 } from 'uuid';

const AddList = ({ onListAdd }) => {
	const [showForm, setShowForm] = useState(null);
	const [listData, setListData] = useState({});
	const [listDataError, setListDataError] = useState({});

	const toogleAddList = () => {
		setShowForm(!showForm);
		setListDataError({});
	};

	const handleChange = (event, type) => {
		setListData({
			...listData,
			[type]: event.target.value,
		});
	};
	const validate = () => {
		let isValid = true;
		if (!listData.title) {
			setListDataError({
				...listDataError,
				title: !listData.title,
			});
			isValid = false;
		}
		return isValid;
	};

	const onSave = () => {
		if (validate()) {
			toogleAddList();
			onListAdd({
				...listData,
				id: uuidv4(),
				data: [],
			});
		}
	};
	const AddListComponent = (
		<>
			<div className='modal-backdrop' />
			<div className='add-list-form modal'>
				<div className='header'>Add list details</div>
				<div className='close' onClick={toogleAddList}>
					<i className='fa fa-times' aria-hidden='true'></i>
				</div>
				<div className='content'>
					<Input
						placeholder={'List Name*'}
						onChange={(event) => handleChange(event, 'title')}
						errorState={listDataError.title}
					/>
					<Button block onClick={onSave} />
				</div>
			</div>
		</>
	);

	return (
		<div>
			<div className='add-list-button' onClick={toogleAddList}>
				+
			</div>
			{showForm && typeof document !== 'undefined'
				? createPortal(AddListComponent, document.getElementById('appPortal'))
				: null}
		</div>
	);
};

export default AddList;
