import './Cards.scss';

const Cards = ({ title, description, onCardDelete, onDrag, id, listId }) => {
	return (
		<div className='trello-card-container' draggable={true} onDragStart={onDrag} id={`${id}_${listId}`}>
			<div className='delete-icon' onClick={onCardDelete}>
				<i className='fa fa-trash-o' aria-hidden='true'></i>
			</div>
			<div className='title'>{title}</div>
			<div className='description'>{description}</div>
		</div>
	);
};

export default Cards;
