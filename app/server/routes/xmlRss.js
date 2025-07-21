import fetch from 'node-fetch';
import { FEED_CATEGORIES } from './constants';

const getRouterParams = (url) => {
  const queryString = url.split('?')[1];
  if (!queryString) return {};

  const params = new URLSearchParams(queryString);
  const result = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
};

export default defineEventHandler(async ({req}) => {
	const { category } = getRouterParams(req.url)

	if(!category) {
		alert('Categoria nao selecionada')
	}

	return new Promise( async (response) => {
		const result = await fetch(`https://${FEED_CATEGORIES[category]}`);
  	const xmlData = await result.text();
		response(xmlData)
	}).catch(error => {
		console.error(error)
		reject(error)
	})
})
    