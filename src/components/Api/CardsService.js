import { Component } from 'react';

export default class CardsService extends Component {
	static async getAllCards(props) {
		const response = await fetch(
			`https://6075786f0baf7c0017fa64ce.mockapi.io/products?page=1&limit=${props}`
		);

		const result = await response.json();

		return result;
	}
	
}
