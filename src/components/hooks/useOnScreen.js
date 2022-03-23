import { useState, useEffect } from 'react';

export const useOnScreen = (ref, rootMargin = '0px') => {
	// State and setter for storing whether element is visible
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		// errors in console without this lane
		const currentRef = ref.current;
		const observer = new IntersectionObserver(
			([entry]) => {
				// Update our state when observer callback fires
				setIntersecting(entry.isIntersecting);
			},
			{
				rootMargin,
			}
		);
		if (ref.current) {
			observer.observe(currentRef);
		}
		return () => {
			observer.unobserve(currentRef);
		};
		//   eslint-disable-next-line
	}, []); // Empty array ensures that effect is only run on mount and unmount
	return isIntersecting;
};
