export const getRandomNumber = async (limit = 100) => {
	return Math.round(Math.random() * limit);
};
