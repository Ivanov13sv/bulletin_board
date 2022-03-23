import React, { useState } from 'react';
import styles from './Slider.module.scss';
import { LoadableImage } from '../LoadableImage/LoadableImage';

export const Slider = ({ images = [] }) => {
	const [current, setCurrent] = useState(1);

	return (
		<div className={styles.containerSlider}>
			<div className={styles.slides}>
				{images.map((item, i) => (
					<div key={`${item}-${i}`}
						className={
							current === i + 1
								? `${styles.slide} ${styles.active}`
								: `${styles.slide}`
						}
					>
						<LoadableImage src={item} alt={item}/>
					</div>
				))}
			</div>
			<div className={styles.navigation}>
				{images.map((item, i) => (
					<span
            key={i}
						onClick={(e) => {
              e.stopPropagation()
              setCurrent(i + 1)
            }}
						className={
							current === i + 1
								? `${styles.btn} ${styles.active}`
								: `${styles.btn}`
						}
					/>
				))}
			</div>
		</div>
	);
};
