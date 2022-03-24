import styles from './Board.module.scss';
import { Card } from '../Card/Card';
import { ReactComponent as Arrow } from '../../img/icons/arrow.svg';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useState, useEffect } from 'react';
import CardsService from '../Api/CardsService';
import { getArrImages } from '../utils/getArrImages';
import { Spiner } from '../Spiner/Spiner';

export const Board = () => {
	const [cards, setCards] = useState([]);
	const [cardsLimit, setCardsLimit] = useState(16);
	const [images, setImages] = useState([]);

	const [viewedCards, setViewedCards] = useLocalStorage('cards', []);

	const fetching = async (limit) => {
		const response = await CardsService.getAllCards(limit);
		setCards(response);
	};

	const showAllCards = () => {
		setCardsLimit(100);
	};

	useEffect(() => {
		setImages(getArrImages(cardsLimit));
		fetching(cardsLimit);
	}, [cardsLimit]);

	const getViewedCard = (id) => {
		const viewedCard = { id, seen: true };
		const savedItem = viewedCards.some((item) => item.id === id);
		if (!savedItem) {
			setViewedCards([...viewedCards, viewedCard]);
			console.log(viewedCards);
		}
	};

	const content = cards.map((item, i) => (
		<Card
			seenToggle={getViewedCard}
			key={item.id}
			card={item}
			images={images[i]}
			isViewed={viewedCards.some((card) => item.id === card.id)}
		/>
	));

	return (
		<div className={styles.wrapper}>
			<div className={styles.board}>
				{cards.length ? content : <Spiner />}
			</div>
			{cards !== 100 && (
				<button onClick={showAllCards} className={styles.showMore}>
					Показать еще <Arrow />
				</button>
			)}
		</div>
	);
};
