import { Board } from '../Board/Board';
import styled from './App.module.scss';
import { Container } from '../Container/Container';


function App() {

	return (
		<Container>
			<h1 className={styled.title}>Похожие объявления</h1>
			<Board />

		</Container>
	);
}

export default App;
