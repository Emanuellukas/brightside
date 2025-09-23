export const FEED_CATEGORIES = {
  sonoticiaboa: {
    active: true,
    url: 'sonoticiaboa.com.br/feed/rss.xml',
    slug: 'sonoticiaboa',
    name: 'Boas Notícias',
    color: '#af0934',
    icon: 'line-md:heart-twotone'
  },
  flowgames: {
    active: false,
    url: 'flowgames.gg/feed',
    slug: 'games',
    name: 'Flow Games',
    color: '#22c55e',
    icon: 'game-icons:console-controller'
  },
  adrenaline: {
    active: true,
    url: 'www.adrenaline.com.br/games/feed/',
    slug: 'adrenaline',
    name: 'Adrenaline',
    color: '#dc2626',
    icon: 'game-icons:console-controller'
  },
  technology: { 
    active: true,
    url: 'wired.com/feed',
    slug: 'technology',
    name: 'Tecnologia',
    color: '#8b5cf6',
    icon: 'line-md:laptop-twotone'
  },
  world: {
    active: true,
    url: 'g1.globo.com/rss/g1/',
    slug: 'world',
    name: 'Mundo',
    color: '#3b82f6',
    icon: 'line-md:sun-rising-loop'
  },
  science: {
    active: false,
    url: 'rss.app/feeds/6ZOWJlUIQdoBB3ld.xml',
    slug: 'science',
    name: 'Ciência',
    color: '#10b981',
    icon: 'line-md:test-tube-twotone'
  },
  linux: {
    active: false,
    url: 'diolinux.com.br/feed',
    slug: 'linux',
    name: 'Linux',
    color: '#374151',
    icon: 'line-md:computer-twotone'
  },
  igngames: {
    active: false,
    url: 'br.ign.com/feed.xml',
    slug: 'ign-games',
    name: 'IGN Games',
    color: '#f97316',
    icon: 'game-icons:console-controller'
  },
  ufology: {
    active: true,
    url: 'ufo.com.br/feed/',
    slug: 'ufology',
    name: 'Ufologia',
    color: '#7c3aed',
    icon: 'line-md:star-pulsating-loop'
  },
  gnews: {
    active: true,
    url: 'news.google.com/rss/search?hl=pt-BR&gl=BR&ceid=BR',
    slug: 'gnews',
    name: 'Google News',
    color: '#ef4444',
    icon: 'line-md:search-twotone'
  },
}

// Função para obter categorias ativas
export const useConstants = () => {
  const getActiveCategories = () => {
    return Object.entries(FEED_CATEGORIES)
      .filter(([_, category]) => category.active)
      .reduce((acc, [key, category]) => {
        acc[key] = category
        return acc
      }, {})
  }

  const getCategoryBySlug = (slug) => {
    return Object.values(FEED_CATEGORIES).find(cat => cat.slug === slug)
  }

  return {
    FEED_CATEGORIES,
    getActiveCategories,
    getCategoryBySlug
  }
}