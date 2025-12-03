import { FEED_CATEGORIES } from '~/utils/feedCategories'

export const useCategories = () => {
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
