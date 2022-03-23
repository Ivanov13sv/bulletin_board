import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
	const [storageData, setStorageData] = useState(() => {
		const savedDate = localStorage.getItem(key);
		return savedDate ? JSON.parse(savedDate) : defaultValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storageData));
	}, [key, storageData]);

	return [storageData, setStorageData];
};

