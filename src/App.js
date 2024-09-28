import React from 'react';
// import './App.css';
import GistList from './components/GistListEx2';

function App() {
	return (
		//обертка для всего приложения
		<div className="App">
			Шапка приложения с заголовков
			<header className="App-header">
				<h1>Список Gists с Github</h1>
			</header>
			Основная часть приложения, где будет отображаться список Gists
			<main>
				<GistList/>
			</main>
		</div>
	)
}

export default App;