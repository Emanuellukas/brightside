import useNews from "../composables/useNews";

export const startSunriseAnimation = () => {
	console.log('teste sunrise')
}

// URL do XML
const xmlUrl = 'https://www.gazetadopovo.com.br/feed/rss/ideias.xml';
const errorMessage = 'Erro ao buscar XML de notícias.';
let articleCount = 0;
const articlesArray = []

// Função para converter XML em JSON
export const xmlToJson = (xml) => {
  const obj = {};

  if (xml.hasChildNodes()) {
    for (const child of xml.childNodes) {
      const { nodeName } = child;

      if (!obj[nodeName]) {
        obj[nodeName] = xmlToJson(child);
      } else {
        if (!Array.isArray(obj[nodeName])) {
          obj[nodeName] = [obj[nodeName]];
        }

        if (nodeName === 'item') {
          const article = xmlToJson(child);
          articlesArray.push(article);
          articleCount++;
        } else {
          obj[nodeName].push(xmlToJson(child));
        }
      }
    }
  }

  switch (xml.nodeType) {
    case 1: {
      const attrs = xml.attributes;
      if (attrs?.length) {
        obj["@attributes"] = {};
        for (const attr of attrs) {
          obj["@attributes"][attr.nodeName] = attr.nodeValue;
        }
      }
      break;
    }

    case 3: {
      obj.nodeValue = xml.nodeValue;

      if (
        articlesArray.length &&
        ['url', 'link'].includes(xml.parentNode?.nodeName)
      ) {
        const currentArticle = articlesArray[articleCount];
        if (xml.parentNode.nodeName === 'link') currentArticle.link = xml.nodeValue;
        if (xml.parentNode.nodeName === 'url') currentArticle.urlToImage = xml.nodeValue;
      }
      break;
    }

    case 4: {
      if (!articlesArray.length) break;

      const currentArticle = articlesArray[articleCount];
      const { nodeName } = xml.parentNode || {};

      if (nodeName === 'title') {
        articlesArray[articleCount] = { ...currentArticle, title: xml.nodeValue };
      }

      if (nodeName === 'description') {
        articlesArray[articleCount] = { ...currentArticle, description: xml.nodeValue };
      }
      break;
    }
  }

  return obj;
};


export const getServerRssNews = async (category) => {
	useNews().value.loading = true

	if(hasCategoryXml(category)) {
		const {data} = JSON.parse(localStorage.getItem(`data-${category}`))
		useNews().value = {...useNews().value, articles: data, loading: false};
		return
	}

	$fetch('/xmlRss', { params: { category }})
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

		console.log('xmlDoc', xmlDoc)
    xmlToJson(xmlDoc);
		useNews().value = {...useNews().value, articles: articlesArray, loading: false};
		saveCategoryXml(category, articlesArray)
  })
  .catch(error => {
		alert(errorMessage, error)
		console.error(errorMessage, error)
	});
}

export const getRssNews = async () => {
	useNews().value.loading = true

	const RssFeedEmitter = require('rss-feed-emitter');
	const feeder = new RssFeedEmitter();
	console.log('feeder', feeder)
}

const saveCategoryXml = (category, content) => {
	const payload = {data: content, timestamp: Date.now()}
	localStorage.setItem(`data-${category}`, JSON.stringify(payload))
}

const hasCategoryXml = (category) => {
	const item = localStorage.getItem(`data-${category}`);
  if (!item) return null;

  try {
    const { data, timestamp } = JSON.parse(item);
    const duasHoras = 2 * 60 * 60 * 1000; // 2 horas em milissegundos

    if (Date.now() - timestamp <= duasHoras) {
      return data;
    }

		localStorage.removeItem(`data-${category}`);
		return null;
  } catch (e) {
    console.error('Erro ao ler do localStorage:', e);
    return null;
  }
	
	return JSON.parse(localStorage.getItem(`data-${category}`))
}