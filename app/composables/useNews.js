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

export default function () {
  const state = useState('news', () => ({
    articles: [],
    source: {},
    loading: true,
    currentCategory: 'world', // usando chave da categoria FEED_CATEGORIES
    search: {
      state: false,
      input: ''
    }
  }));

  const getFilteredNews = async (content) => {
    const result = await $fetch('/api/filteringNews', {
      method: 'POST',
      body: {
        content
      }
    })
    return result
  }

  const getServerRssNews = async (category, length = 20, search = '') => {
    state.value = { ...state.value, articles: [], source: {}, loading: true, currentCategory: category }

    if (hasCategoryXml(category)) {
      const { content, source } = JSON.parse(localStorage.getItem(`data-${category}`));
      console.log('chegou aqui', content, category)

      state.value = await { ...state.value, articles: [...content.slice(0, length)], source, loading: false };
      return;
    }

    if (search.length)
      state.value.search = { input: search, searching: false }

    await $fetch('/xmlRss', { params: { category, search } })
      .then(async xmlString => {
        xmlString = xmlString.replace('(Feed generated with FetchRSS)', '');
        const { source, items } = parseRSS(xmlString);

        state.value = await { ...state.value, articles: [...items.slice(0, length)], source, loading: false };

        if(category !== 'gnews')
          saveCategoryXml(category, { content: items, source });
        // await getFilteredNews(items)
      })
      .catch(error => {
        alert(errorMessage, error);
        console.error(errorMessage, error);
      });
  };

  const removeArticle = async (index) => {
    state.value.articles.splice(index, 1);
  }

  const shortDescription = (description) => {
    return description.length > 400 ? description.slice(0, 400) + '...' : description
  }

  const selectCategory = (category) => {
    state.value.currentCategory = category
  }

  return {
    state,
    getServerRssNews,
    selectCategory,
    removeArticle,
    shortDescription
  };
}