import fetch from 'node-fetch';

const CATEGORIES = {
	'mundo': 'www.gazetadopovo.com.br/feed/rss/mundo.xml',
	'tech': 'www.nextpit.com.br/feed/main.xml'
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
    