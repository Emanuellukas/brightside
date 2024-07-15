export default function () {
  return useState('news', () => ({
    articles: [],
    loading: false
  }))
}