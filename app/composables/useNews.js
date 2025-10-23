import useNotifications from "./useNotifications";

const ERROR_MESSAGE_FETCH_XML = 'Erro ao buscar XML de notícias.';
const LOCAL_STORAGE_PREFIX = 'data-';
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;
const DEFAULT_CATEGORY = 'sonoticiaboa';
const DEFAULT_MAX_DESCRIPTION = 270;

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

const saveCategoryXml = (category, content) => {
    const payload = { ...content, timestamp: Date.now() }
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${category}`, JSON.stringify(payload))
}

const hasCategoryXml = (category) => {
    const old = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${category}`));

  if (!old?.articles?.length) return false;

  try {
    const { articles, timestamp } = old;
    if (Date.now() - timestamp <= TWO_HOURS_MS) {
      return articles;
    }

        localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${category}`);
		return null;
  } catch (e) {
    console.error('Erro ao ler do localStorage:', e);
    return null;
  }
}

export default function () {
  const { getActiveCategories, FEED_CATEGORIES } = useCategories()

  const state = useState('news', () => ({
    articles: [],
    dismissed: [],
    source: {},
    loading: true,
    currentCategory: FEED_CATEGORIES[DEFAULT_CATEGORY],
    search: {
      state: false,
      input: ''
    }
  }));

  const getServerRssNews = async (category, length = 20, search = '') => {
    state.value = { ...state.value, articles: [], dismissed: [], source: {}, loading: true, currentCategory: FEED_CATEGORIES[category] }

    if (hasCategoryXml(category)) {
      const { articles, dismissed, source } = JSON.parse(localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${category}`));

      state.value = await { ...state.value, articles: [...articles.slice(0, length)], dismissed, source, loading: false };
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
          saveCategoryXml(category, { articles: items, source, dismissed: [] });
        return
      })
      .catch(error => {
        alert(ERROR_MESSAGE_FETCH_XML, error);
        console.error(ERROR_MESSAGE_FETCH_XML, error);
      });
  };

  const removeArticle = async (index) => {
    const { value: { articles, currentCategory, dismissed, source } } = state

    dismissed.push(articles[index])
    articles.splice(index, 1);

    saveCategoryXml(currentCategory.slug, { articles, source, dismissed });

    if(!articles.length) {
      const activeCategories = Object.keys(getActiveCategories());
      const currentIndex = activeCategories.indexOf(currentCategory.slug);
      const nextCategory = activeCategories[(currentIndex + 1) % activeCategories.length];
      await updateFeedNews(nextCategory)
      return
    }
  }

  const returnArticle = () => {
    const { value: { articles, currentCategory, dismissed, source } } = state
    const lastDismissedArticle = dismissed[dismissed.length - 1]

    articles.unshift(lastDismissedArticle)
    dismissed.splice(dismissed.length - 1, 1);
    saveCategoryXml(currentCategory.slug, { articles, source, dismissed });
  }

  const hasDismissedArticles = () => {
    const { value: { dismissed } } = state
    return dismissed.length !== 0
  }

  const shortDescription = (description) => {
    return description.length > DEFAULT_MAX_DESCRIPTION
      ? description.slice(0, DEFAULT_MAX_DESCRIPTION) + '...'
      : description
  }

  const selectCategory = (category) => {
    state.value.currentCategory = FEED_CATEGORIES[category]
    setTimeout(() => {
      const el = document.getElementById(category)
      if (el)
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
    }, 100)
  }

  const updateFeedNews = async (category) => {
    startSunriseAnimation()
    selectCategory(category)
    await getServerRssNews(category)
  }

  const clearLocalStorage = async () => {
    Object.keys(getActiveCategories()).forEach(category => {
      localStorage.removeItem(`data-${category}`)
    })

    useNotifications().toast(({ type: 'success', message: 'O cache das notícias foi limpo.' }))
  }

  return {
    state,
    formatedDate,
    updateFeedNews,
    getServerRssNews,
    selectCategory,
    removeArticle,
    returnArticle,
    hasDismissedArticles,
    shortDescription,
    clearLocalStorage
  };
}