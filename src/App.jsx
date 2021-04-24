import './App.scss';
import { useEffect, useState } from 'react';
import AddList from './Component/AddList/AddList';
import Header from './Component/Header/Header';
import task from './images/checklist.png';
import List from './Component/List/List';

function App() {
	const [listData, setListData] = useState(null);
	/* method to add card */
	const onCardAdd = (id, cardData) => {
		const updatingListIndex = listData.findIndex((item) => item.id === id);
		listData[updatingListIndex]?.data?.push(cardData);
		setListData([...listData]);
	};

	/* Method to delete the card */
	const onCardDelete = (listIndex, cardIndex) => {
		listData[listIndex]?.data.splice(cardIndex, 1);
		setListData([...listData]);
	};

	/* Method to add New List */
	const onListAdd = (data) => {
		if (listData) {
			setListData([...listData, data]);
		} else {
			setListData([data]);
		}
	};

	/* Method to Delete the list */
	const onListDelete = (listIndex) => {
		listData.splice(listIndex, 1);
		setListData([...listData]);
	};

	/* Method to update the list Data after DND */
	const updateTaskList = (cardId, newListId) => {
		const oldListIndex = listData?.findIndex((item) => item.id === cardId?.split('_')[1]);
		if (oldListIndex > -1) {
			const cardIndex = listData[oldListIndex]?.data?.findIndex((item) => item.id === cardId?.split('_')[0]);
			if (cardIndex > -1) {
				const cardData = listData[oldListIndex]?.data[cardIndex];
				listData[oldListIndex].data?.splice(cardIndex, 1);
				const newListIndex = listData?.findIndex((item) => item.id === newListId);
				if (newListIndex > -1) {
					listData[newListIndex]?.data?.unshift(cardData);
					setListData([...listData]);
				}
			}
		}
	};

	/* Sync ListData to Local Storage */
	useEffect(() => {
		if (typeof window !== 'undefined' && window && listData) {
			window?.localStorage?.setItem('ListData', JSON.stringify(listData));
		}
	}, [listData]);

	/* Component Didmount */
	useEffect(() => {
		if (typeof window !== 'undefined' && window) {
			const listData = window?.localStorage?.getItem('ListData');
			try {
				setListData([...JSON.parse(listData)]);
			} catch (err) {
				console.log('data parse error - ', err);
			}
		}
	}, []);

	return (
		<div className='app-wrapper'>
			{/* Here the actual Code Goes */}
			<div className='trello-container'>
				<Header />
				<AddList onListAdd={onListAdd} />
				<div className='trello-content-container'>
					{listData ? (
						listData.map((item, index) => (
							<List
								key={item.id}
								title={item.title}
								cards={item.data}
								onCardAdd={onCardAdd}
								onListDelete={() => onListDelete(index)}
								onCardDelete={(data) => onCardDelete(index, data)}
								updateTaskList={updateTaskList}
								id={item.id}
							/>
						))
					) : (
						<div className='empty-content-section'>
							<img src={task} alt={task} />
							<div>No Tasks list added!</div>
							<div>Click on the + button to add a new task list</div>
						</div>
					)}

					{/* <List title={'Product'} onCardAdd={onCardAdd} id={2}></List>
					<List title={'Product'} onCardAdd={onCardAdd} id={3}></List> */}
				</div>
			</div>
		</div>
	);
}

export default App;
