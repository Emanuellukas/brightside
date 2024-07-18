import fetch from 'node-fetch';

export default defineEventHandler(() => {
	return new Promise( async (res, reject) => {
		const response = await fetch('https://www.gazetadopovo.com.br/feed/rss/mundo.xml');
  	const xmlData = await response.text();
		res(xmlData)
	}).catch(error => {
		console.error(error)
		reject(error)
	})
})
    