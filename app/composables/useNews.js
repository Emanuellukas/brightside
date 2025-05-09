export default function () {
  return useState('news', () => ({
    articles: [],
    source: {},
    loading: false
  }))
}