const filterGoodNews = async (items) => {
  const content = items.slice(0, 20)
  
  let result;
  try {
    result = await $fetch(process.env.API_URL + '/api/filter-good-news', {
      method: 'POST',
      body: {
        content: content.map(item => ({ title: item.title, description: item.description }))
      }
    });
  } catch (error) {
    console.error('Erro ao filtrar boas notícias:', error);
    result = null;
  }
  return result
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)  
  return filterGoodNews(body.content)
})
  