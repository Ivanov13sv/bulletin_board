import styles from './Board.module.scss';
import { useState, useEffect } from 'react';
import { Card } from '../Card/Card';
import { ReactComponent as Arrow } from '../../img/icons/arrow.svg';
import { Spiner } from '../Spiner/Spiner';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CardsService from '../Api/CardsService';
import { getArrImages } from '../utils/getArrImages';

export const Board = () => {
	const [cardsLimit, setCardsLimit] = useState(16);
	const [images, setImages] = useState([]);
	const [cardList, setCardList] = useLocalStorage('cards', []);

	const fetching = async (limit) => {
		const response = await CardsService.getAllCards(limit);
		setCardList(response);
	};

	const seenToggle = (id) => {
		const index = cardList.findIndex((item) => item.id === id);
		const old = cardList[index];
		const newItem = { ...old, seen: !old.seen };
		const newArr = [
			...cardList.slice(0, index),
			newItem,
			...cardList.slice(index + 1),
		];
		setCardList(newArr);
	};

	const showAll = () => {
		setCardsLimit(100);
	};

	useEffect(() => {
		fetching(cardsLimit);
		setImages(getArrImages(cardsLimit));
		// eslint-disable-next-line
	}, [cardsLimit]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.board}>
				{cardList.length ? (
					cardList.map((item, i) => (
						<Card
							seenToggle={seenToggle}
							key={item.id}
							card={item}
							images={images[i]}
						/>
					))
				) : (
					<Spiner />
				)}
			</div>
			{cardsLimit !== 100 && (
				<button onClick={showAll} className={styles.showMore}>
					Показать еще <Arrow />
				</button>
			)}
		</div>
	);
};
