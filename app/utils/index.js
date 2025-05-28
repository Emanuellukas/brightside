import useNews from "../composables/useNews";

export const startSunriseAnimation = () => {
	console.log('teste sunrise')
}

export const formatedDate = (pubDate) => {
  const date = new Date(pubDate)
  if (!isNaN(date)) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}

const errorMessage = 'Erro ao buscar XML de notícias.';

function parseRSS(xmlString) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');

  const channel = xml.querySelector('channel');

  const source = {
    title: channel.querySelector('title')?.textContent ?? '',
    description: channel.querySelector('description')?.textContent ?? '',
    pubDate: channel.querySelector('pubDate')?.textContent ?? '',
    link: channel.querySelector('link')?.textContent ?? '',
    generator: channel.querySelector('generator')?.textContent ?? '',
    image: {
      url: channel.querySelector('image url')?.textContent ?? '',
      title: channel.querySelector('image title')?.textContent ?? '',
      link: channel.querySelector('image link')?.textContent ?? ''
    }
  };

  const items = [...channel.querySelectorAll('item')].map(item => {
    const media = item.querySelector('media\\:content'); // cuidado com namespaces!
    const descriptionRaw = item.querySelector('description')?.textContent ?? '';

    return {
      title: item.querySelector('title')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
      description: descriptionRaw.replace(/<!\[CDATA\[|\]\]>/g, '').trim(),
      creator: item.querySelector('dc\\:creator')?.textContent ?? '',
      pubDate: item.querySelector('pubDate')?.textContent ?? '',
      media: {
        url: media?.getAttribute('url') ?? '',
        width: media?.getAttribute('width') ?? '',
        height: media?.getAttribute('height') ?? ''
      },
      guid: item.querySelector('guid')?.textContent ?? ''
    };
  });

  return { source, items };
}

export const getServerRssNews = async (category) => {
	if(hasCategoryXml(category)) {
		const {content, source} = JSON.parse(localStorage.getItem(`data-${category}`))
		useNews().value = await { ...useNews().value, articles: content, source, loading: false }
    console.log('content', source)
		return
	}

	await $fetch('/xmlRss', { params: { category }})
  .then(async xmlString => {
    xmlString = xmlString.replace('(Feed generated with FetchRSS)',)
    const { source, items } = parseRSS(xmlString)

		useNews().value = await { ...useNews().value, articles: items, source, loading: false }
		saveCategoryXml(category, {content: items, source})
  })
  .catch(error => {
		alert(errorMessage, error)
		console.error(errorMessage, error)
	});
}

const saveCategoryXml = (category, {content, source}) => {
	const payload = {content, source, timestamp: Date.now()}
	localStorage.setItem(`data-${category}`, JSON.stringify(payload))
}

const hasCategoryXml = (category) => {
	const old = JSON.parse(localStorage.getItem(`data-${category}`));

  if (!old?.content?.length) return false;

  try {
    const { content, timestamp } = old;
    const duasHoras = 2 * 60 * 60 * 1000; // 2 horas em milissegundos

    if (Date.now() - timestamp <= duasHoras) {
      return content;
    }

		localStorage.removeItem(`data-${category}`);
		return null;
  } catch (e) {
    console.error('Erro ao ler do localStorage:', e);
    return null;
  }
}

const setThemeBasedOnTime = () => {
  //todo
}