import { Board } from '../Board/Board';
import styled from './App.module.scss';
import { Container } from '../Container/Container';
import { useState, useEffect } from 'react';
import CardsService from '../Api/CardsService';
import { Spiner } from '../Spiner/Spiner';
import { getArrImages } from '../utils/getArrImages';


function App() {
	const [cards, setCards] = useState([]);
	const [cardsLimit, setCardsLimit] = useState(16);
	const [images, setImages] = useState([])

	const fetching = async (limit) => {
		const response = await CardsService.getAllCards(limit);
		setCards(response);
	};

	const showAllCards = () => {
		setCardsLimit(100);
	};

	useEffect(() => {
		setImages(getArrImages(cardsLimit))
		fetching(cardsLimit);
	}, [cardsLimit]);

	return (
		<Container>
			<h1 className={styled.title}>Похожие объявления</h1>
			{!cards.length ?  <Spiner /> : <Board cards={cards} showAllCards={showAllCards} images={images}/>}
		</Container>
	);
}

export default App;
