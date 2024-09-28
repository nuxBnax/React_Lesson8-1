import React, { useEffect, useState, useCallback } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';

export const API_URL_PUBLIC = 'https://api.github.com/gists/public'

// npm i axios

// npm install @mui/joy @emotion/react @emotion/styled

const GistList = () => {
	// Объявление state-переменных
	const [gists, setGists] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const requestGists = async () => {
		try {
			setLoading(true); // Устанавливаем loading в true перед началом запроса
			const response = await fetch(API_URL_PUBLIC);

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			const result = await response.json();
			setGists(result);
		} catch (err) {
			setError(true); // устанавливаем Error в true, если произошла ошибка
			console.warn(err);
		} finally {
			setLoading(false) // устанавливаем Loading в false, когда запрос завершен
		}
	}
	// Вызываем requestGists при монтировании компонента
	useEffect(() => {
		requestGists()
	}, []);

	const renderGist = useCallback(
		(gist) => <li key={gist.id}>{gist.description || 'Без описания'} </li>, // Используем Без описания, если оно отсутствует
		[]
	)

	// обработка раличных состояний
	if (loading) return <CircularProgress/>;
	if (error) return (
		<>
			<h3>Error</h3>
			<button onClick={requestGists}>Попробуй еще раз</button>
		</>
	);
	if (gists.length === 0) return <p>No gists available</p>

	return <ul>{gists.map(renderGist)}</ul>
}

export default GistList;

