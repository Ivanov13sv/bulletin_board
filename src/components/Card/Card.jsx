import styles from './Card.module.scss';
import { ReactComponent as Car } from '../../img/icons/car.svg';
import { ReactComponent as Exclude } from '../../img/icons/exclude.svg';
import { ReactComponent as Like } from '../../img/icons/like.svg';
import { ReactComponent as Compare } from '../../img/icons/compare.svg';
import { Slider } from '../Slider/Slider';

export const Card = ({ card, seenToggle, images }) => {
	const { id, oldPrice, price, title, seen, locality = '', date } = card;

	const shortLocation =
		locality.length > 15 ? `${locality.slice(0, 15)}...` : locality;
		
	const parseDate = new Date(date).toLocaleDateString('en-CA');

	const viewClasses = seen
		? `${styles.card} ${styles.card__active}`
		: styles.card;

	return (
		<div onClick={() => seenToggle(id)} className={viewClasses}>
			<span className={styles.viewed}>Просмотрено</span>
			<Slider images={images} />

			<div className={styles.activityIcons}>
				<Compare />
				<Like />
			</div>
			<div className={styles.card__footer}>
				<div className={styles.oldPrice}>
					{`${Math.ceil(oldPrice)} ₽`}
				</div>
				<div className={styles.deliveryIcons}>
					<Car />
					<Exclude />
				</div>
				<div className={styles.newPrice}>{`${Math.ceil(price)} ₽`}</div>
				<div className={styles.product}>{title}</div>
				<div className={styles.locality}>
					<span className={styles.city}>{shortLocation}</span>
					<span className={styles.date}>{parseDate}</span>
				</div>
			</div>
		</div>
	);
};
