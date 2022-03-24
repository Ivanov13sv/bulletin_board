import styles from './Board.module.scss';
import { Card } from '../Card/Card';
import { ReactComponent as Arrow } from '../../img/icons/arrow.svg';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Board = ({ cards, showAllCards, images }) => {

	const [viewedCards, setViewedCards] = useLocalStorage('cards', []);


	const getViewedCard = (id) =>{
		const viewedCard = {id, seen: true};
		const savedItem = viewedCards.some((item => item.id === id));
		if (!savedItem){
			setViewedCards([...viewedCards, viewedCard])
			console.log(viewedCards)
		}
	}


	return (
		<div className={styles.wrapper}>
			<div className={styles.board}>
				{cards.length &&
					cards.map((item, i) => (
						<Card
							seenToggle={getViewedCard}
							key={item.id}
							card={item}
							images={images[i]}
							isViewed={viewedCards.some(card => item.id === card.id)}
						/>
					))}
			</div>
			{cards !== 100 && (
				<button onClick={() => showAllCards()} className={styles.showMore}>
					Показать еще <Arrow />
				</button>
			)}
		</div>
	);
};
