export const useNews = () => useState('oldnews', () => ({
    articles: [],
    loading: false
}))