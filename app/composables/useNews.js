import { FEED_CATEGORIES, useCategories } from "./useCategories";

const ERROR_MESSAGE_FETCH_XML = 'Erro ao buscar XML de notícias.';
const LOCAL_STORAGE_PREFIX = 'data-';
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const DEFAULT_CATEGORY = 'sonoticiaboa';
const DEFAULT_MAX_DESCRIPTION = 470;

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
      guid: item.querySelector('guid')?.textContent ?? '',
      viewed: false
    };
  });

  return { source, items };
}

const saveCategoryXml = (category, { content, source }) => {
    const payload = { content, source, timestamp: Date.now() }
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${category}`, JSON.stringify(payload))
}

const hasCategoryXml = (category) => {
    const old = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${category}`));

  if (!old?.content?.length) return false;

  try {
    const { content, timestamp } = old;
    if (Date.now() - timestamp <= TWO_HOURS_MS) {
      return content;
    }

        localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${category}`);
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
    currentCategory: DEFAULT_CATEGORY,
    search: {
      state: false,
      input: ''
    }
  }));

  const { getActiveCategories } = useCategories()

  const getServerRssNews = async (category, length = 20, search = '') => {
    state.value = { ...state.value, articles: [], source: {}, loading: true, currentCategory: category }

    if (hasCategoryXml(category)) {
      const { content, source } = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${category}`));

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
        return
      })
      .catch(error => {
        alert(ERROR_MESSAGE_FETCH_XML, error);
        console.error(ERROR_MESSAGE_FETCH_XML, error);
      });
  };

  const removeArticle = async (index) => {
    const { value: { articles, currentCategory } } = state
    articles.splice(index, 1);
    if(!articles.length) {
      const activeCategories = Object.keys(getActiveCategories());
      const currentIndex = activeCategories.indexOf(currentCategory);
      const nextCategory = activeCategories[(currentIndex + 1) % activeCategories.length];
      updateFeedNews(nextCategory)
      return
    }
  }

  const shortDescription = (description) => {
    return description.length > DEFAULT_MAX_DESCRIPTION
      ? description.slice(0, DEFAULT_MAX_DESCRIPTION) + '...'
      : description
  }

  const selectCategory = (category) => {
    state.value.currentCategory = category
  }

  const updateFeedNews = async (category) => {
    startSunriseAnimation()
    selectCategory(category)
    getServerRssNews(category)
  }

  const clearLocalStorage = () => {
    Object.keys(getActiveCategories()).forEach(category => {
      localStorage.removeItem(`data-${category}`)
    })
  }

  return {
    state,
    formatedDate,
    updateFeedNews,
    getServerRssNews,
    selectCategory,
    removeArticle,
    shortDescription,
    clearLocalStorage
  };
}