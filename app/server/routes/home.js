export default defineEventHandler((event) => {
  return new Promise( async (res, reject) => {
    try {
      let data = await $fetch('https://newsapi.org/v2/' + 'top-headlines?sortBy=relevancy&language=pt&apiKey=' + '864aff51218349fc8cd1841a15c4d1ec')
      res(data)
    } catch (error) {
      reject(error)
    }
  })
})
  