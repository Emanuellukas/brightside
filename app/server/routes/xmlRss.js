import fetch from 'node-fetch';

const CATEGORIES = {
	'mundo': 'g1.globo.com/rss/g1/planeta-bizarro/',
	'games': 'fetchrss.com/rss/681e5265f7bbcde5010ec962681e524a3bf01610250f0c52.rss'
}

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

	return new Promise( async (response, reject) => {
		const result = await fetch(`https://${CATEGORIES[category]}`);
  	const xmlData = await result.text();
		response(xmlData)
	}).catch(error => {
		console.error(error)
		reject(error)
	})
})
    