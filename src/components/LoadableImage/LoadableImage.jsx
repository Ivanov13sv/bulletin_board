import React, { useState, useRef, useEffect } from 'react';
import styles from './LoadableImage.module.scss';
import { useOnScreen } from '../hooks/useOnScreen';

export const LoadableImage = (props) => {
	const { src, alt = '' } = props;

	const [isLoaded, setIsLoaded] = useState(false);
	const imageRef = useRef(null);
	const containerRef = useRef(null);
	const isVisible = useOnScreen(containerRef);

	const containerStyles = isLoaded
		? `${styles.container} ${styles.loaded}`
		: styles.container;

	const imagesStyles = isLoaded
		? `${styles.image} ${styles.loaded}`
		: styles.image;

	useEffect(() => {
		if (!isVisible) return;

		if (imageRef.current) {
			imageRef.current.onload = () => setIsLoaded(true);
		}

		return () => {
			imageRef.current = false;
			setIsLoaded(false);
		};
	}, [isVisible]);

	return (
		<div ref={containerRef} className={containerStyles}>
			{(isVisible || isLoaded) && (
				<img ref={imageRef} className={imagesStyles} src={src} alt={alt} />
			)}
		</div>
	);
};
