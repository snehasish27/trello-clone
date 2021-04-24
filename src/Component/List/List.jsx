import AddCard from '../AddCard/AddCard';
import Cards from '../Cards/Cards';
import './List.scss';

const List = ({ title, id, onCardAdd, cards, onCardDelete, onListDelete, updateTaskList }) => {
	const onDrag = (event) => {
		event.dataTransfer.setData('text', event.target.id);
	};

	/* A utility function to the closest */
	const closest = (event, classname) => {
		if (event.className === classname) {
			//We found it!
			return event;
		}
		if (event.parentNode.nodeName !== 'BODY')
			//Last possibility! There's no parent behind!
			return event.parentNode && closest(event.parentNode, classname);
		return null;
	};

	const drop = (event) => {
		const data = event.dataTransfer.getData('text');
		const dropTarget = closest(event.target, 'list-content-wrapper');
		if (dropTarget) {
			updateTaskList(data, dropTarget.id);
		}
	};

	const allowDrop = (event) => {
		event.preventDefault();
	};

	return (
		<div className='list-container' onDrop={drop} onDragOver={allowDrop}>
			<div className='list-title'>
				{title}
				<i className='fa fa-times close' aria-hidden='true' onClick={onListDelete}></i>
			</div>
			<div className='list-content-wrapper' id={id}>
				{cards && cards.length > 0 ? (
					cards.map((item, index) => (
						<Cards
							key={item.id}
							title={item.title}
							description={item.desc}
							id={item.id}
							listId={id}
							onDrag={onDrag}
							onCardDelete={() => onCardDelete(index)}
						/>
					))
				) : (
					<div className='empty-list-state'>No tasks added yet!</div>
				)}
			</div>
			<AddCard
				onCardAdd={(cardData) => {
					onCardAdd(id, cardData);
				}}
			/>
		</div>
	);
};

export default List;
